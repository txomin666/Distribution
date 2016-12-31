<?php

namespace Claroline\MusicBookBundle;

use Claroline\CoreBundle\Library\PluginBundle;
use Claroline\KernelBundle\Bundle\ConfigurationBuilder;

class ClarolineMusicBookBundle extends PluginBundle
{
    public function getRequiredPlugins()
    {
        return [
            'Claroline\\MusicInstrumentBundle\\ClarolineMusicInstrumentBundle',
        ];
    }

    public function getConfiguration($environment)
    {
        $config = new ConfigurationBuilder();

        return $config->addRoutingResource(__DIR__.'/Resources/config/routing.yml', null, 'music/songs');
    }
}
