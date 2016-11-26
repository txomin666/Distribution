<?php

namespace Claroline\MusicTheoryBundle\Controller\Api;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration as EXT;
use Symfony\Component\HttpFoundation\JsonResponse;

/**
 * Degree CRUD Controller.
 *
 * @EXT\Route("/degrees")
 */
class DegreeController extends Controller
{
    /**
     * List all Degrees.
     *
     * @return array
     *
     * @EXT\Route("")
     * @EXT\Method("GET")
     */
    public function listAction()
    {
        $entities = $this->container->get('doctrine.orm.entity_manager')
            ->getRepository('TheoryBundle:Degree')
            ->findBy(array(), array());

        return new JsonResponse($entities);
    }
}
