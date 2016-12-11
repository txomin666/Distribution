<?php

namespace Claroline\MusicInstrumentBundle\Listener\Tool;

use Claroline\CoreBundle\Event\DisplayToolEvent;
use JMS\DiExtraBundle\Annotation as DI;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpKernel\HttpKernelInterface;

/**
 * Listens to the core tool events.
 *
 * @DI\Service("claro_music_instrument.listener.tuner_tool")
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
     * Displays the tuner tool on desktop.
     *
     * @DI\Observe("open_tool_desktop_claro_instrument_tuner")
     *
     * @param DisplayToolEvent $event
     */
    public function onDisplay(DisplayToolEvent $event)
    {
        $subRequest = $this->container->get('request')->duplicate([], null, [
            '_controller' => 'ClarolineMusicInstrumentBundle:Tool\Tuner:open',
        ]);

        $response = $this->container->get('http_kernel')->handle($subRequest, HttpKernelInterface::SUB_REQUEST);

        $event->setContent($response->getContent());
    }
}
