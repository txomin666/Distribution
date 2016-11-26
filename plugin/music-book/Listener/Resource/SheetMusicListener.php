<?php

namespace Claroline\MusicBookBundle\Listener\Resource;

use Claroline\CoreBundle\Event\CopyResourceEvent;
use Claroline\CoreBundle\Event\CreateFormResourceEvent;
use Claroline\CoreBundle\Event\CreateResourceEvent;
use Claroline\CoreBundle\Event\DeleteResourceEvent;
use Claroline\CoreBundle\Event\OpenResourceEvent;
use Claroline\CoreBundle\Event\PublicationChangeEvent;
use Claroline\MusicBookBundle\Form\Type\SheetMusicType;
use JMS\DiExtraBundle\Annotation as DI;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\HttpKernel\HttpKernelInterface;

/**
 * Listens to resource events dispatched by the core.
 *
 * @DI\Service("claro_music_book.listener.sheet_music")
 */
class SheetMusicListener
{
    /**
     * @var ContainerInterface
     */
    private $container;

    /**
     * SongListener constructor.
     *
     * @DI\InjectParams({
     *     "container" = @DI\Inject("service_container")
     * })
     *
     * @param ContainerInterface $container
     */
    public function __construct(ContainerInterface $container)
    {
        $this->container = $container;
    }

    /**
     * Displays a form to create a SheetMusic resource.
     *
     * @DI\Observe("create_form_claro_sheet_music")
     *
     * @param CreateFormResourceEvent $event
     */
    public function onCreateForm(CreateFormResourceEvent $event)
    {
        /** @var FormInterface $form */
        $form = $this->container->get('form.factory')->create(new SheetMusicType());

        $content = $this->container->get('templating')->render(
            'ClarolineCoreBundle:Resource:createForm.html.twig', [
                'resourceType' => 'claro_sheet_music',
                'form' => $form->createView(),
            ]
        );

        $event->setResponseContent($content);
        $event->stopPropagation();
    }

    /**
     * Creates a new SheetMusic resource.
     *
     * @DI\Observe("create_claro_sheet_music")
     *
     * @param CreateResourceEvent $event
     */
    public function onCreate(CreateResourceEvent $event)
    {
        /** @var FormInterface $form */
        $form = $this->container->get('form.factory')->create(new SheetMusicType());
        $request = $this->container->get('request');

        $form->handleRequest($request);
        if ($form->isValid()) {
            $em = $this->container->get('doctrine.orm.entity_manager');

            $sheetMusic = $form->getData();
            $event->setPublished((bool) $form->get('published')->getData());

            $em->persist($sheetMusic);

            $event->setResources([$sheetMusic]);
        } else {
            $content = $this->container->get('templating')->render(
                'ClarolineCoreBundle:Resource:createForm.html.twig', [
                    'resourceType' => 'claro_sheet_music',
                    'form' => $form->createView(),
                ]
            );

            $event->setErrorFormContent($content);
        }

        $event->stopPropagation();
    }

    /**
     * Opens the SheetMusic resource.
     *
     * @DI\Observe("open_claro_sheet_music")
     *
     * @param OpenResourceEvent $event
     */
    public function onOpen(OpenResourceEvent $event)
    {
        $subRequest = $this->container->get('request_stack')->getCurrentRequest()->duplicate([], null, [
            '_controller' => 'ClarolineMusicBookBundle:Resource\SheetMusic:open',
            'id' => $event->getResource()->getId(),
        ]);

        $response = $this->container->get('http_kernel')->handle($subRequest, HttpKernelInterface::SUB_REQUEST);

        $event->setResponse($response);
        $event->stopPropagation();
    }

    /**
     * Deletes a SheetMusic resource.
     *
     * @DI\Observe("delete_claro_sheet_music")
     *
     * @param DeleteResourceEvent $event
     */
    public function onDelete(DeleteResourceEvent $event)
    {
        $event->stopPropagation();
    }

    /**
     * Copies a SheetMusic resource.
     *
     * @DI\Observe("copy_claro_sheet_music")
     *
     * @param CopyResourceEvent $event
     */
    public function onCopy(CopyResourceEvent $event)
    {
        $event->stopPropagation();
    }

    /**
     * Publishes or unpublishes a SheetMusic resource.
     *
     * @DI\Observe("publication_change_claro_sheet_music")
     *
     * @param PublicationChangeEvent $event
     */
    public function onPublicationChange(PublicationChangeEvent $event)
    {
        $event->stopPropagation();
    }
}
