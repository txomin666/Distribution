<?php

namespace Claroline\MusicInstrumentBundle\Listener\Widget;

use Claroline\CoreBundle\Event\ConfigureWidgetEvent;
use Claroline\CoreBundle\Event\DisplayWidgetEvent;
use JMS\DiExtraBundle\Annotation as DI;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpKernel\HttpKernelInterface;

/**
 * Tuner widget.
 *
 * @DI\Service("claro_music_instrument.listener.tuner_widget")
 */
class TunerListener
{
    /**
     * @var ContainerInterface
     */
    private $container;

    /**
     * TunerListener constructor.
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
     * @DI\Observe("widget_claro_instrument_tuner")
     *
     * @param DisplayWidgetEvent $event
     */
    public function onDisplay(DisplayWidgetEvent $event)
    {
        $subRequest = $this->container->get('request_stack')->getCurrentRequest()->duplicate([], null, [
            '_controller' => 'ClarolineMusicInstrumentBundle:Widget\Tuner:display',
        ]);

        $response = $this->container->get('http_kernel')->handle($subRequest, HttpKernelInterface::SUB_REQUEST);

        $event->setContent($response);
        $event->stopPropagation();
    }

    /**
     * Configures the widget.
     *
     * @DI\Observe("widget_claro_instrument_tuner_configuration")
     *
     * @param ConfigureWidgetEvent $event
     */
    public function onConfigure(ConfigureWidgetEvent $event)
    {
        $subRequest = $this->container->get('request_stack')->getCurrentRequest()->duplicate([], null, [
            '_controller' => 'ClarolineMusicInstrumentBundle:Widget\Tuner:configure',
        ]);

        $response = $this->container->get('http_kernel')->handle($subRequest, HttpKernelInterface::SUB_REQUEST);

        $event->setContent($response);
        $event->stopPropagation();
    }
}
