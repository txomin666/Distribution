<?php

namespace Claroline\MusicTheoryBundle\Controller\Resource;

use Claroline\CoreBundle\Library\Security\Collection\ResourceCollection;
use Claroline\MusicTheoryBundle\Entity\ChordGrid;
use Sensio\Bundle\FrameworkExtraBundle\Configuration as EXT;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;

/**
 * ChordGrid Controller renders the resource views.
 *
 * @EXT\Route("/chord_grids", options={"expose"=true})
 */
class ChordGridController extends Controller
{
    /**
     * Opens a chord grid resource.
     *
     * @param ChordGrid $chordGrid
     *
     * @EXT\Route("/{id}", name="claro_chord_grid_open", requirements={"id"="\d+"})
     * @EXT\Method("GET")
     * @EXT\Template("ClarolineMusicTheoryBundle:ChordGrid:open.html.twig")
     *
     * @return array
     */
    public function openAction(ChordGrid $chordGrid)
    {
        $this->assertHasPermission('OPEN', $chordGrid);

        return [
            // Used to build the Claroline Breadcrumbs
            '_resource' => $chordGrid,
            'workspace' => $chordGrid->getResourceNode()->getWorkspace(),
        ];
    }

    private function assertHasPermission($permission, ChordGrid $chordGrid)
    {
        $collection = new ResourceCollection([$chordGrid->getResourceNode()]);

        if (!$this->get('security.authorization_checker')->isGranted($permission, $collection)) {
            throw new AccessDeniedException($collection->getErrorsForDisplay());
        }
    }
}
