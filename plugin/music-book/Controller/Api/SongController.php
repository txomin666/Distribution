<?php

namespace Claroline\MusicBookBundle\Controller\Api;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Claroline\MusicBookBundle\Entity\Song;
use Claroline\MusicBookBundle\Form\Type\SongType;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Sensio\Bundle\FrameworkExtraBundle\Configuration as EXT;

/**
 * Song CRUD Controller.
 *
 * @EXT\Route("/songs", options={"expose"=true})
 */
class SongController extends Controller
{
    /**
     * Lists all Songs.
     *
     * @EXT\Route("")
     * @EXT\Method("GET")
     *
     * @return JsonResponse
     */
    public function listAction()
    {
        $entities = $this->container
            ->get('doctrine.orm.entity_manager')
            ->getRepository('ClarolineMusicBookBundle:Song')
            ->findBy([], ['name' => 'ASC']);

        return new JsonResponse($entities);
    }

    /**
     * Gets a Song entity.
     *
     * @EXT\Route("/{id}")
     * @EXT\Method("GET")
     *
     * @param Song $song
     *
     * @return JsonResponse
     */
    public function getAction(Song $song)
    {
        return new JsonResponse($song);
    }

    /**
     * Creates a new Song.
     *
     * @EXT\Route("")
     * @EXT\Method("POST")
     *
     * @param Request $request
     *
     * @return JsonResponse
     */
    public function createAction(Request $request)
    {
        $song = new Song();
        $form = $this->createForm(SongType::class, $song);

        $form->submit($request->get('data'));
        if ($form->isValid()) {
            // Save entity
            $this->container->get('doctrine.orm.entity_manager')->persist($song);
            $this->container->get('doctrine.orm.entity_manager')->flush();

            return new JsonResponse($song, 201);
        }

        $errors = $this->getFormErrors($form);

        return new JsonResponse($errors, 422);
    }

    /**
     * Edits a Song.
     *
     * @EXT\Route("/{id}")
     * @EXT\Method("PUT")
     *
     * @param Song    $song
     * @param Request $request
     *
     * @return JsonResponse
     */
    public function updateAction(Song $song, Request $request)
    {
        $form = $this->createForm(SongType::class, $song, [
            'method' => 'PUT',
        ]);

        $form->submit([$form->getName() => $request->get('data')]);
        if ($form->isValid()) {
            // Save entity
            $this->container->get('doctrine.orm.entity_manager')->persist($song);
            $this->container->get('doctrine.orm.entity_manager')->flush();

            return new JsonResponse($song);
        }

        $errors = $this->getFormErrors($form);

        return new JsonResponse($errors, 422);
    }

    /**
     * Deletes a Song.
     *
     * @EXT\Route("/{id}")
     * @EXT\Method("DELETE")
     *
     * @param Song $song
     *
     * @return JsonResponse
     */
    public function deleteAction(Song $song)
    {
        $this->getDoctrine()->getManager()->remove($song);
        $this->getDoctrine()->getManager()->flush();

        return new JsonResponse(null, 204);
    }

    /**
     * @param $form
     *
     * @return array
     */
    private function getFormErrors(FormInterface $form)
    {
        $errors = [];
        foreach ($form->getErrors() as $key => $error) {
            $errors[$key] = $error->getMessage();
        }

        // Get errors from children
        foreach ($form->all() as $child) {
            if (!$child->isValid()) {
                $errors[$child->getName()] = $this->getFormErrors($child);
            }
        }

        return $errors;
    }
}
