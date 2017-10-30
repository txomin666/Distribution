<?php

/*
 * This file is part of the Claroline Connect package.
 *
 * (c) Claroline Consortium <consortium@claroline.net>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace UJM\ExoBundle\API\Finder;

use Claroline\CoreBundle\API\AbstractFinder;
use Doctrine\ORM\QueryBuilder;
use JMS\DiExtraBundle\Annotation as DI;

/**
 * Quiz papers finder.
 *
 * @DI\Service("ujm_exo.api.finder.paper")
 * @DI\Tag("claroline.finder")
 */
class PaperFinder extends AbstractFinder
{
    public function getClass()
    {
        return 'UJM\ExoBundle\Entity\Attempt\Paper';
    }

    public function configureEntityQueryBuilder(QueryBuilder $qb, array $searches = [], array $sortBy = null)
    {
        foreach ($searches as $filterName => $filterValue) {
            if (is_string($filterValue)) {
                $qb->andWhere("UPPER(obj.{$filterName}) LIKE :{$filterName}");
                $qb->setParameter($filterName, '%'.strtoupper($filterValue).'%');
            } else {
                $qb->andWhere("obj.{$filterName} = :{$filterName}");
                $qb->setParameter($filterName, $filterValue);
            }
        }

        return $qb;
    }
}
