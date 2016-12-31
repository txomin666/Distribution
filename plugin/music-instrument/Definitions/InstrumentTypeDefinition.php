<?php

namespace Claroline\MusicInstrumentBundle\Definitions;

class InstrumentTypeDefinition implements DefinitionInterface
{
    public function getMap()
    {
        return [
            'id',
            'name',
            'polyphonic'
        ];
    }
}
