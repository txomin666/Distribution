<?php

namespace Innova\AudioReactBundle\EventListener\Resource;

use Claroline\CoreBundle\Event\CopyResourceEvent;
use Claroline\CoreBundle\Event\CreateFormResourceEvent;
use Claroline\CoreBundle\Event\CreateResourceEvent;
use Claroline\CoreBundle\Event\CustomActionResourceEvent;
use Claroline\CoreBundle\Event\DeleteResourceEvent;
use Claroline\CoreBundle\Event\OpenResourceEvent;
use Innova\AudioReactBundle\Entity\MediaResource;
use Innova\AudioReactBundle\Form\Type\MediaResourceType;
use JMS\DiExtraBundle\Annotation as DI;
use Symfony\Component\DependencyInjection\ContainerAware;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpFoundation\RedirectResponse;

/**
 * Media Resource Event Listener
 * Used to integrate Path to Claroline resource manager.
 *
 *  @DI\Service()
 */
class MediaResourceListener extends ContainerAware
{
    protected $container;

    /**
     * @DI\InjectParams({
     *      "container" = @DI\Inject("service_container")
     * })
     */
    public function __construct(ContainerInterface $container)
    {
        $this->container = $container;
    }

    /**
     * @DI\Observe("innova_audio_react_administrate_innova_audio_react")
     **/
    public function onAdministrate(CustomActionResourceEvent $event)
    {
        $mediaResource = $event->getResource();
        $route = $this->container
                ->get('router')
                ->generate('innova_audio_react_administrate', [
            'id' => $mediaResource->getId(),
            'workspaceId' => $mediaResource->getWorkspace()->getId(),
          ]
        );
        $event->setResponse(new RedirectResponse($route));
        $event->stopPropagation();
    }

    /**
     * @DI\Observe("open_innova_audio_react")
     */
    public function onOpen(OpenResourceEvent $event)
    {
        $mediaResource = $event->getResource();
        $route = $this->container
                ->get('router')
                ->generate('innova_audio_react_open', [
            'id' => $mediaResource->getId(),
            'workspaceId' => $mediaResource->getWorkspace()->getId(),
          ]
        );
        $event->setResponse(new RedirectResponse($route));
        $event->stopPropagation();
    }

    /**
     * @DI\Observe("create_innova_audio_react")
     *
     * @param CreateResourceEvent $event
     *
     * @throws \Exception
     */
    public function onCreate(CreateResourceEvent $event)
    {
        // Create form
        $form = $this->container->get('form.factory')->create(new MediaResourceType(), new MediaResource());
        // Try to process form
        $request = $this->container->get('request');
        $form->submit($request);
        if ($form->isValid()) {
            $mediaResource = $form->getData();
            $file = $form['file']->getData();
            $workspace = $event->getParent()->getWorkspace();
            $this->container->get('innova_audio_react.manager.media_resource')->createMediaResourceDefaultOptions($mediaResource);
            $this->container->get('innova_audio_react.manager.media_resource')->handleMediaResourceMedia($file, $mediaResource, $workspace);
            // Send new MediaResource to dispatcher through event object
            $event->setResources([$mediaResource]);
        } else {
            $content = $this->container->get('templating')->render(
                    'ClarolineCoreBundle:Resource:createForm.html.twig', [
                      'form' => $form->createView(),
                      'resourceType' => 'innova_audio_react',
                    ]
            );
            $event->setErrorFormContent($content);
        }
        $event->stopPropagation();

        return;
    }

    /**
     * @DI\Observe("create_form_innova_audio_react")
     */
    public function onCreateForm(CreateFormResourceEvent $event)
    {
        // Create form
        $form = $this->container->get('form.factory')->create(new MediaResourceType(), new MediaResource());
        $content = $this->container->get('templating')->render(
                'ClarolineCoreBundle:Resource:createForm.html.twig', [
                    'form' => $form->createView(),
                    'resourceType' => 'innova_audio_react',
                ]
        );
        $event->setResponseContent($content);
        $event->stopPropagation();
    }

    /**
     * @DI\Observe("delete_innova_audio_react")
     **/
    public function onDelete(DeleteResourceEvent $event)
    {
        $mediaResource = $event->getResource();
        $manager = $this->container->get('innova_audio_react.manager.media_resource');
        $manager->delete($mediaResource);

        $event->stopPropagation();
    }

    /**
     * Fired when a ResourceNode of type MediaResource is duplicated.
     *
     * @DI\Observe("copy_innova_audio_react")
     *
     * @param \Claroline\CoreBundle\Event\CopyResourceEvent $event
     *
     * @throws \Exception
     */
    public function onCopy(CopyResourceEvent $event)
    {
        $toCopy = $event->getResource();
        $new = new MediaResource();
        $new->setName($toCopy->getName());

        // copy options
        $this->container->get('innova_audio_react.manager.media_resource')->copyOptions($new, $toCopy);
        // duplicate media resource media(s) (=file(s))
        $medias = $toCopy->getMedias();
        foreach ($medias as $media) {
            $this->container->get('innova_audio_react.manager.media_resource')->copyMedia($new, $media);
        }

        // duplicate regions and region config
        $regions = $toCopy->getRegions();
        foreach ($regions as $region) {
            $this->container->get('innova_audio_react.manager.media_resource_region')->copyRegion($new, $region);
        }
        $event->setCopy($new);
        $event->stopPropagation();
    }
}
