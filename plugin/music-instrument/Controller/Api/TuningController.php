<?php

namespace Claroline\MusicInstrumentBundle\Controller\Api;

use Claroline\CoreBundle\Persistence\ObjectManager;
use Claroline\MusicInstrumentBundle\Entity\Tuning\Tuning;
use JMS\DiExtraBundle\Annotation as DI;
use Sensio\Bundle\FrameworkExtraBundle\Configuration as EXT;
use Symfony\Component\HttpFoundation\JsonResponse;

/**
 * Tuning CRUD Controller.
 *
 * @EXT\Route("/tunings")
 */
class TuningController
{
    /**
     * @var ObjectManager
     */
    private $om;

    /**
     * TuningController constructor.
     *
     * @DI\InjectParams({
     *     "om" = @DI\Inject("claroline.persistence.object_manager")
     * })
     *
     * @param ObjectManager $om
     */
    public function __construct(ObjectManager $om)
    {
        $this->om = $om;
    }

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
        $entities = $this->om->getRepository('TuningBundle:Tuning')->findBy([]);

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
