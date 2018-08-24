<?php

namespace Claroline\ResultBundle\Controller\API;

use Claroline\AppBundle\Controller\AbstractCrudController;
use Claroline\ResultBundle\Entity\Result;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

/**
 * @Route("/result")
 */
class ResultController extends AbstractCrudController
{
    public function getName()
    {
        return 'result';
    }

    public function getClass()
    {
        return Result::class;
    }
}
