<?php

namespace Claroline\MusicInstrumentBundle\EventListener\Widget;

use Claroline\CoreBundle\Event\ConfigureWidgetEvent;
use Claroline\CoreBundle\Event\DisplayWidgetEvent;
use JMS\DiExtraBundle\Annotation as DI;
use Symfony\Component\DependencyInjection\ContainerInterface;

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
        $event->stopPropagation();
    }
}
