<?php

/*
 * This file is part of the Claroline Connect package.
 *
 * (c) Claroline Consortium <consortium@claroline.net>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Claroline\CoreBundle\Controller\Administration;

use Claroline\CoreBundle\API\FinderProvider;
use JMS\DiExtraBundle\Annotation as DI;
use JMS\SecurityExtraBundle\Annotation as SEC;
use Sensio\Bundle\FrameworkExtraBundle\Configuration as EXT;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

/**
 * @DI\Tag("security.secure_service")
 * @SEC\PreAuthorize("canOpenAdminTool('platform_logs')")
 */
class LogsController extends Controller
{
    /**
     * @DI\InjectParams({
     *     "finder" = @DI\Inject("claroline.api.finder")
     * })
     */
    public function __construct(FinderProvider $finder)
    {
        $this->finder = $finder;
    }

    /**
     * @EXT\Route("/", name="claro_admin_logs_show")
     * @EXT\Template()
     *
     * Displays logs list using filter parameters and page number
     */
    public function logListAction()
    {
        return ['logs' => $this->container->get('claroline.api.finder')
          ->search('Claroline\CoreBundle\Model\LogInterface', ['page' => 0, 'limit' => 20]),
        ];
    }
}
