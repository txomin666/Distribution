<?php

namespace Claroline\MusicInstrumentBundle\Serializer;

use Claroline\MusicInstrumentBundle\Annotation\ApiDefinition;
use Doctrine\Common\Annotations\Reader;

class Serializer
{
    /**
     * @var Reader
     */
    private $reader;

    private $encoders;

    public function __construct(
        Reader $reader
    )
    {
        $this->reader = $reader;
    }

    private function getDefinition($entity)
    {
        $reflect = new \ReflectionObject($entity);

        $annotation = $this->reader->getClassAnnotation($reflect, ApiDefinition::class);
        if (empty($annotation)) {
            throw new \Exception('The entity has no definition class.');
        }

        $definitionClass = $annotation->getClass();

        return new $definitionClass;
    }

    public function serialize($entity, $format)
    {
        $definition = $this->getDefinition($entity);
    }

    public function deserialize($entity, $format)
    {

    }
}
