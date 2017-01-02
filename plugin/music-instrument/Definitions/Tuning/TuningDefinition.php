<?php

namespace Claroline\MusicInstrumentBundle\Definitions;

use Claroline\MusicInstrumentBundle\Entity\Tuning\TuningCategory;
use Claroline\MusicInstrumentBundle\Library\DefinitionMap;
use Claroline\MusicInstrumentBundle\Validator\Constraints\JsonSchemaConstraint;
use Claroline\MusicTheoryBundle\Entity\Note\Note;

class TuningDefinition implements DefinitionInterface
{
    public function getMap()
    {
        $definition = new DefinitionMap();

        $definition
            ->define('tuning')
                ->addConstraint([JsonSchemaConstraint::class, ['schemas/tuning/schema.json']])
                ->children()
                    ->property('id')->end()
                    ->property('name')->end()
                    ->property('default')->end()
                    ->entity('category', TuningCategory::class)->end()
                    ->collection('notes', Note::class)->end()
                ->end()
            ->end()
        ;

        return $definition;
    }
}
