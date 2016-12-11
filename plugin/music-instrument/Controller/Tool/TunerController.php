<?php

namespace Claroline\MusicInstrumentBundle\Controller\Tool;

use Sensio\Bundle\FrameworkExtraBundle\Configuration as EXT;

/**
 * Tuner tool controller.
 *
 * @EXT\Route("/tuner", options={"expose"=true})
 */
class TunerController
{
    /**
     * Opens the tuner tool on desktop.
     *
     * @EXT\Route("", name="claro_tuner_open_desktop")
     * @EXT\Method("GET")
     * @EXT\Template("ClarolineMusicInstrumentBundle:Tool:tuner.html.twig")
     *
     * @return array
     */
    public function openAction()
    {
        return [];
    }
}
