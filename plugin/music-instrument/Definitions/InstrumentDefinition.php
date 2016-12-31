<?php

namespace Claroline\MusicInstrumentBundle\Definitions;

use Claroline\MusicInstrumentBundle\Validator\Constraints\JsonSchemaConstraint;

class InstrumentDefinition implements DefinitionInterface
{
    const FULL    = 'full';
    const MINIMAL = 'minimal';

    public function defineGroups()
    {
        return [
            static::FULL => [
                'id',
                'name',
                'model',
                'manufacturer',
                'midi',
                'type',
            ],
            static::MINIMAL => [
                'id',
                'name',
            ],
        ];
    }

    public function getMap()
    {
        return [
            [null, JsonSchemaConstraint::class],
            ['id'],
            ['name'],
            ['model'],
            ['manufacturer'],
            ['midi'],
            ['type', InstrumentTypeDefinition::class],
        ];
    }
}
