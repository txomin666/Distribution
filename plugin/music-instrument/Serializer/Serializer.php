<?php

namespace Claroline\MusicInstrumentBundle\Serializer;

use Claroline\MusicInstrumentBundle\Annotation\ApiDefinition;
use Claroline\MusicInstrumentBundle\Library\DefinitionReader;
use Claroline\MusicInstrumentBundle\Serializer\Encoder\EncoderInterface;
use Doctrine\Common\Annotations\Reader;

class Serializer
{
    /**
     * @var Reader
     */
    private $reader;

    /**
     * @var EncoderInterface[]
     */
    private $encoders;

    public function __construct(Reader $reader)
    {
        $this->reader = $reader;
    }

    public function serialize($entity, $format)
    {
        $definition = $this->getDefinition($entity);

        $reader = new DefinitionReader($definition);

        while ($def = $reader->next()) {

        }

        // Normalize data
        $normalizer = $this->getNormalizer();

        $data = $normalizer->normalize($entity);

        // Encode data in final format
        $encoder = $this->getEncoder($format);

        return $encoder->encode($data);
    }

    public function deserialize($entity, $format)
    {

    }

    private function getDefinition($entity)
    {
        $reflect = new \ReflectionObject($entity);

        $annotation = $this->reader->getClassAnnotation($reflect, ApiDefinition::class);
        if (empty($annotation)) {
            throw new \RuntimeException('The entity has no definition class.');
        }

        $definitionClass = $annotation->getClass();

        return new $definitionClass;
    }

    private function getEncoder($format)
    {
        $encoder = null;

        foreach ($this->encoders as $registered) {
            if ($registered->support($format)) {
                $encoder = $registered;
                break;
            }
        }

        if (empty($encoder)) {
            throw new \RuntimeException(sprintf('No encoder found for format "%s".', $format));
        }

        return $encoder;
    }
}
