<?php

namespace Claroline\MusicBookBundle\Controller\Tool;

use Sensio\Bundle\FrameworkExtraBundle\Configuration as EXT;

/**
 * SongBook tool controller.
 *
 * @EXT\Route("/song_book", options={"expose"=true})
 */
class SongBookController
{
    /**
     * Opens the song book tool.
     *
     * @EXT\Route("", name="claro_song_book_open")
     * @EXT\Method("GET")
     * @EXT\Template("ClarolineMusicBookBundle:Tool:song-book.html.twig")
     *
     * @return array
     */
    public function openAction()
    {
        return [];
    }
}
