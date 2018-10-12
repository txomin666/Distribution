<?php

/*
 * This file is part of the Claroline Connect package.
 *
 * (c) Claroline Consortium <consortium@claroline.net>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Claroline\CoreBundle\Manager;

use Claroline\AppBundle\API\Options;
use Claroline\AppBundle\Event\NotPopulatedEventException;
use Claroline\AppBundle\Event\StrictDispatcher;
use Claroline\AppBundle\Persistence\ObjectManager;
use Claroline\BundleRecorder\Log\LoggableTrait;
use Claroline\CoreBundle\Entity\AbstractRoleSubject;
use Claroline\CoreBundle\Entity\Resource\AbstractResource;
use Claroline\CoreBundle\Entity\Resource\Directory;
use Claroline\CoreBundle\Entity\Resource\ResourceNode;
use Claroline\CoreBundle\Entity\Resource\ResourceRights;
use Claroline\CoreBundle\Entity\Role;
use Claroline\CoreBundle\Entity\Tab\HomeTab;
use Claroline\CoreBundle\Entity\Tool\Tool;
use Claroline\CoreBundle\Entity\User;
use Claroline\CoreBundle\Entity\Workspace\Workspace;
use Claroline\CoreBundle\Entity\Workspace\WorkspaceFavourite;
use Claroline\CoreBundle\Entity\Workspace\WorkspaceOptions;
use Claroline\CoreBundle\Entity\Workspace\WorkspaceRecent;
use Claroline\CoreBundle\Entity\Workspace\WorkspaceRegistrationQueue;
use Claroline\CoreBundle\Library\Security\Utilities;
use Claroline\CoreBundle\Library\Transfert\Resolver;
use Claroline\CoreBundle\Library\Utilities\ClaroUtilities;
use Claroline\CoreBundle\Repository\RoleRepository;
use Claroline\CoreBundle\Repository\UserRepository;
use Claroline\CoreBundle\Repository\WorkspaceRecentRepository;
use Claroline\CoreBundle\Repository\WorkspaceRepository;
use Doctrine\Common\Persistence\ObjectRepository;
use JMS\DiExtraBundle\Annotation as DI;
use Psr\Log\LoggerInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authentication\Token\UsernamePasswordToken;

/**
 * @DI\Service("claroline.manager.workspace_manager")
 */
class WorkspaceManager
{
    use LoggableTrait;

    const MAX_WORKSPACE_BATCH_SIZE = 10;

    /** @var RoleManager */
    private $roleManager;
    /** @var ResourceManager */
    private $resourceManager;
    /** @var RoleRepository */
    private $roleRepo;
    /** @var UserRepository */
    private $userRepo;
    /** @var WorkspaceRepository */
    private $workspaceRepo;
    /** @var ObjectRepository */
    private $workspaceOptionsRepo;
    /** @var StrictDispatcher */
    private $dispatcher;
    /** @var ObjectManager */
    private $om;
    /** @var ClaroUtilities */
    private $ut;
    private $sut;
    /** @var ObjectRepository */
    private $workspaceFavouriteRepo;
    private $container;
    /** @var array */
    private $importData;
    private $templateDirectory;

    /**
     * WorkspaceManager constructor.
     *
     * @DI\InjectParams({
     *     "roleManager"           = @DI\Inject("claroline.manager.role_manager"),
     *     "resourceManager"       = @DI\Inject("claroline.manager.resource_manager"),
     *     "dispatcher"            = @DI\Inject("claroline.event.event_dispatcher"),
     *     "om"                    = @DI\Inject("claroline.persistence.object_manager"),
     *     "ut"                    = @DI\Inject("claroline.utilities.misc"),
     *     "sut"                   = @DI\Inject("claroline.security.utilities"),
     *     "container"             = @DI\Inject("service_container")
     * })
     *
     * @param RoleManager        $roleManager
     * @param ResourceManager    $resourceManager
     * @param StrictDispatcher   $dispatcher
     * @param ObjectManager      $om
     * @param ClaroUtilities     $ut
     * @param Utilities          $sut
     * @param ContainerInterface $container
     */
    public function __construct(
        RoleManager $roleManager,
        ResourceManager $resourceManager,
        StrictDispatcher $dispatcher,
        ObjectManager $om,
        ClaroUtilities $ut,
        Utilities $sut,
        ContainerInterface $container
    ) {
        $this->roleManager = $roleManager;
        $this->resourceManager = $resourceManager;
        $this->ut = $ut;
        $this->sut = $sut;
        $this->om = $om;
        $this->dispatcher = $dispatcher;
        $this->roleRepo = $om->getRepository('ClarolineCoreBundle:Role');
        $this->userRepo = $om->getRepository('ClarolineCoreBundle:User');
        $this->workspaceRepo = $om->getRepository('ClarolineCoreBundle:Workspace\Workspace');
        $this->workspaceOptionsRepo = $om->getRepository('ClarolineCoreBundle:Workspace\WorkspaceOptions');
        $this->workspaceFavouriteRepo = $om->getRepository('ClarolineCoreBundle:Workspace\WorkspaceFavourite');
        $this->container = $container;
        $this->importData = [];
        $this->templateDirectory = $container->getParameter('claroline.param.templates_directory');
    }

    /**
     * Rename a workspace.
     *
     * @param Workspace $workspace
     * @param string    $name
     */
    public function rename(Workspace $workspace, $name)
    {
        $workspace->setName($name);
        $root = $this->resourceManager->getWorkspaceRoot($workspace);
        if ($root) {
            $root = $this->resourceManager->getWorkspaceRoot($workspace);
            $root->setName($name);
            $this->om->persist($root);
        }

        $this->om->persist($workspace);

        $this->om->flush();
    }

    /**
     * Creates a workspace.
     *
     * @param Workspace $workspace
     * @param File      $template
     *
     * @return Workspace
     */
    public function create(Workspace $workspace, File $template)
    {
        $transferManager = $this->container->get('claroline.manager.transfer_manager');

        if ($this->logger) {
            $transferManager->setLogger($this->logger);
        }

        $workspace = $transferManager->createWorkspace($workspace, $template, false);

        return $workspace;
    }

    /**
     * Creates a workspace.
     *
     * @param Workspace $workspace
     * @param string    $templateDirectory uncompressed template
     *
     * @return Workspace
     */
    public function createFromTemplate(Workspace $workspace, $templateDirectory)
    {
        $transferManager = $this->container->get('claroline.manager.transfer_manager');

        if ($this->logger) {
            $transferManager->setLogger($this->logger);
        }

        $workspace = $transferManager->createWorkspaceFromTemplate($workspace, $templateDirectory, false);

        return $workspace;
    }

    public function createWorkspace(Workspace $workspace)
    {
        if (0 === count($workspace->getOrganizations())) {
            if (
                $this->container->get('security.token_storage')->getToken() &&
                $this->container->get('security.token_storage')->getToken()->getUser() instanceof User &&
                $this->container->get('security.token_storage')->getToken()->getUser()->getMainOrganization()
            ) {
                //we want a min organization
                $workspace->addOrganization($this->container->get('security.token_storage')->getToken()->getUser()->getMainOrganization());
                $this->om->persist($workspace);
                $this->om->flush();
            } else {
                $organizationManager = $this->container->get('claroline.manager.organization.organization_manager');
                $default = $organizationManager->getDefault();
                $workspace->addOrganization($default);
            }
        }

        $ch = $this->container->get('claroline.config.platform_config_handler');
        $workspace->setMaxUploadResources($ch->getParameter('max_upload_resources'));
        $workspace->setMaxStorageSize($ch->getParameter('max_storage_size'));
        $workspace->setMaxUsers($ch->getParameter('max_workspace_users'));
        $this->editWorkspace($workspace);

        return $workspace;
    }

    public function editWorkspace(Workspace $workspace)
    {
        $this->om->persist($workspace);
        $this->om->flush();
    }

    /**
     * Delete a workspace.
     *
     * @param Workspace $workspace
     */
    public function deleteWorkspace(Workspace $workspace)
    {
        // Log action
        $this->dispatcher->dispatch('log', 'Log\LogWorkspaceDelete', [$workspace]);

        $this->om->startFlushSuite();
        $root = $this->resourceManager->getWorkspaceRoot($workspace);

        if ($root) {
            $this->log('Removing root directory '.$root->getName().'[id:'.$root->getId().']');
            $children = $root->getChildren();
            $this->log('Looping through '.count($children).' children...');

            if ($children) {
                foreach ($children as $node) {
                    $this->resourceManager->delete($node);
                }
            }
        }

        $tabs = $this->om->getRepository(HomeTab::class)->findBy(['workspace' => $workspace]);
        $crud = $this->container->get('claroline.api.crud');

        foreach ($tabs as $tab) {
            $crud->delete($tab);
        }

        $this->dispatcher->dispatch(
            'claroline_workspaces_delete',
            'GenericData',
            [[$workspace]]
        );
        $this->om->remove($workspace);
        $this->om->endFlushSuite();
    }

    /**
     * Appends a role list to a right array.
     *
     * @param array $rights
     * @param array $roles
     *
     * @return array
     */
    public function prepareRightsArray(array $rights, array $roles)
    {
        $preparedRightsArray = [];

        foreach ($rights as $key => $right) {
            $preparedRights = $right;
            $preparedRights['role'] = $roles[$key];
            $preparedRightsArray[] = $preparedRights;
        }

        return $preparedRightsArray;
    }

    /**
     * Adds a favourite workspace.
     *
     * @param Workspace $workspace
     * @param User      $user
     */
    public function addFavourite(Workspace $workspace, User $user)
    {
        $favourite = new WorkspaceFavourite();
        $favourite->setWorkspace($workspace);
        $favourite->setUser($user);

        $this->om->persist($favourite);
        $this->om->flush();
    }

    /**
     * Removes a favourite workspace.
     *
     * @param WorkspaceFavourite $favourite
     */
    public function removeFavourite(WorkspaceFavourite $favourite)
    {
        $this->om->remove($favourite);
        $this->om->flush();
    }

    /**
     * @param User $user
     *
     * @return Workspace[]
     */
    public function getWorkspacesByUser(User $user)
    {
        return $this->workspaceRepo->findByUser($user);
    }

    //only used by dashboard
    //@todo remove
    public function exportWorkspace(Workspace $workspace)
    {
        return [
          'id' => $workspace->getId(),
          'guid' => $workspace->getUuid(),
          'name' => $workspace->getName(),
          'description' => $workspace->getDescription(),
          'code' => $workspace->getCode(),
          'maxStorageSize' => $workspace->getMaxStorageSize(),
          'maxUploadResources' => $workspace->getMaxUploadResources(),
          'maxUsers' => $workspace->getMaxUsers(),
          'displayable' => !$workspace->isHidden(),
          'creatorId' => $workspace->getCreator()->getId(),
          'selfRegistration' => $workspace->getSelfRegistration(),
          'registrationValidation' => $workspace->getRegistrationValidation(),
          'selfUnregistration' => $workspace->getSelfUnregistration(),
          'disabledNotifications' => $workspace->isDisabledNotifications(),
          'creationDate' => $workspace->getCreated(),
          'isPersonal' => $workspace->isPersonal(),
          'startDate' => $workspace->getStartDate(),
          'endDate' => $workspace->getEndDate(),
          'isAccessDate' => $workspace->getIsAccessDate(),
          'type' => $workspace->getWorkspaceType(),
        ];
    }

    public function getWorkspacesByManager(User $user)
    {
        return $this->workspaceRepo->findWorkspacesByManager($user);
    }

    /**
     * @return int
     */
    public function getNbWorkspaces()
    {
        return $this->workspaceRepo->countWorkspaces();
    }

    /**
     * @return int
     */
    public function getNbPersonalWorkspaces()
    {
        return $this->workspaceRepo->countPersonalWorkspaces();
    }

    /**
     * @return int
     */
    public function getNbNonPersonalWorkspaces($organizations = null)
    {
        return $this->workspaceRepo->countNonPersonalWorkspaces($organizations);
    }

    /**
     * @param string[] $roles
     *
     * @return Workspace[]
     */
    public function getOpenableWorkspacesByRoles(array $roles)
    {
        return $this->workspaceRepo->findByRoles($roles);
    }

    /**
     * Returns the accesses rights of a given token for a set of workspaces.
     * If a tool name is passed in, the check will be limited to that tool,
     * otherwise workspaces with at least one accessible tool will be
     * considered open. Access to any tool is always granted to platform
     * administrators and workspace managers.
     *
     * The returned value is an associative array in which
     * keys are workspace ids and values are boolean indicating if the
     * workspace is open.
     *
     * @param TokenInterface $token
     * @param Workspace[]    $workspaces
     * @param string|null    $toolName
     * @param string         $action
     * @param int            $orderedToolType
     *
     * @return bool[]
     */
    public function getAccesses(
        TokenInterface $token,
        array $workspaces,
        $toolName = null,
        $action = 'open',
        $orderedToolType = 0
    ) {
        $userRoleNames = $this->sut->getRoles($token);
        $accesses = [];

        if (in_array('ROLE_ADMIN', $userRoleNames)) {
            foreach ($workspaces as $workspace) {
                $accesses[$workspace->getId()] = true;
            }

            return $accesses;
        }

        $hasAllAccesses = true;
        $workspacesWithoutManagerRole = [];

        foreach ($workspaces as $workspace) {
            if (in_array('ROLE_WS_MANAGER_'.$workspace->getUuid(), $userRoleNames)) {
                $accesses[$workspace->getId()] = true;
            } else {
                $accesses[$workspace->getId()] = $hasAllAccesses = false;
                $workspacesWithoutManagerRole[] = $workspace;
            }
        }

        if (!$hasAllAccesses) {
            $em = $this->container->get('doctrine.orm.entity_manager');
            $openWsIds = $em->getRepository('ClarolineCoreBundle:Workspace\Workspace')
                ->findOpenWorkspaceIds(
                    $userRoleNames,
                    $workspacesWithoutManagerRole,
                    $toolName,
                    $action,
                    $orderedToolType
                );

            foreach ($openWsIds as $idRow) {
                $accesses[$idRow['id']] = true;
            }
        }

        //remove accesses if workspace is personal and right was not given

        foreach ($workspaces as $workspace) {
            if ($workspace->isPersonal() && $toolName) {
                $pwc = $this->container->get('claroline.manager.tool_manager')
                    ->getPersonalWorkspaceToolConfigs();
                $canOpen = false;

                foreach ($pwc as $conf) {
                    if (!$toolName) {
                        $toolName = 'home';
                    }

                    if ($conf->getTool()->getName() === $toolName &&
                        in_array($conf->getRole()->getName(), $workspace->getCreator()->getRoles()) &&
                        ($conf->getMask() & 1)) {
                        $canOpen = true;
                    }
                }

                if (!$canOpen) {
                    $accesses[$workspace->getId()] = false;
                }
            }
        }

        return $accesses;
    }

    /**
     * @param User     $user
     * @param string[] $roleNames
     *
     * @return Workspace[]
     */
    public function getWorkspacesByUserAndRoleNames(User $user, array $roleNames)
    {
        return $this->workspaceRepo->findByUserAndRoleNames($user, $roleNames);
    }

    /**
     * Returns an array containing.
     *
     * @param User  $user
     * @param array $roles
     * @param int   $max
     *
     * @return array
     */
    public function getLatestWorkspacesByUser(User $user, array $roles, $max = 5)
    {
        return count($roles) > 0 ?
            $this->workspaceRepo->findLatestWorkspacesByUser($user, $roles, $max) :
            [];
    }

    /**
     * @param int $max
     *
     * @return Workspace[]
     */
    public function getWorkspacesWithMostResources($max, $organizations = null)
    {
        return $this->workspaceRepo->findWorkspacesWithMostResources($max, $organizations);
    }

    /**
     * @param int $workspaceId
     *
     * @return Workspace
     */
    public function getWorkspaceById($workspaceId)
    {
        return $this->workspaceRepo->find($workspaceId);
    }

    /**
     * @param string $guid
     *
     * only used one in LayoutController
     *
     * @return Workspace
     */
    public function getOneByGuid($guid)
    {
        return $this->workspaceRepo->findOneByUuid($guid);
    }

    /**
     * @param string $code
     *
     * @return Workspace
     */
    public function getOneByCode($code)
    {
        return $this->workspaceRepo->findOneBy([
            'code' => $code,
        ]);
    }

    /**
     * @param Workspace $workspace
     * @param Role[]    $roles
     * @param int       $orderedToolType
     *
     * @return Workspace[]
     */
    public function getWorkspaceByWorkspaceAndRoles(
        Workspace $workspace,
        array $roles,
        $orderedToolType = 0
    ) {
        return $this->workspaceRepo->findWorkspaceByWorkspaceAndRoles(
            $workspace,
            $roles,
            $orderedToolType
        );
    }

    /**
     * @param User $user
     *
     * @return Workspace[]
     */
    public function getFavouriteWorkspacesByUser(User $user)
    {
        $workspaces = [];

        /** @var WorkspaceFavourite[] $favourites */
        $favourites = $this->om
            ->getRepository('ClarolineCoreBundle:Workspace\WorkspaceFavourite')
            ->findBy([
                'user' => $user,
            ]);

        foreach ($favourites as $favourite) {
            $workspace = $favourite->getWorkspace();
            $workspaces[$workspace->getId()] = $workspace;
        }

        return $workspaces;
    }

    /**
     * @param Workspace $workspace
     * @param User      $user
     *
     * @return WorkspaceFavourite
     */
    public function getFavouriteByWorkspaceAndUser(Workspace $workspace, User $user)
    {
        return $this->workspaceFavouriteRepo->findOneBy([
            'workspace' => $workspace,
            'user' => $user,
        ]);
    }

    /**
     * @param \Claroline\CoreBundle\Entity\Workspace\Workspace $workspace
     *
     * @return \Claroline\CoreBundle\Entity\User|null
     */
    public function findPersonalUser(Workspace $workspace)
    {
        $user = $this->userRepo->findBy(['personalWorkspace' => $workspace]);

        return (1 === count($user)) ? $user[0] : null;
    }

    public function addUserQueue(Workspace $workspace, User $user)
    {
        $wksrq = new WorkspaceRegistrationQueue();
        $wksrq->setUser($user);
        $role = $this->roleManager->getCollaboratorRole($workspace);
        $wksrq->setRole($role);
        $wksrq->setWorkspace($workspace);
        $this->dispatcher->dispatch(
            'log',
            'Log\LogWorkspaceRegistrationQueue',
            [$wksrq]
        );
        $this->om->persist($wksrq);
        $this->om->flush();
    }

    public function isUserInValidationQueue(Workspace $workspace, User $user)
    {
        $workspaceRegistrationQueueRepo =
            $this->om->getRepository('ClarolineCoreBundle:Workspace\WorkspaceRegistrationQueue');
        $userQueued = $workspaceRegistrationQueueRepo->findOneBy(['workspace' => $workspace, 'user' => $user]);

        return !empty($userQueued);
    }

    /**
     * @param Workspace $workspace
     * @param User      $user
     *
     * @return User
     */
    public function addUserAction(Workspace $workspace, User $user)
    {
        $role = $workspace->getDefaultRole();
        $userRoles = $this->roleManager->getWorkspaceRolesForUser($user, $workspace);

        if (0 === count($userRoles)) {
            $this->roleManager->associateRole($user, $role);
            $this->dispatcher->dispatch(
                'claroline_workspace_register_user',
                'WorkspaceAddUser',
                [$role, $user]
            );
        }

        // FIXME : you replace current user credentials by the added one, but why ?
        // there is no reason to do this because it's not always the same user !!!
        $token = new UsernamePasswordToken($user, null, 'main', $user->getRoles());
        $this->container->get('security.token_storage')->setToken($token);

        return $user;
    }

    /**
     * Import a workspace list from a csv data.
     *
     * @param array    $workspaces
     * @param callable $logger
     * @param bool     $update
     *
     * @deprecated
     */
    public function importWorkspaces(array $workspaces, $logger = null, $update = false)
    {
        $i = 0;
        $this->om->startFlushSuite();

        foreach ($workspaces as $workspace) {
            $create = false;
            ++$i;
            $endDate = null;
            $model = null;
            $name = $workspace[0];
            $code = $workspace[1];
            $isVisible = $workspace[2];
            $selfRegistration = $workspace[3];
            $registrationValidation = $workspace[4];
            $selfUnregistration = $workspace[5];

            if (isset($workspace[6]) && '' !== trim($workspace[6])) {
                $user = $this->om
                    ->getRepository('ClarolineCoreBundle:User')
                    ->findOneBy([
                        'username' => $workspace[6],
                    ]);
            } else {
                $user = $this->container->get('security.token_storage')->getToken()->getUser();
            }

            if (isset($workspace[7])) {
                $model = $this->workspaceRepo->findOneBy([
                    'code' => $workspace[7],
                ]);
            }

            if (isset($workspace[8]) && is_int($workspace[8])) {
                $endDate = new \DateTime();
                $endDate->setTimestamp($workspace[8]);
            }
            if ($update) {
                $workspace = $this->getOneByCode($code);
                if (!$workspace) {
                    //if the workspace doesn't exists, create it...
                    $workspace = new Workspace();
                    $workspace->setName($name);
                    $workspace->setGuid(uniqid('', true));
                    $create = true;
                }
                $this->rename($workspace, $name);
                if ($logger) {
                    $logger('Updating '.$code.' ('.$i.'/'.count($workspaces).') ...');
                }
            } else {
                $workspace = new Workspace();
                $workspace->setName($name);
                $created[] = $name;
                $workspace->setGuid(uniqid('', true));
                $create = true;
            }

            if ($create) {
                $created[] = $code;
            } else {
                $updated[] = $code;
            }

            $workspace->setCode($code);
            $workspace->setDisplayable($isVisible);
            $workspace->setSelfRegistration($selfRegistration);
            $workspace->setSelfUnregistration($selfUnregistration);
            $workspace->setRegistrationValidation($registrationValidation);
            $workspace->setCreator($user);

            if ($endDate) {
                $workspace->setEndDate($endDate);
            }

            if (!$update) {
                if ($logger) {
                    $logger('Creating '.$code.' ('.$i.'/'.count($workspaces).') ...');
                }
                if ($model) {
                    $guid = $this->ut->generateGuid();
                    $workspace->setGuid($guid);
                    $date = new \Datetime(date('d-m-Y H:i'));
                    $workspace->setCreationDate($date->getTimestamp());
                    $this->copy($model, $workspace, $user);
                } else {
                    $template = new File($this->container->getParameter('claroline.param.default_template'));
                    $this->container->get('claroline.manager.transfer_manager')->createWorkspace($workspace, $template, true);
                }
            } else {
                if ($create) {
                    $template = new File($this->container->getParameter('claroline.param.default_template'));
                    $this->container->get('claroline.manager.transfer_manager')->createWorkspace($workspace, $template, true);
                }

                if ($model) {
                    $this->duplicateOrderedTools($model, $workspace);
                }
            }

            $this->om->persist($workspace);

            if ($logger) {
                $logger('UOW: '.$this->om->getUnitOfWork()->size());
            }

            if (0 === $i % 100) {
                $this->om->forceFlush();
                $user = $this->om->getRepository('ClarolineCoreBundle:User')->find($user->getId());
                $this->om->merge($user);
                $this->om->refresh($user);
            }
        }

        $this->om->endFlushSuite();

        if ($logger) {
            $logger(count($updated).' workspace updated ('.implode(',', $updated).')');
            $logger(count($created).' workspace created ('.implode(',', $created).')');
        }
    }

    public function getWorkspaceByCode($workspaceCode, $executeQuery = true)
    {
        return $this->workspaceRepo
            ->findWorkspaceByCode($workspaceCode, $executeQuery);
    }

    /**
     * Count the number of resources in a workspace.
     *
     * @param Workspace $workspace
     *
     * @return int
     */
    public function countResources(Workspace $workspace)
    {
        //@todo count directory from dql
        $root = $this->resourceManager->getWorkspaceRoot($workspace);
        if (!$root) {
            return 0;
        }
        $descendants = $this->resourceManager->getDescendants($root);

        return count($descendants);
    }

    /**
     * Get the workspace storage directory.
     *
     * @param Workspace $workspace
     *
     * @return string
     */
    public function getStorageDirectory(Workspace $workspace)
    {
        $ds = DIRECTORY_SEPARATOR;

        return $this->container->getParameter('claroline.param.files_directory').$ds.'WORKSPACE_'.$workspace->getId();
    }

    /**
     * Get the current used storage in a workspace.
     *
     * @param Workspace $workspace
     *
     * @return int
     */
    public function getUsedStorage(Workspace $workspace)
    {
        $dir = $this->getStorageDirectory($workspace);
        $size = 0;

        if (!is_dir($dir)) {
            return $size;
        }

        foreach (new \RecursiveIteratorIterator(new \RecursiveDirectoryIterator($dir)) as $file) {
            $size += $file->getSize();
        }

        return $size;
    }

    public function getWorkspaceCodesWithPrefix($prefix, $executeQuery = true)
    {
        return $this->workspaceRepo->findWorkspaceCodesWithPrefix(
            $prefix,
            $executeQuery
        );
    }

    /**
     * @param Workspace $workspace
     *
     * @return Tool
     */
    public function getFirstOpenableTool(Workspace $workspace)
    {
        $token = $this->container->get('security.token_storage')->getToken();
        $roles = $this->container->get('claroline.security.utilities')->getRoles($token);

        /** @var Tool[] $orderedTools */
        $orderedTools = $this->container->get('claroline.manager.tool_manager')->getDisplayedByRolesAndWorkspace($roles, $workspace);
        //loop through the tools till we can open one !
        $authorization = $this->container->get('security.authorization_checker');

        foreach ($orderedTools as $tool) {
            if ($authorization->isGranted($tool->getName(), $workspace)) {
                return $tool;
            }
        }
    }

    public function getWorkspaceOptions(Workspace $workspace)
    {
        $workspaceOptions = $this->workspaceOptionsRepo->findOneByWorkspace($workspace);

        //might not be required
        if (!$workspaceOptions) {
            $scheduledForInsert = $this->om->getUnitOfWork()->getScheduledEntityInsertions();

            foreach ($scheduledForInsert as $entity) {
                if (WorkspaceOptions::class === get_class($entity)) {
                    if ($entity->getWorkspace()->getCode() === $workspace->getCode()) {
                        $workspaceOptions = $entity;
                    }
                }
            }
        }

        if (!$workspaceOptions) {
            $workspaceOptions = new WorkspaceOptions();
            $workspaceOptions->setWorkspace($workspace);
            $details = [
                'hide_tools_menu' => false,
                'background_color' => null,
                'hide_breadcrumb' => false,
                'use_workspace_opening_resource' => false,
                'workspace_opening_resource' => null,
            ];
            $workspaceOptions->setDetails($details);
            $workspace->setOptions($workspaceOptions);
            $this->om->persist($workspaceOptions);
            $this->om->persist($workspace);
            $this->om->flush();
        }

        return $workspaceOptions;
    }

    public function persistworkspaceOptions(WorkspaceOptions $workspaceOptions)
    {
        $this->om->persist($workspaceOptions);
        $this->om->flush();
    }

    public function isToolsMenuHidden(Workspace $workspace)
    {
        $workspaceOptions = $this->getWorkspaceOptions($workspace);
        $details = $workspaceOptions->getDetails();

        return isset($details['hide_tools_menu']) && $details['hide_tools_menu'];
    }

    public function setLogger(LoggerInterface $logger)
    {
        $rm = $this->container->get('claroline.manager.resource_manager');
        $tm = $this->container->get('claroline.manager.transfer_manager');

        if (!$rm->getLogger()) {
            $rm->setLogger($logger);
        }

        if (!$tm->getLogger()) {
            $tm->setLogger($logger);
        }

        $this->logger = $logger;
    }

    public function getLogger()
    {
        return $this->logger;
    }

    public function getTemplateData(File $file, $refresh = false)
    {
        //from cache
        if (!$refresh) {
            return $this->importData;
        }

        $archive = new \ZipArchive();
        $fileName = $file->getBasename('.zip');
        $extractPath = $this->templateDirectory.$fileName;

        if ($archive->open($file->getPathname())) {
            $fs = new FileSystem();
            $fs->mkdir($extractPath);
            $this->log("Extracting workspace to {$extractPath}...");

            if (!$archive->extractTo($extractPath)) {
                throw new \Exception("The workspace archive couldn't be extracted");
            }

            $archive->close();
            $resolver = new Resolver($extractPath);
            $this->importData = $resolver->resolve();

            return $this->importData;
        }

        throw new \Exception("The workspace archive couldn't be opened");
    }

    public function removeTemplate(File $file)
    {
        $fileName = $file->getBasename('.zip');
        $extractPath = $this->templateDirectory.DIRECTORY_SEPARATOR.$fileName;
        $this->removeTemplateDirectory($extractPath);
    }

    public function removeTemplateDirectory($extractPath)
    {
        $fs = new FileSystem();
        $fs->remove($extractPath);
    }

    public function getPersonalWorkspaceExcludingRoles(array $roles, $includeOrphans, $empty = false, $offset = null, $limit = null)
    {
        return $this->workspaceRepo->findPersonalWorkspaceExcludingRoles($roles, $includeOrphans, $empty, $offset, $limit);
    }

    public function getPersonalWorkspaceByRolesIncludingGroups(array $roles, $includeOrphans, $empty = false, $offset = null, $limit = null)
    {
        return $this->workspaceRepo->findPersonalWorkspaceByRolesIncludingGroups($roles, $includeOrphans, $empty, $offset, $limit);
    }

    public function getNonPersonalByCodeAndName($code, $name, $offset = null, $limit = null)
    {
        return !$code && !$name ?
            $this->workspaceRepo->findBy(['personal' => false]) :
            $this->workspaceRepo->findNonPersonalByCodeAndName($code, $name, $offset, $limit);
    }

    /**
     * This method will bind each workspaces that don't already have an organization to the default one.
     */
    public function bindWorkspaceToOrganization()
    {
        $limit = 250;
        $offset = 0;
        $organizationManager = $this->container->get('claroline.manager.organization.organization_manager');
        $this->log('Add organizations to workspaces...');
        $this->om->startFlushSuite();
        $countWorkspaces = $this->om->count('ClarolineCoreBundle:Workspace\Workspace');

        while ($offset < $countWorkspaces) {
            //if there is too many workspaces, we retrieve them by small amounts
            $workspaces = $this->workspaceRepo->findBy([], null, $limit, $offset);
            $default = $organizationManager->getDefault();
            $this->om->merge($default);

            foreach ($workspaces as $workspace) {
                if (0 === count($workspace->getOrganizations())) {
                    $this->log('Add default organization for workspace '.$workspace->getCode());
                    $workspace->addOrganization($default);
                    $this->om->persist($workspace);
                } else {
                    $this->log('Organization already exists for workspace '.$workspace->getCode());
                }
            }

            $this->log("Flushing... [UOW = {$this->om->getUnitOfWork()->size()}]");
            $this->om->forceFlush();
            $this->om->clear();

            $offset += $limit;
        }

        $this->om->endFlushSuite();
    }

    public function isManager(Workspace $workspace, TokenInterface $token)
    {
        if (!$token->getUser() instanceof User) {
            return false;
        }

        if (!$this->isUsurper($token)) {
            if ($workspace->getCreator() === $token->getUser()) {
                return true;
            }

            //if we're amongst the administrators of the organizations
            $adminOrganizations = $token->getUser()->getAdministratedOrganizations();
            $workspaceOrganizations = $workspace->getOrganizations();

            foreach ($adminOrganizations as $adminOrganization) {
                foreach ($workspaceOrganizations as $workspaceOrganization) {
                    if ($workspaceOrganization === $adminOrganization) {
                        return true;
                    }
                }
            }
        }

        //or we have the role_manager
        $managerRole = $workspace->getManagerRole();
        if ($managerRole) {
            foreach ($token->getRoles() as $role) {
                if ($managerRole->getName() === $role->getRole() || 'ROLE_ADMIN' === $role->getRole()) {
                    return true;
                }
            }
        }

        return false;
    }

    protected function isUsurper(TokenInterface $token)
    {
        return $token instanceof ViewAsToken;
    }

    /**
     * Gets the list of role which have access to the workspace.
     * (either workspace roles or a platform role with ws tool access).
     *
     * @param Workspace $workspace
     *
     * @return Role[]
     */
    public function getRolesWithAccess(Workspace $workspace)
    {
        return $this->roleManager->getWorkspaceRoleWithToolAccess($workspace);
    }

    //used for cli copy debug tool
    public function copyFromCode(Workspace $workspace, $code)
    {
        if ($this->logger) {
            $this->container->get('claroline.api.serializer')->setLogger($this->logger);
        }

        $newWorkspace = new Workspace();
        $newWorkspace->setCode($code);
        $newWorkspace->setName($code);
        $newWorkspace = $this->copy($workspace, $newWorkspace);
        //override code & name
        $newWorkspace->setCode($code);
        $newWorkspace->setName($code);

        return $newWorkspace;
    }

    /**
     * Copies a Workspace.
     *
     * @param Workspace $workspace    - the original workspace to copy
     * @param Workspace $newWorkspace - the copy
     * @param bool      $model        - if true, the new workspace will be a model
     *
     * @return Workspace
     */
    public function copy(Workspace $workspace, Workspace $newWorkspace, $model = false)
    {
        $newWorkspace->setGuid(uniqid('', true));

        $newWorkspace->setModel($model);
        // create new name and code
        $ws = $this->getOneByCode($newWorkspace->getCode());

        //the && part is if we somehow already flushed the workspace
        if ($ws && $ws->getId() !== $newWorkspace->getId()) {
            $name = $newWorkspace->getName().'-'.uniqid('', true);
            $code = $newWorkspace->getCode().'-'.uniqid('', true);
        } else {
            $name = $newWorkspace->getName();
            $code = $newWorkspace->getCode();
        }

        $newWorkspace->setName($name);
        $newWorkspace->setCode($code);

        $this->createWorkspace($newWorkspace);
        $token = $this->container->get('security.token_storage')->getToken();
        $user = null;
        $resourceInfo = ['copies' => []];
        $user = $newWorkspace->getCreator();

        if (!$user) {
            $user = (!$user && $token && 'anon.' !== $token->getUser()) ?
              $this->container->get('security.token_storage')->getToken()->getUser() :
              $this->container->get('claroline.manager.user_manager')->getDefaultClarolineAdmin();
        }

        $this->om->startFlushSuite();
        $this->duplicateWorkspaceOptions($workspace, $newWorkspace);
        $this->duplicateWorkspaceRoles($workspace, $newWorkspace, $user);
        $baseRoot = $this->duplicateRoot($workspace, $newWorkspace, $user);
        $resourceNodes = $this->resourceManager->getWorkspaceRoot($workspace)->getChildren()->toArray();
        $toCopy = [];

        foreach ($resourceNodes as $resourceNode) {
            $toCopy[$resourceNode->getId()] = $resourceNode;
        }

        foreach ($resourceNodes as $resourceNode) {
            if ('activity' === $resourceNode->getResourceType()->getName() && $this->resourceManager->getResourceFromNode($resourceNode)) {
                $primRes = $this->resourceManager->getResourceFromNode($resourceNode)->getPrimaryResource();
                $parameters = $this->resourceManager->getResourceFromNode($resourceNode)->getParameters();
                if ($primRes) {
                    unset($toCopy[$primRes->getId()]);
                    $ancestors = $this->resourceManager->getAncestors($primRes);
                    foreach ($ancestors as $ancestor) {
                        unset($toCopy[$ancestor['id']]);
                    }
                }
                if ($parameters) {
                    foreach ($parameters->getSecondaryResources() as $secRes) {
                        unset($toCopy[$secRes->getId()]);
                        $ancestors = $this->resourceManager->getAncestors($secRes);
                        foreach ($ancestors as $ancestor) {
                            unset($toCopy[$ancestor['id']]);
                        }
                    }
                }
                unset($toCopy[$resourceNode->getId()]);
            }
        }

        $this->duplicateResources(
          $toCopy,
          $this->getArrayRolesByWorkspace($newWorkspace),
          $user,
          $baseRoot,
          $resourceInfo
        );

        //workspace needs to be flushed with the new implementation
        $this->om->forceFlush();
        $this->duplicateOrderedTools($workspace, $newWorkspace, $resourceInfo);
        $this->om->endFlushSuite();

        $homeTabs = $this->container->get('claroline.manager.home_tab_manager')->getHomeTabByWorkspace($workspace);
        //get home tabs from source
        $this->duplicateHomeTabs($newWorkspace, $homeTabs, $resourceInfo);

        $this->container->get('claroline.security.token_updater')->updateNormal($token);

        return $newWorkspace;
    }

    public function duplicateRoot(Workspace $source, Workspace $workspace, User $user)
    {
        $this->log('Duplicating root directory...');
        $rootDirectory = new Directory();
        $rootDirectory->setName($workspace->getName());
        $directoryType = $this->resourceManager->getResourceTypeByName('directory');
        $rootCopy = $this->resourceManager->create(
            $rootDirectory,
            $directoryType,
            $user,
            $workspace,
            null,
            null,
            []
        );

        $workspaceRoles = $this->getArrayRolesByWorkspace($workspace);
        $baseRoot = $this->resourceManager->getWorkspaceRoot($source);

        /*** Copies rights ***/

        $this->duplicateRights(
            $baseRoot,
            $rootCopy->getResourceNode(),
            $workspaceRoles
        );

        return $rootCopy->getResourceNode();
    }

    /**
     * @param ResourceNode[] $resourceNodes
     * @param Role[]         $workspaceRoles
     * @param User           $user
     * @param ResourceNode   $rootNode
     */
    public function duplicateResources(
        array $resourceNodes,
        array $workspaceRoles,
        User $user,
        ResourceNode $rootNode,
        &$resourceInfos = []
    ) {
        $ids = [];
        $resourceNodes = array_filter($resourceNodes, function ($node) use ($ids) {
            if (!in_array($node->getId(), $ids)) {
                $ids[] = $node->getId();

                return true;
            }

            return false;
        });

        $this->om->flush();
        $this->om->startFlushSuite();
        $copies = [];
        $resourcesErrors = [];
        $this->log('Duplicating '.count($resourceNodes).' children...');
        foreach ($resourceNodes as $resourceNode) {
            try {
                $this->log('Duplicating '.$resourceNode->getName().' - '.$resourceNode->getId().' - from type '.$resourceNode->getResourceType()->getName().' into '.$rootNode->getName());
                //activities will be removed anyway
                //$bypass = ['activity'];
                $bypass = [];
                if (!in_array($resourceNode->getResourceType()->getName(), $bypass)) {
                    $this->log('Firing resourcemanager copy method for '.$resourceNode->getName());
                    $copy = $this->resourceManager->copy(
                      $resourceNode,
                      $rootNode,
                      $user,
                      false,
                      false
                  );
                    if ($copy) {
                        $copy->getResourceNode()->setIndex($resourceNode->getIndex());
                        $this->om->persist($copy->getResourceNode());
                        $resourceInfos['copies'][] = ['original' => $resourceNode, 'copy' => $copy->getResourceNode()];
                        /*** Copies rights ***/
                        $this->duplicateRights(
                            $resourceNode,
                            $copy->getResourceNode(),
                            $workspaceRoles
                        );
                    }
                }
            } catch (NotPopulatedEventException $e) {
                $resourcesErrors[] = [
                    'resourceName' => $resourceNode->getName(),
                    'resourceType' => $resourceNode->getResourceType()->getName(),
                    'type' => 'copy',
                    'error' => $e->getMessage(),
                ];
                continue;
            }
        }

        /*** Sets previous and next for each copied resource ***/
        $this->linkResourcesArray($copies);
        $this->om->endFlushSuite();
    }

    /**
     * @param AbstractResource[] $resources
     */
    public function linkResourcesArray(array $resources)
    {
        for ($i = 1; $i < count($resources); ++$i) {
            $node = $resources[$i]->getResourceNode();
            $node->setIndex($i);
            $this->om->persist($node);
        }
    }

    /**
     * @param ResourceNode $resourceNode
     * @param ResourceNode $copy
     * @param array        $workspaceRoles
     */
    public function duplicateRights(
        ResourceNode $resourceNode,
        ResourceNode $copy,
        array $workspaceRoles
    ) {
        $this->log('Start duplicate');
        $rights = $resourceNode->getRights();
        $usedRoles = [];

        foreach ($rights as $right) {
            $role = $right->getRole();
            $key = $role->getTranslationKey();
            $newRight = new ResourceRights();
            $newRight->setResourceNode($copy);
            $newRight->setMask($right->getMask());
            $newRight->setCreatableResourceTypes(
                $right->getCreatableResourceTypes()->toArray()
            );
            if ($role->getWorkspace()) {
                if (
                isset($workspaceRoles[$key]) &&
                !empty($workspaceRoles[$key])
                ) {
                    $usedRole = $copy->getWorkspace()->getGuid() === $workspaceRoles[$key]->getWorkspace()->getGuid() ?
                      $workspaceRoles[$key] : $role;
                    if (!in_array($usedRole->getTranslationKey(), $usedRoles)) {
                        $usedRoles[] = $usedRole->getTranslationKey();
                        $newRight->setRole($usedRole);
                        $this->log('Duplicating resource rights for '.$copy->getName().' - '.$copy->getId().' - '.$usedRole->getName().'...');
                        $this->om->persist($newRight);
                    } else {
                        $this->log('Already in array resource rights for '.$copy->getName().' - '.$copy->getId().' - '.$usedRole->getName().'...');
                    }
                } else {
                    $this->log('Dont do anything');
                }
            }
        }

        foreach ($copy->getChildren() as $child) {
            foreach ($resourceNode->getChildren() as $sourceChild) {
                if ($child->getPathForDisplay() === $sourceChild->getPathForDisplay()) {
                    $this->duplicateRights($sourceChild, $child, $workspaceRoles);
                }
            }
        }

        $this->om->flush();
    }

    /**
     * @param Workspace $source
     * @param Workspace $workspace
     */
    public function duplicateOrderedTools(Workspace $source, Workspace $workspace, $resourceInfos = ['copies' => []])
    {
        $this->log('Duplicating tools...');
        $orderedTools = $source->getOrderedTools();
        $workspaceRoles = $this->getArrayRolesByWorkspace($workspace);

        foreach ($orderedTools as $orderedTool) {
            $workspaceOrderedTool = $this->container->get('claroline.manager.tool_manager')->setWorkspaceTool(
                $orderedTool->getTool(),
                $orderedTool->getOrder(),
                $orderedTool->getName(),
                $workspace
            );
            $workspaceOrderedTool->setOrder($orderedTool->getOrder());
            $rights = $orderedTool->getRights();

            foreach ($rights as $right) {
                $role = $right->getRole();

                if (1 === $role->getType()) {
                    $this->container->get('claroline.manager.tool_rights_manager')->setToolRights(
                        $workspaceOrderedTool,
                        $role,
                        $right->getMask()
                    );
                } else {
                    $key = $role->getTranslationKey();
                    if (isset($workspaceRoles[$key]) && !empty($workspaceRoles[$key])) {
                        $this->container->get('claroline.manager.tool_rights_manager')->setToolRights(
                            $workspaceOrderedTool,
                            $workspaceRoles[$key],
                            $right->getMask()
                        );
                    }
                }
            }
        }
    }

    /**
     * @param Workspace $workspace
     * @param array     $homeTabs
     * @param array     $resourceInfos
     *
     * @return array
     */
    public function duplicateHomeTabs(Workspace $workspace, array $homeTabs, $resourceInfos = [])
    {
        $this->log('Duplicating home tabs...');
        $serializer = $this->container->get('claroline.api.serializer');
        $crud = $this->container->get('claroline.api.crud');
        $newTabs = [];

        // Creates a mapping for copied nodes with the uuid of the original one
        $resourcesMapping = [];

        if (isset($resourceInfos['copies'])) {
            foreach ($resourceInfos['copies'] as $infos) {
                $originalUuid = $infos['original']->getUuid();
                $resourcesMapping[$originalUuid] = $serializer->serialize($infos['copy'], [Options::SERIALIZE_MINIMAL]);
            }
        }

        foreach ($homeTabs as $homeTab) {
            $homeTabSerialized = $serializer->serialize($homeTab, [Options::REFRESH_UUID]);
            $homeTabSerialized['workspace'] = $serializer->serialize($workspace, [Options::SERIALIZE_MINIMAL]);

            // Updates target of resource widgets
            foreach ($homeTabSerialized['widgets'] as $wKey => $widgetContainer) {
                foreach ($widgetContainer['contents'] as $cKey => $widget) {
                    if ('resource' === $widget['type'] &&
                        isset($widget['parameters']['resource']['id']) &&
                        isset($resourcesMapping[$widget['parameters']['resource']['id']])
                    ) {
                        $homeTabSerialized['widgets'][$wKey]['contents'][$cKey]['parameters']['resource'] =
                            $resourcesMapping[$widget['parameters']['resource']['id']];
                    }
                }
            }

            $newTabs[] = $crud->create(HomeTab::class, $homeTabSerialized, [Options::NO_FETCH]);
            //maybe not a good idea
            $this->om->forceFlush();
        }

        return $newTabs;
    }

    /**
     * @param \Claroline\CoreBundle\Entity\Workspace\Workspace $source
     * @param \Claroline\CoreBundle\Entity\Workspace\Workspace $workspace
     * @param \Claroline\CoreBundle\Entity\User                $user
     */
    public function duplicateWorkspaceRoles(
        Workspace $source,
        Workspace $workspace,
        User $user
    ) {
        $this->log('Duplicating roles...');
        $guid = $workspace->getGuid();
        $roles = $source->getRoles();

        foreach ($roles as $role) {
            $unusedRolePartName = '_'.$role->getWorkspace()->getGuid();
            $roleName = str_replace($unusedRolePartName, '', $role->getName());
            $this->log('Duplicating '.$role->getName().' as '.$roleName.'_'.$guid);
            $createdRole = $this->roleManager->createWorkspaceRole(
                $roleName.'_'.$guid,
                $role->getTranslationKey(),
                $workspace,
                $role->isReadOnly()
            );

            $this->om->persist($createdRole);

            if ('ROLE_WS_MANAGER' === $roleName) {
                $this->log('Adding role manager to user '.$user->getUsername());
                $user->addRole($createdRole);
                $this->om->persist($user);
            }
        }
    }

    /**
     * @param \Claroline\CoreBundle\Entity\Workspace\Workspace $source
     * @param \Claroline\CoreBundle\Entity\Workspace\Workspace $workspace
     */
    public function duplicateWorkspaceOptions(Workspace $source, Workspace $workspace)
    {
        $sourceOptions = $source->getOptions();

        if (!is_null($sourceOptions)) {
            $options = !$workspace->getOptions() ? new WorkspaceOptions() : $workspace->getOptions();
            $options->setWorkspace($workspace);
            $details = $sourceOptions->getDetails();
            if (!is_null($details)) {
                $details['use_workspace_opening_resource'] = false;
                $details['workspace_opening_resource'] = null;
            }
            $options->setDetails($details);
            $workspace->setOptions($options);
            $this->om->persist($options);
            $this->om->persist($workspace);
            $this->om->flush();
        }
    }

    /**
     * @param Workspace $workspace
     *
     * @return array
     */
    public function getArrayRolesByWorkspace(Workspace $workspace)
    {
        $workspaceRoles = [];
        $uow = $this->om->getUnitOfWork();
        $wRoles = $this->roleManager->getRolesByWorkspace($workspace);
        $scheduledForInsert = $uow->getScheduledEntityInsertions();

        foreach ($scheduledForInsert as $entity) {
            if ('Claroline\CoreBundle\Entity\Role' === get_class($entity)) {
                if ($entity->getWorkspace()) {
                    if ($entity->getWorkspace()->getGuid() === $workspace->getGuid()) {
                        $wRoles[] = $entity;
                    }
                }
            }
        }
        //now we build the array
        foreach ($wRoles as $wRole) {
            $workspaceRoles[$wRole->getTranslationKey()] = $wRole;
        }

        return $workspaceRoles;
    }

    public function getDefaultModel($isPersonal = false, $restore = false)
    {
        $this->log('Search old default workspace...');

        $name = $isPersonal ? 'default_personal' : 'default_workspace';
        $workspace = $this->workspaceRepo->findOneBy(['code' => $name, 'personal' => $isPersonal, 'model' => true]);

        if (!$workspace || $restore) {
            $this->log('Rebuilding...');
            //don't log this or it'll crash everything during the platform installation
            //(some database tables aren't already created because they come from plugins)
            if ($workspace && $restore) {
                $this->om->remove($workspace);
            }

            $this->container->get('claroline.core_bundle.listener.log.log_listener')->disable();

            $workspace = new Workspace();
            $workspace->setName($name);
            $workspace->setPersonal($isPersonal);
            $workspace->setCode($name);
            $workspace->setModel(true);
            $this->log('Build and set default admin');
            $workspace->setCreator($this->container->get('claroline.manager.user_manager')->getDefaultClarolineAdmin());
            $templateName = $isPersonal ? 'claroline.param.personal_template' : 'claroline.param.default_template';
            $template = new File($this->container->getParameter($templateName));
            $this->log('Build from archive...');
            $this->container->get('claroline.manager.transfer_manager')->createWorkspace($workspace, $template, true);
            $this->container->get('claroline.core_bundle.listener.log.log_listener')->setDefaults();
            $this->log('Add tools...');
            $this->container->get('claroline.manager.tool_manager')->addMissingWorkspaceTools($workspace);

            if ($restore) {
                $this->om->persist($workspace);
                $this->om->flush();
            }
        }

        return $workspace;
    }

    /**
     * Retrieves the managers list for a workspace.
     *
     * @param Workspace $workspace
     *
     * @return User[]
     */
    public function getManagers(Workspace $workspace)
    {
        $roleManager = $this->roleManager->getManagerRole($workspace);

        return $this->userRepo->findUsersByRolesIncludingGroups([$roleManager]);
    }

    public function getRecentWorkspaceForUser(User $user, array $roles)
    {
        $wsLogs = $this->getLatestWorkspacesByUser($user, $roles);
        $workspaces = [];

        if (!empty($wsLogs)) {
            foreach ($wsLogs as $wsLog) {
                $workspaces[] = $wsLog['workspace'];
            }
        }

        return $workspaces;
    }

    public function addRecentWorkspaceForUser(User $user, Workspace $workspace)
    {
        /** @var WorkspaceRecentRepository $recentWorkspaceRepo */
        $recentWorkspaceRepo = $this->om->getRepository('ClarolineCoreBundle:Workspace\WorkspaceRecent');
        //If workspace already in recent workspaces, update date
        $recentWorkspace = $recentWorkspaceRepo->findOneBy(['user' => $user, 'workspace' => $workspace]);
        //Otherwise create new entry
        if (empty($recentWorkspace)) {
            $recentWorkspace = new WorkspaceRecent();
            $recentWorkspace->setUser($user);
            $recentWorkspace->setWorkspace($workspace);
        }
        $recentWorkspace->setEntryDate(new \DateTime());

        $this->om->persist($recentWorkspace);
        $this->om->flush();
    }

    // Clean all recent workspaces that are more than 6 months old
    public function cleanRecentWorkspaces()
    {
        $this->log('Cleaning recent workspaces entries that are older than six months');

        /** @var WorkspaceRecentRepository $recentWorkspaceRepo */
        $recentWorkspaceRepo = $this->om->getRepository('ClarolineCoreBundle:Workspace\WorkspaceRecent');
        $recentWorkspaceRepo->removeAllEntriesBefore(new \DateTime('-6 months'));
    }

    public function unregister(AbstractRoleSubject $subject, Workspace $workspace)
    {
        $rolesToRemove = array_filter($workspace->getRoles()->toArray(), function (Role $role) use ($workspace) {
            return $role->getWorkspace()->getId() === $workspace->getId();
        });

        foreach ($rolesToRemove as $role) {
            $this->roleManager->dissociateRole($subject, $role);
        }
    }
}
