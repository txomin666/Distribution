<?php

namespace Claroline\MusicTheoryBundle\Controller\Api;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration as EXT;
use Symfony\Component\HttpFoundation\JsonResponse;

/**
 * Interval CRUD Controller.
 *
 * @EXT\Route("/notes")
 */
class NoteController extends Controller
{
    /**
     * List all Notes.
     *
     * @return JsonResponse
     *
     * @EXT\Route("")
     * @EXT\Method("GET")
     */
    public function listAction()
    {
        $entities = $this->container->get('doctrine.orm.entity_manager')
            ->getRepository('TheoryBundle:Note\Note')
            ->findBy(array(), array('value' => 'ASC'));

        return new JsonResponse($entities);
    }
}
