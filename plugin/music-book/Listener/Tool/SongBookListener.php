<?php

namespace Claroline\MusicBookBundle\Listener\Tool;

use Claroline\CoreBundle\Event\DisplayToolEvent;
use JMS\DiExtraBundle\Annotation as DI;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpKernel\HttpKernelInterface;

/**
 * @DI\Service("claro_music_book.listener.song_book_tool")
 */
class SongBookListener
{
    /**
     * @var ContainerInterface
     */
    private $container;

    /**
     * SongBookListener constructor.
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
     * Displays the song book tool.
     * 
     * @DI\Observe("open_tool_desktop_claro_song_book")
     *
     * @param DisplayToolEvent $event
     */
    public function onDisplayDesktop(DisplayToolEvent $event)
    {
        $subRequest = $this->container->get('request')->duplicate([], null, [
            '_controller' => 'ClarolineMusicBookBundle:Tool\SongBook:open',
        ]);

        $response = $this->container->get('http_kernel')->handle($subRequest, HttpKernelInterface::SUB_REQUEST);

        $event->setContent($response->getContent());
    }
}
