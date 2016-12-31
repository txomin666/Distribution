<?php

namespace Claroline\MusicInstrumentBundle\Definitions\InstrumentType;

class GuitarDefinition
{
    const FULL    = 'full';
    const MINIMAL = 'minimal';

    public function defineGroups()
    {
        return [
            static::FULL    => ['id', 'name'],
            static::MINIMAL => ['id', 'name'],
        ];
    }

    public function getMap()
    {
        return [
            'headstock' => [
                'UuidConstraint',
                'Normalize',
                'Denormalize'
            ]
        ];
    }
}
