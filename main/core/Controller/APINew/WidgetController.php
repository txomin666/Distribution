<?php

/*
 * This file is part of the Claroline Connect package.
 *
 * (c) Claroline Consortium <consortium@claroline.net>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Claroline\CoreBundle\Controller\APINew;

use Claroline\AppBundle\API\SerializerProvider;
use Claroline\CoreBundle\Entity\DataSource;
use Claroline\CoreBundle\Entity\Widget\Widget;
use Claroline\CoreBundle\Manager\DataSourceManager;
use Claroline\CoreBundle\Manager\WidgetManager;
use JMS\DiExtraBundle\Annotation as DI;
use Sensio\Bundle\FrameworkExtraBundle\Configuration as EXT;
use Symfony\Component\HttpFoundation\JsonResponse;

/**
 * Exposes platform widgets.
 *
 * @EXT\Route("/widget", options={"expose": true})
 */
class WidgetController
{
    /** @var SerializerProvider */
    private $serializer;

    /** @var WidgetManager */
    private $widgetManager;

    /** @var DataSourceManager */
    private $dataSourceManager;

    /**
     * WidgetController constructor.
     *
     * @DI\InjectParams({
     *     "serializer"        = @DI\Inject("claroline.api.serializer"),
     *     "widgetManager"     = @DI\Inject("claroline.manager.widget_manager"),
     *     "dataSourceManager" = @DI\Inject("claroline.manager.data_source")
     * })
     *
     * @param SerializerProvider $serializer
     * @param WidgetManager      $widgetManager
     * @param DataSourceManager  $dataSourceManager
     */
    public function __construct(
        SerializerProvider $serializer,
        WidgetManager $widgetManager,
        DataSourceManager $dataSourceManager)
    {
        $this->serializer = $serializer;
        $this->widgetManager = $widgetManager;
        $this->dataSourceManager = $dataSourceManager;
    }

    /**
     * Lists available widgets for a given context.
     *
     * @EXT\Route("/{context}", name="apiv2_widget_available", defaults={"context"=null})
     * @EXT\Method("GET")
     *
     * @param string $context
     *
     * @return JsonResponse
     */
    public function listAction($context = null)
    {
        return new JsonResponse([
            'widgets' => array_map(function (Widget $widget) {
                return $this->serializer->serialize($widget);
            }, $this->widgetManager->getAvailable($context)),
            'dataSources' => array_map(function (DataSource $dataSource) {
                return $this->serializer->serialize($dataSource);
            }, $this->dataSourceManager->getAvailable($context)),
        ]);
    }
}
