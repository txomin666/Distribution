<?php

/*
 * This file is part of the Claroline Connect package.
 *
 * (c) Claroline Consortium <consortium@claroline.net>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Claroline\CoreBundle\API\Finder\Workspace;

use Claroline\AppBundle\API\Finder\AbstractFinder;
use Claroline\CoreBundle\Entity\User;
use Claroline\CoreBundle\Entity\Workspace\Workspace;
use Doctrine\ORM\QueryBuilder;
use JMS\DiExtraBundle\Annotation as DI;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use Symfony\Component\Security\Core\Authorization\AuthorizationCheckerInterface;

/**
 * @DI\Service("claroline.api.finder.workspace")
 * @DI\Tag("claroline.finder")
 */
class WorkspaceFinder extends AbstractFinder
{
    /** @var AuthorizationCheckerInterface */
    private $authChecker;

    /** @var TokenStorageInterface */
    private $tokenStorage;

    /**
     * WorkspaceFinder constructor.
     *
     * @DI\InjectParams({
     *     "authChecker"  = @DI\Inject("security.authorization_checker"),
     *     "tokenStorage" = @DI\Inject("security.token_storage")
     * })
     *
     * @param AuthorizationCheckerInterface $authChecker
     * @param TokenStorageInterface         $tokenStorage
     */
    public function __construct(
        AuthorizationCheckerInterface $authChecker,
        TokenStorageInterface $tokenStorage
    ) {
        $this->authChecker = $authChecker;
        $this->tokenStorage = $tokenStorage;
    }

    public function getClass()
    {
        return Workspace::class;
    }

    public function configureQueryBuilder(QueryBuilder $qb, array $searches = [], array $sortBy = null, array $options = ['count' => false, 'page' => 0, 'limit' => -1])
    {
        foreach ($searches as $filterName => $filterValue) {
            //remap some filters...
            if ('meta.personal' === $filterName) {
                $filterName = 'personal';
            }

            if ('meta.model' === $filterName) {
                $filterName = 'model';
            }

            switch ($filterName) {
                case 'hidden':
                    $qb->andWhere("obj.displayable = :{$filterName}");
                    $qb->setParameter($filterName, !$filterValue);

                    break;
                case 'sameOrganization':
                    $currentUser = $this->tokenStorage->getToken()->getUser();

                    if ($currentUser instanceof User) {
                        $qb->leftJoin('obj.organizations', 'uo');
                        $qb->leftJoin('uo.users', 'ua');

                        $qb->andWhere($qb->expr()->orX(
                            $qb->expr()->eq('ua.id', ':userOganizationId')
                        ));

                        $qb->setParameter('userOganizationId', $currentUser->getId());
                    }

                    break;
                case 'administrated':
                    if ('cli' !== php_sapi_name() && !$this->authChecker->isGranted('ROLE_ADMIN') && !$this->authChecker->isGranted('ROLE_ANONYMOUS')) {
                        /** @var User $currentUser */
                        $currentUser = $this->tokenStorage->getToken()->getUser();
                        $qb->leftJoin('obj.organizations', 'uo');
                        $qb->leftJoin('uo.administrators', 'ua');
                        $qb->leftJoin('obj.creator', 'creator');
                        $qb->leftJoin('obj.roles', 'r');
                        $qb->leftJoin('r.users', 'ru');
                        $qb->andWhere($qb->expr()->orX(
                            $qb->expr()->eq('ua.id', ':uaId'),
                            $qb->expr()->eq('creator.id', ':cId'),
                            $qb->expr()->andX(
                                $qb->expr()->eq('r.name', "CONCAT('ROLE_WS_MANAGER_', obj.uuid)"),
                                $qb->expr()->eq('ru.id', ':ruId')
                            )
                        ));
                        $qb->setParameter('uaId', $currentUser->getId());
                        $qb->setParameter('cId', $currentUser->getId());
                        $qb->setParameter('ruId', $currentUser->getId());
                    }
                    break;
                case 'createdAfter':
                    $qb->andWhere("obj.created >= :{$filterName}");
                    $qb->setParameter($filterName, $filterValue);
                    break;
                case 'createdBefore':
                    $qb->andWhere("obj.created <= :{$filterName}");
                    $qb->setParameter($filterName, $filterValue);
                    break;
                case 'organization':
                    $qb->leftJoin('obj.organizations', 'o');
                    $qb->andWhere('o.uuid IN (:organizationIds)');
                    $qb->setParameter('organizationIds', is_array($filterValue) ? $filterValue : [$filterValue]);
                    break;
                case '_user':
                    $qb->leftJoin('obj.roles', 'r');
                    $qb->leftJoin('r.users', 'ru');
                    $qb->andWhere($qb->expr()->orX(
                        $qb->expr()->eq('ru.id', ':_userId'),
                        $qb->expr()->eq('ru.uuid', ':_userUuid')
                    ));
                    $qb->andWhere('r.name != :roleUser');
                    $qb->setParameter('_userId', $filterValue);
                    $qb->setParameter('_userUuid', $filterValue);
                    $qb->setParameter('roleUser', 'ROLE_USER');

                    break;
                case '_group':
                    $qb->leftJoin('obj.roles', 'r');
                    $qb->leftJoin('r.groups', 'rg');
                    $qb->leftJoin('rg.users', 'rgu');
                    $qb->andWhere($qb->expr()->orX(
                        $qb->expr()->eq('rgu.id', ':_groupUserId'),
                        $qb->expr()->eq('rgu.uuid', ':_groupUserUuid')
                    ));
                    $qb->andWhere('r.name != :roleUser');
                    $qb->setParameter('_groupUserId', $filterValue);
                    $qb->setParameter('_groupUserUuid', $filterValue);
                    $qb->setParameter('roleUser', 'ROLE_USER');
                    break;
                case 'user':
                    $byUserSearch = $byGroupSearch = $searches;
                    $byUserSearch['_user'] = $filterValue;
                    $byGroupSearch['_group'] = $filterValue;
                    unset($byUserSearch['user']);
                    unset($byGroupSearch['user']);

                    return $this->union($byUserSearch, $byGroupSearch, $options, $sortBy);
                    break;
                    //use this whith the 'user' property
                case 'isManager':
                    if ($filterValue) {
                        $qb->andWhere('r.name like :ROLE_WS_MANAGER');
                        $qb->setParameter('ROLE_WS_MANAGER', 'ROLE_WS_MANAGER%');
                    }
                    break;
                default:
                    if (is_string($filterValue)) {
                        $qb->andWhere("UPPER(obj.{$filterName}) LIKE :{$filterName}");
                        $qb->setParameter($filterName, '%'.strtoupper($filterValue).'%');
                    } else {
                        $qb->andWhere("obj.{$filterName} = :{$filterName}");
                        $qb->setParameter($filterName, $filterValue);
                    }
            }
        }

        return $qb;
    }

    public function getFilters()
    {
        return [
            'administrated' => [
                'type' => 'boolean',
                'description' => 'The the current user administrate the organization of the workspace',
            ],

            'sameOrganization' => [
                'type' => 'boolean',
                'description' => 'Workspace and current user share the same organization',
            ],

            'createdBefore' => [
                'type' => 'date',
                'description' => 'Workspace created after',
            ],

            'createdAfter' => [
                'type' => 'date',
                'description' => 'Workspace created before',
            ],

            'user' => [
                'type' => 'integer',
                'description' => 'The user id/uuid. Check if the user is registered',
            ],

            'isManager' => [
                'type' => 'boolean',
                'description' => 'Requires the user filter. Check if the user is the manager aswell',
            ],

            //random prop goes here
        ];
    }
}
