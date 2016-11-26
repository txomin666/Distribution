<?php

namespace Claroline\MusicTheoryBundle\Controller\Api;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration as EXT;
use Symfony\Component\HttpFoundation\JsonResponse;
use Claroline\MusicTheoryBundle\Entity\Scale;

/**
 * Scale CRUD Controller.
 *
 * @EXT\Route("/scales")
 */
class ScaleController extends Controller
{
    /**
     * List all Scales.
     *
     * @return JsonResponse
     *
     * @EXT\Route("")
     * @EXT\Method("GET")
     */
    public function listAction()
    {
        $entities = $this->container->get('doctrine.orm.entity_manager')
            ->getRepository('TheoryBundle:Scale')
            ->findBy(array(), array());

        return new JsonResponse($entities);
    }

    /**
     * Get a Scale entity.
     *
     * @param Scale $scale
     *
     * @return JsonResponse
     *
     * @EXT\Route("/{id}")
     * @EXT\Method("GET")
     */
    public function getAction(Scale $scale)
    {
        return new JsonResponse($scale);
    }
}
