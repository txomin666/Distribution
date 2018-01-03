<?php

namespace Claroline\MusicTheoryBundle\Controller\Tool;

use Sensio\Bundle\FrameworkExtraBundle\Configuration as EXT;

/**
 * TheoryReferences tool controller.
 *
 * @EXT\Route("/references", options={"expose"=true})
 */
class ReferencesController
{
    /**
     * Opens the theory references tool.
     *
     * @EXT\Route("", name="claro_music_references_open")
     * @EXT\Method("GET")
     * @EXT\Template("ClarolineMusicTheoryBundle:Tool:references.html.twig")
     *
     * @return array
     */
    public function openAction()
    {
        return [];
    }
}
