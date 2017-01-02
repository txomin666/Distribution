<?php

namespace Claroline\MusicInstrumentBundle\Definitions;

use Claroline\MusicInstrumentBundle\Library\DefinitionMap;
use Claroline\MusicInstrumentBundle\Validator\Constraints\JsonSchemaConstraint;

class InstrumentTypeDefinition implements DefinitionInterface
{
    public function getMap()
    {
        $definition = new DefinitionMap();

        $definition
            ->addConstraint([JsonSchemaConstraint::class, ['schemas/instrument-type/schema.json']])
            ->children()
                ->property('id')->end()
                ->property('name')->end()
                ->property('polyphonic')->end()
            ->end()
        ;

        return $definition;
    }
}
