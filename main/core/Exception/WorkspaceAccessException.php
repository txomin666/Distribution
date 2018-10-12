<?php

/*
 * This file is part of the Claroline Connect package.
 *
 * (c) Claroline Consortium <consortium@claroline.net>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Claroline\CoreBundle\Exception;

use Symfony\Component\Security\Core\Exception\AccessDeniedException;
use Claroline\CoreBundle\Entity\Workspace\Workspace;

class WorkspaceAccessException extends AccessDeniedException
{
    /** @var Workspace */
    private $workspace;

    /**
     * Set workspace.
     *
     * @param Workspace $workspace
     */
    public function setWorkspace(Workspace $workspace)
    {
        $this->workspace = $workspace;
    }

    /**
     * Get workspace.
     *
     * @return Workspace
     */
    public function getWorkspace()
    {
        return $this->workspace;
    }
}
