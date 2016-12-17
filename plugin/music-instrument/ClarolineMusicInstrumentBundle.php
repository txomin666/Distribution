<?php

namespace Claroline\MusicInstrumentBundle;

use Claroline\CoreBundle\Library\PluginBundle;
use Claroline\KernelBundle\Bundle\ConfigurationBuilder;

class ClarolineMusicInstrumentBundle extends PluginBundle
{
    public function getRequiredPlugins()
    {
        return [
            'Claroline\\MusicTheoryBundle\\ClarolineMusicTheoryBundle',
        ];
    }

    public function getConfiguration($environment)
    {
        $config = new ConfigurationBuilder();

        return $config->addRoutingResource(__DIR__.'/Resources/config/routing.yml', null, 'music/instrument');
    }

    public function getRequiredFixturesDirectory($environment)
    {
        return 'DataFixtures/ORM';
    }
}
