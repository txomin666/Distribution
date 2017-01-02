<?php

namespace Claroline\MusicInstrumentBundle\Library;

use Claroline\MusicInstrumentBundle\Definitions\DefinitionInterface;

class DefinitionBuilder
{
    public function createNode($name, $parent = null)
    {
        $node = new DefinitionNode($name, $parent);

        return $node;
    }

    public function property($name)
    {
        return $this->createNode($name);
    }

    public function entity($name)
    {
        return $this->createNode($name);
    }

    public function collection($name)
    {
        return $this->createNode($name);
    }

    public function append($definitionClass)
    {
        /** @var DefinitionInterface $definition */
        $definition = new $definitionClass;
        if (!($definition instanceof DefinitionInterface)) {
            throw new \RuntimeException(
                'Method `append` only accepts classes that implement `Claroline\MusicInstrumentBundle\Definitions\DefinitionInterface`.'
            );
        }

        // merge the map of the definition
        $definitionMap = $definition->getMap();

        array_map(function (array $constraint) {
            $this->addConstraint($constraint);
        }, $definitionMap->getConstraints());

        array_map(function (array $normalizer) {
            $this->addNormalizer($normalizer);
        }, $definitionMap->getNormalizers());

        array_map(function (array $child) {
            /*$this->addNormalizer($normalizer);*/
        }, $definitionMap->getChildren());

        return $this;
    }
}
