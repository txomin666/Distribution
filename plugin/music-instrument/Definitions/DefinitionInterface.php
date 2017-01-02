<?php

namespace Claroline\MusicInstrumentBundle\Definitions;

use Claroline\MusicInstrumentBundle\Library\DefinitionMap;

interface DefinitionInterface
{
    /**
     * @return DefinitionMap
     */
    public function getMap();
}
