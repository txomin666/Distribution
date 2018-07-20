<?php

namespace Icap\BadgeBundle\Finder;

use Claroline\AppBundle\API\Finder\AbstractFinder;
use Doctrine\ORM\QueryBuilder;

/**
 * @DI\Service("claroline.api.finder.badge")
 * @DI\Tag("claroline.finder")
 */
class BadgeFinder extends AbstractFinder
{
    public function getClass()
    {
        return 'Icap\BadgeBundle\Entity\Badge';
    }

    public function configureQueryBuilder(QueryBuilder $qb, array $searches, array $sortBy = null)
    {
        return $qb;
    }
}
