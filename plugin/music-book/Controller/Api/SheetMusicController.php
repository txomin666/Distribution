<?php

namespace Claroline\MusicBookBundle\Controller\Api;

use Claroline\MusicBookBundle\Entity\SheetMusic;
use Claroline\MusicBookBundle\Form\Type\SheetMusicType;
use JMS\DiExtraBundle\Annotation as DI;
use Sensio\Bundle\FrameworkExtraBundle\Configuration as EXT;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

/**
 * SheetMusic CRUD Controller.
 *
 * @EXT\Route("/sheet_music", options={"expose"=true})
 */
class SheetMusicController
{
    /**
     * Lists all SheetMusic.
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
            ->getRepository('ClarolineMusicBookBundle:SheetMusic')
            ->findBy([], ['name' => 'ASC']);

        return new JsonResponse($entities);
    }

    /**
     * Gets a SheetMusic entity.
     *
     * @EXT\Route("/{id}")
     * @EXT\Method("GET")
     *
     * @param SheetMusic $sheetMusic
     *
     * @return JsonResponse
     */
    public function getAction(SheetMusic $sheetMusic)
    {
        return new JsonResponse($sheetMusic);
    }

    /**
     * Creates a new SheetMusic.
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
        $sheetMusic = new SheetMusic();
        $form = $this->createForm(SheetMusicType::class, $sheetMusic);

        $form->submit($request->get('data'));
        if ($form->isValid()) {
            // Save entity
            $this->container->get('doctrine.orm.entity_manager')->persist($sheetMusic);
            $this->container->get('doctrine.orm.entity_manager')->flush();

            return new JsonResponse($sheetMusic, 201);
        }

        $errors = $this->getFormErrors($form);

        return new JsonResponse($errors, 422);
    }

    /**
     * Edits a SheetMusic.
     *
     * @EXT\Route("/{id}")
     * @EXT\Method("PUT")
     *
     * @param SheetMusic $sheetMusic
     * @param Request $request
     *
     * @return JsonResponse
     */
    public function updateAction(SheetMusic $sheetMusic, Request $request)
    {
        $form = $this->createForm(SheetMusicType::class, $sheetMusic, [
            'method' => 'PUT',
        ]);

        $form->submit([$form->getName() => $request->get('data')]);
        if ($form->isValid()) {
            // Save entity
            $this->container->get('doctrine.orm.entity_manager')->persist($sheetMusic);
            $this->container->get('doctrine.orm.entity_manager')->flush();

            return new JsonResponse($sheetMusic);
        }

        $errors = $this->getFormErrors($form);

        return new JsonResponse($errors, 422);
    }

    /**
     * Deletes a SheetMusic.
     *
     * @EXT\Route("/{id}")
     * @EXT\Method("DELETE")
     *
     * @param SheetMusic $sheetMusic
     *
     * @return JsonResponse
     */
    public function deleteAction(SheetMusic $sheetMusic)
    {
        $this->getDoctrine()->getManager()->remove($sheetMusic);
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
