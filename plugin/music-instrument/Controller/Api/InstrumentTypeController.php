<?php

namespace Claroline\MusicInstrumentBundle\Controller\Api;

use Claroline\MusicInstrumentBundle\Entity\InstrumentType;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration as EXT;
use Symfony\Component\HttpFoundation\JsonResponse;

/**
 * Instrument Type CRUD Controller.
 *
 * @EXT\Route("/instrument_types")
 */
class InstrumentTypeController extends Controller
{
    /**
     * List all Instrument Types.
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
            ->getRepository('InstrumentBundle:InstrumentType')
            ->findBy([], [
                'name' => 'ASC',
            ]);

        return new JsonResponse($entities);
    }

    /**
     * Display an Instrument Type entity.
     *
     * @param InstrumentType $instrumentType
     *
     * @return JsonResponse
     *
     * @EXT\Route("/{id}")
     * @EXT\Method("GET")
     */
    public function getAction(InstrumentType $instrumentType)
    {
        return new JsonResponse($instrumentType);
    }

    /**
     * List generic Instruments for an Instrument Type entity.
     *
     * @param InstrumentType $instrumentType
     *
     * @return JsonResponse
     *
     * @EXT\Route("/{id}/instruments")
     * @EXT\Method("GET")
     */
    public function listInstrumentsAction(InstrumentType $instrumentType)
    {
        $entities = $this->container
            ->get('doctrine.orm.entity_manager')
            ->getRepository('InstrumentBundle:Instrument')
            ->findBy([
                'instrumentType' => $instrumentType,
                'owner' => null, // Only get the platform generic Instruments
            ], [
                'name' => 'ASC',
            ]);

        return new JsonResponse($entities);
    }
}
