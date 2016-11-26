<?php

namespace Claroline\MusicInstrumentBundle\Controller\Tool;

use Claroline\CoreBundle\Entity\Workspace\Workspace;
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
     * @EXT\Template("ClarolineMusicTheoryBundle:Tool:tuner.html.twig")
     *
     * @return array
     */
    public function openDesktopAction()
    {
        return [];
    }

    /**
     * Opens the tuner tool on workspace.
     *
     * @EXT\Route("", name="claro_tuner_open_workspace")
     * @EXT\Method("GET")
     * @EXT\Template("ClarolineMusicTheoryBundle:Tool:tuner.html.twig")
     *
     * @param Workspace $workspace
     *
     * @return array
     */
    public function openWorkspaceAction(Workspace $workspace)
    {
        return [];
    }
}
