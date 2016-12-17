<?php

namespace Claroline\MusicTheoryBundle;

use Claroline\CoreBundle\Library\PluginBundle;
use Claroline\KernelBundle\Bundle\ConfigurationBuilder;

class ClarolineMusicTheoryBundle extends PluginBundle
{
    public function getConfiguration($environment)
    {
        $config = new ConfigurationBuilder();

        return $config->addRoutingResource(__DIR__.'/Resources/config/routing.yml', null, 'music/theory');
    }

    public function getRequiredFixturesDirectory($environment)
    {
        return 'DataFixtures/ORM';
    }
}
