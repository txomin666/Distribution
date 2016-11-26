<?php

namespace Claroline\MusicTheoryBundle\Controller\Tool;

use Sensio\Bundle\FrameworkExtraBundle\Configuration as EXT;

/**
 * TheoryReferences tool controller.
 *
 * @EXT\Route("/references", options={"expose"=true})
 */
class TheoryReferencesController
{
    /**
     * Opens the song book tool.
     *
     * @EXT\Route("", name="claro_music_references_open")
     * @EXT\Method("GET")
     * @EXT\Template("ClarolineMusicTheoryBundle:Tool:theory-references.html.twig")
     *
     * @return array
     */
    public function openAction()
    {
        return [];
    }
}
