<?php

namespace Claroline\MusicBookBundle\Controller\Resource;

use Claroline\CoreBundle\Library\Security\Collection\ResourceCollection;
use Claroline\MusicBookBundle\Entity\Artist;
use Sensio\Bundle\FrameworkExtraBundle\Configuration as EXT;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;

/**
 * Artist Controller renders the resource views.
 *
 * @EXT\Route("/artists", options={"expose"=true})
 */
class ArtistController extends Controller
{
    /**
     * Opens a song resource.
     *
     * @EXT\Route("/{id}", name="claro_artist_open", requirements={"id"="\d+"})
     * @EXT\Method("GET")
     * @EXT\Template("ClarolineMusicBookBundle:Artist:open.html.twig")
     *
     * @param Artist $artist
     *
     * @return array
     */
    public function openAction(Artist $artist)
    {
        $this->assertHasPermission('OPEN', $artist);

        return [
            // Used to build the Claroline Breadcrumbs
            '_resource' => $artist,
            'workspace' => $artist->getResourceNode()->getWorkspace(),
        ];
    }

    private function assertHasPermission($permission, Artist $artist)
    {
        $collection = new ResourceCollection([$artist->getResourceNode()]);

        if (!$this->get('security.authorization_checker')->isGranted($permission, $collection)) {
            throw new AccessDeniedException($collection->getErrorsForDisplay());
        }
    }
}
