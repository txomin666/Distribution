<?php

/*
 * This file is part of the Claroline Connect package.
 *
 * (c) Claroline Consortium <consortium@claroline.net>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Claroline\CoreBundle\Controller\Log;

use Claroline\CoreBundle\API\FinderProvider;
use JMS\DiExtraBundle\Annotation as DI;
use Sensio\Bundle\FrameworkExtraBundle\Configuration as EXT;

class AdministrationController
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

    /*
     * @EXT\Route("/logs/", name="claro_admin_logs_show")
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
