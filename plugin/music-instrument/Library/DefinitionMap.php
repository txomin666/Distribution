<?php

namespace Claroline\MusicInstrumentBundle\Library;

class DefinitionMap
{
    private $builder;

    public function __construct()
    {
        $this->builder = new DefinitionBuilder();
    }

    public function define($name)
    {
        $node = $this->builder->createNode($name);

        return $node;
    }
}
