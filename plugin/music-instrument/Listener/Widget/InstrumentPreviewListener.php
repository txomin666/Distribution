<?php

namespace Claroline\MusicInstrumentBundle\EventListener\Widget;

use Claroline\CoreBundle\Event\ConfigureWidgetEvent;
use Claroline\CoreBundle\Event\DisplayWidgetEvent;
use JMS\DiExtraBundle\Annotation as DI;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpKernel\HttpKernelInterface;

/**
 * Instrument preview widget.
 *
 * @DI\Service("claro_music_instrument.listener.instrument_widget")
 */
class InstrumentPreviewListener
{
    /**
     * @var ContainerInterface
     */
    private $container;

    /**
     * InstrumentPreviewListener constructor.
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
     * Displays the widget.
     *
     * @DI\Observe("widget_claro_instrument_preview")
     *
     * @param DisplayWidgetEvent $event
     */
    public function onDisplay(DisplayWidgetEvent $event)
    {
        $subRequest = $this->container->get('request_stack')->getCurrentRequest()->duplicate([], null, [
            '_controller' => 'ClarolineMusicInstrumentBundle:Widget\InstrumentPreview:display',
        ]);

        $response = $this->container->get('http_kernel')->handle($subRequest, HttpKernelInterface::SUB_REQUEST);

        $event->setContent($response);
        $event->stopPropagation();
    }

    /**
     * Configures the widget.
     *
     * @DI\Observe("widget_claro_instrument_preview_configuration")
     *
     * @param ConfigureWidgetEvent $event
     */
    public function onConfigure(ConfigureWidgetEvent $event)
    {
        $subRequest = $this->container->get('request_stack')->getCurrentRequest()->duplicate([], null, [
            '_controller' => 'ClarolineMusicInstrumentBundle:Widget\InstrumentPreview:configure',
        ]);

        $response = $this->container->get('http_kernel')->handle($subRequest, HttpKernelInterface::SUB_REQUEST);

        $event->setContent($response);
        $event->stopPropagation();
    }
}
