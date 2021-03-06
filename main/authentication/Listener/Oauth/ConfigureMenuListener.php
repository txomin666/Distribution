<?php

namespace Claroline\AuthenticationBundle\Listener\Oauth;

use Claroline\CoreBundle\Menu\ConfigureMenuEvent;
use Claroline\AuthenticationBundle\Model\Oauth\OauthConfiguration;
use JMS\DiExtraBundle\Annotation as DI;

/**
 * @DI\Service()
 */
class ConfigureMenuListener
{
    /**
     * @DI\Observe("claroline_external_authentication_menu_configure", priority=1)
     *
     * @param \Claroline\CoreBundle\Menu\ConfigureMenuEvent $event
     *
     * @return \Knp\Menu\ItemInterface $menu
     */
    public function onExternalAuthenticationMenuConfigure(ConfigureMenuEvent $event)
    {
        $menu = $event->getMenu();
        foreach (OauthConfiguration::resourceOwners() as $resourceOwner) {
            $menu->addChild(
                $resourceOwner,
                [
                    'route' => 'claro_admin_oauth_form',
                    'routeParameters' => ['service' => str_replace(' ', '_', strtolower($resourceOwner))],
                ]
            )->setExtra('name', $resourceOwner);
        }

        return $menu;
    }
}
