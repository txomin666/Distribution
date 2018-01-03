<?php

namespace Claroline\MusicInstrumentBundle\Serializer;

use Claroline\CoreBundle\API\SerializerProvider;
use Claroline\MusicInstrumentBundle\Entity\Tuning\Tuning;
use Claroline\MusicInstrumentBundle\Entity\Tuning\TuningNote;
use JMS\DiExtraBundle\Annotation as DI;

/**
 * @DI\Service("claroline.serializer.tuning")
 * @DI\Tag("claroline.serializer")
 */
class TuningSerializer
{
    /** @var SerializerProvider */
    private $serializer;

    /**
     * InstrumentSerializer constructor.
     *
     * @DI\InjectParams({
     *     "serializer" = @DI\Inject("claroline.api.serializer")
     * })
     *
     * @param SerializerProvider $serializer
     */
    public function __construct(SerializerProvider $serializer)
    {
        $this->serializer = $serializer;
    }

    /**
     * @return string
     */
    public function getClass()
    {
        return 'Claroline\MusicInstrumentBundle\Entity\Tuning\Tuning';
    }

    /**
     * @return string
     */
    public function getSchema()
    {
        return '#/plugin/music-instrument/tuning.json';
    }

    /**
     * @return string
     */
    public function getSamples()
    {
        return '#/plugin/music-instrument/tuning';
    }

    public function serialize(Tuning $tuning, array $options = [])
    {
        return [
            'id' => $tuning->getUuid(),
            'name' => $tuning->getName(),
            'default' => $tuning->isDefault(),
            'category' => $tuning->getCategory(),
            'notes' => array_map(function (TuningNote $note) use ($options) {
                return $this->serializer->serialize($note->getNote(), $options);
            }, $tuning->getNotes()->toArray()),
        ];
    }
}
