<?php

namespace Claroline\MusicInstrumentBundle\Definitions;

use Claroline\MusicInstrumentBundle\Entity\InstrumentType;
use Claroline\MusicInstrumentBundle\Library\DefinitionMap;
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
        $definition = new DefinitionMap();

        $definition
            ->define('instrument')
                ->addConstraint([JsonSchemaConstraint::class, ['schemas/tuning/schema.json']])
                ->children()
                    ->property('id')
                    // Needs to be remapped
                    ->end()
                    ->property('manufacturer')->end()
                    ->entity('type', InstrumentType::class)->end()
                    ->collection('tags', 'ClarolineCoreBundle::Tag')->end()

                    ->property('config')
                        ->addConstraint(['MyConstraint', []])
                        ->children()
                            ->property('keys')->end()
                        ->end()
                    ->end()
                ->end()
                ->append('')
            ->end()
        ;

        return $definition;
    }
}
