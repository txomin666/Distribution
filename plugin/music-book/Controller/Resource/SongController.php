<?php

namespace Claroline\MusicBookBundle\Controller\Resource;

use Claroline\CoreBundle\Library\Security\Collection\ResourceCollection;
use Claroline\MusicBookBundle\Entity\Song;
use Sensio\Bundle\FrameworkExtraBundle\Configuration as EXT;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;

/**
 * Song Controller renders the resource views.
 *
 * @EXT\Route("/songs", options={"expose"=true})
 */
class SongController extends Controller
{
    /**
     * Opens a song resource.
     *
     * @EXT\Route("/{id}", name="claro_song_open", requirements={"id"="\d+"})
     * @EXT\Method("GET")
     * @EXT\Template("ClarolineMusicBookBundle:Song:open.html.twig")
     *
     * @param Song $song
     *
     * @return array
     */
    public function openAction(Song $song)
    {
        $this->assertHasPermission('OPEN', $song);

        return [
            // Used to build the Claroline Breadcrumbs
            '_resource' => $song,
            'workspace' => $song->getResourceNode()->getWorkspace(),
        ];
    }

    private function assertHasPermission($permission, Song $song)
    {
        $collection = new ResourceCollection([$song->getResourceNode()]);

        if (!$this->get('security.authorization_checker')->isGranted($permission, $collection)) {
            throw new AccessDeniedException($collection->getErrorsForDisplay());
        }
    }
}
