<?php

namespace Claroline\MusicInstrumentBundle\Controller\Api;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration as EXT;
use Symfony\Component\HttpFoundation\JsonResponse;
use Claroline\MusicInstrumentBundle\Entity\Tuning;

/**
 * Tuning CRUD Controller.
 *
 * @EXT\Route("/tunings")
 */
class TuningController extends Controller
{
    /**
     * List all Tunings.
     *
     * @return JsonResponse
     *
     * @EXT\Route("")
     * @EXT\Method("GET")
     */
    public function listAction()
    {
        $entities = $this->container
            ->get('doctrine.orm.entity_manager')
            ->getRepository('TuningBundle:Tuning')
            ->findBy([]);

        return new JsonResponse($entities);
    }

    /**
     * Display a Tuning entity.
     *
     * @param Tuning $tuning
     *
     * @return JsonResponse
     *
     * @EXT\Route("/{id}")
     * @EXT\Method("GET")
     */
    public function getAction(Tuning $tuning)
    {
        return new JsonResponse($tuning);
    }
}
