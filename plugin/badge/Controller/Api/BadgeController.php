<?php

namespace Icap\BadgeBundle\Controller\Api;

use Claroline\CoreBundle\Security\PermissionCheckerTrait;
use FOS\RestBundle\View\View;
use Icap\BadgeBundle\Entity\Badge;
use Icap\BadgeBundle\Repository\BadgeManager;
use JMS\DiExtraBundle\Annotation\Inject;
use JMS\DiExtraBundle\Annotation\InjectParams;
use Sensio\Bundle\FrameworkExtraBundle\Configuration as EXT;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class BadgeController
{
    use PermissionCheckerTrait;

    /**
     * @var BadgeManager
     */
    private $badgeManager;

    /**
     * @InjectParams({
     *     "badgeManager" = @Inject("icap_badge.manager.badge")
     * })
     *
     * @param BadgeManager $badgeManager
     */
    public function __construct(BadgeManager $badgeManager)
    {
        $this->badgeManager = $badgeManager;
    }

    /**
     * Get badge by its uuid.
     *
     * @EXT\Route("/badges/{uuid}", name="apiv2_badge_get")
     * @EXT\Method("GET")
     *
     * @param Badge | null $badge
     *
     * @return JsonResponse
     */
    public function getAction(Badge $badge = null)
    {
        return $badge;
    }

    /**
     * Get all platform badges.
     *
     * @EXT\Route("/badges", name="apiv2_platform_badge_list")
     * @EXT\Method("GET")
     *
     * @param Request $request
     *
     * @return JsonResponse
     */
    public function listPlatformAction(Request $request)
    {
        $params = $request->query->all();

        $badges = $this->badgeManager->getPlatformBadges($params);

        return new JsonResponse($badges);
    }

    /**
     * Get all workspace badges.
     *
     * @EXT\Route("/workspace/{workspace}/badges", name="apiv2_workspace_badge_list")
     * @EXT\Method("GET")
     *
     * @param Request   $request
     * @param Workspace $workspace
     *
     * @return JsonResponse
     */
    public function listWorkspaceAction(Request $request, Workspace $workspace)
    {
        //TODO: test workspace access right

        $params = $request->query->all();

        $badges = $this->badgeManager->getWorkspaceBadges($workspace, $params);

        return new JsonResponse($badges);
    }

    /**
     * @Route("/", name="icap_badge_api_badge_all", defaults={"_format" = "json"})
     */
    public function allAction()
    {
        $badges = $this->badgeRepository->findAll();

        $view = View::create()
            ->setStatusCode(200)
            ->setData($badges);

        return $this->viewHandler->handle($view);
    }
}
