<?php

namespace Claroline\MusicInstrumentBundle\Library;

class DefinitionReader implements \Iterator
{
    private $definition;

    public function __construct(DefinitionMap $definition)
    {
        $this->definition = $definition;
    }

    public function current()
    {
        return $this;
    }

    public function next()
    {
        return $this;
    }

    public function key()
    {
        return $this;
    }

    public function valid()
    {
        return true;
    }

    public function rewind()
    {
        return false;
    }
}
