<?php

namespace Claroline\MusicInstrumentBundle\Controller\Api;

use Claroline\MusicInstrumentBundle\Form\Type\InstrumentType;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration as EXT;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Form\FormInterface;
use Claroline\MusicInstrumentBundle\Entity\Instrument;

/**
 * Instrument CRUD Controller.
 *
 * @EXT\Route("/instruments")
 */
class InstrumentController extends Controller
{
    /**
     * List all Instruments of a User.
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
            ->getRepository('InstrumentBundle:Instrument')
            ->findBy([], ['model' => 'ASC']);

        return new JsonResponse($entities);
    }

    /**
     * Display an Instrument entity.
     *
     * @param Instrument $instrument
     *
     * @return JsonResponse
     *
     * @EXT\Route("/{id}")
     * @EXT\Method("GET")
     */
    public function getAction(Instrument $instrument)
    {
        return new JsonResponse($instrument);
    }

    /**
     * Create a new Instrument.
     *
     * @param Request $request
     *
     * @return JsonResponse
     *
     * @EXT\Route("")
     * @EXT\Method("POST")
     */
    public function createAction(Request $request)
    {
        $instrument = new Instrument();
        $form = $this->createForm(InstrumentType::class, $instrument);

        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            // Save entity
            $this->container->get('doctrine.orm.entity_manager')->persist($instrument);
            $this->container->get('doctrine.orm.entity_manager')->flush();

            return new JsonResponse($instrument, 201);
        }

        $errors = $this->getFormErrors($form);

        return new JsonResponse($errors, 422);
    }

    /**
     * Edit an Instrument.
     *
     * @param Instrument $instrument
     * @param Request    $request
     *
     * @return JsonResponse
     *
     * @EXT\Route("/{id}")
     * @EXT\Method("PUT")
     */
    public function updateAction(Instrument $instrument, Request $request)
    {
        $form = $this->createForm(InstrumentType::class, $instrument, [
            'method' => 'PUT',
        ]);

        $form->handleRequest($request);
        if ($form->isValid()) {
            // Save entity
            $this->container->get('doctrine.orm.entity_manager')->persist($instrument);
            $this->container->get('doctrine.orm.entity_manager')->flush();

            return new JsonResponse($instrument);
        }

        $errors = $this->getFormErrors($form);

        return new JsonResponse($errors, 422);
    }

    /**
     * Delete an Instrument.
     *
     * @param Instrument $instrument
     *
     * @return JsonResponse
     *
     * @EXT\Route("/{id}")
     * @EXT\Method("DELETE")
     */
    public function deleteAction(Instrument $instrument)
    {
        $this->getDoctrine()->getManager()->remove($instrument);
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
        foreach ($form->getErrors(true, false) as $key => $error) {
            $from = $error->getOrigin();

            $errors[$from->getName()] = $error->getMessage();
        }

        // Get errors from children
        foreach ($form->all() as $child) {
            $childErrors = $this->getFormErrors($child);

            if (!empty($childErrors)) {
                $errors[] = $childErrors;
            }
        }

        return $errors;
    }
}
