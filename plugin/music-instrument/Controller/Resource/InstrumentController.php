<?php

namespace Claroline\MusicInstrumentBundle\Controller\Resource;

use Claroline\CoreBundle\Library\Security\Collection\ResourceCollection;
use Claroline\MusicInstrumentBundle\Entity\Instrument;
use Sensio\Bundle\FrameworkExtraBundle\Configuration as EXT;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;

/**
 * Instrument Controller renders the resource views.
 *
 * @EXT\Route("/instruments", options={"expose"=true})
 */
class InstrumentController extends Controller
{
    /**
     * Opens an instrument.
     *
     * @param Instrument $instrument
     *
     * @EXT\Route("/{id}", name="claro_music_instrument_open", requirements={"id"="\d+"})
     * @EXT\Method("GET")
     * @EXT\Template("ClarolineMusicInstrumentBundle:Instrument:open.html.twig")
     *
     * @return array
     */
    public function openAction(Instrument $instrument)
    {
        $this->assertHasPermission('OPEN', $instrument);

        return [
            // Used to build the Claroline Breadcrumbs
            '_resource' => $instrument,
            'workspace' => $instrument->getResourceNode()->getWorkspace(),
        ];
    }

    private function assertHasPermission($permission, Instrument $instrument)
    {
        $collection = new ResourceCollection([$instrument->getResourceNode()]);

        if (!$this->get('security.authorization_checker')->isGranted($permission, $collection)) {
            throw new AccessDeniedException($collection->getErrorsForDisplay());
        }
    }
}
