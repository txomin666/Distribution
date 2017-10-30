<?php

namespace Claroline\CoreBundle\API;

use Doctrine\ODM\MongoDB\Query\Builder as DocumentQueryBuilder;
use Doctrine\ORM\QueryBuilder;

abstract class AbstractFinder
{
    //the queried object is already named "obj".
    public function configureEntityQueryBuilder(QueryBuilder $qb, array $searches, array $sortBy = null)
    {
        //with more stuff here
        throw new \Exception('Please implements me entity');
    }
    public function configureDocumentQueryBuilder(DocumentQueryBuilder $qb, array $searches, array $sortBy = null)
    {
        //with more stuff here
        throw new \Exception('Please implements me document');
    }
    abstract public function getClass();
}
