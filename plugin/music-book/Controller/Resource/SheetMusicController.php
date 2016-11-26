<?php

namespace Claroline\MusicBookBundle\Controller\Resource;

use Claroline\CoreBundle\Library\Security\Collection\ResourceCollection;
use Claroline\MusicBookBundle\Entity\SheetMusic;
use Sensio\Bundle\FrameworkExtraBundle\Configuration as EXT;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;

/**
 * SheetMusic Controller renders the resource views.
 *
 * @EXT\Route("/sheet_music", options={"expose"=true})
 */
class SheetMusicController extends Controller
{
    /**
     * Opens a sheet music resource.
     *
     * @EXT\Route("/{id}", name="claro_sheet_music_open", requirements={"id"="\d+"})
     * @EXT\Method("GET")
     * @EXT\Template("ClarolineMusicBookBundle:SheetMusic:open.html.twig")
     *
     * @param SheetMusic $sheetMusic
     *
     * @return array
     */
    public function openAction(SheetMusic $sheetMusic)
    {
        $this->assertHasPermission('OPEN', $sheetMusic);

        return [
            // Used to build the Claroline Breadcrumbs
            '_resource' => $sheetMusic,
            'workspace' => $sheetMusic->getResourceNode()->getWorkspace(),
        ];
    }

    private function assertHasPermission($permission, SheetMusic $sheetMusic)
    {
        $collection = new ResourceCollection([$sheetMusic->getResourceNode()]);

        if (!$this->get('security.authorization_checker')->isGranted($permission, $collection)) {
            throw new AccessDeniedException($collection->getErrorsForDisplay());
        }
    }
}
