<?php

namespace Claroline\MusicTheoryBundle\Serializer;

use Claroline\MusicTheoryBundle\Entity\Interval;
use JMS\DiExtraBundle\Annotation as DI;

/**
 * @DI\Service("claroline.serializer.music_interval")
 * @DI\Tag("claroline.serializer")
 */
class IntervalSerializer
{
    /**
     * @return string
     */
    public function getClass()
    {
        return 'Claroline\MusicTheoryBundle\Entity\Interval';
    }

    /**
     * @return string
     */
    public function getSchema()
    {
        return '#/plugin/music-theory/interval.json';
    }

    /**
     * @return string
     */
    public function getSamples()
    {
        return '#/plugin/music-theory/interval';
    }

    public function serialize(Interval $interval, array $options = [])
    {
        return [
            'id' => $interval->getId(),
            'name' => $interval->getName(),
            'symbol' => $interval->getSymbol(),
            'number' => $interval->getNumber(),
            'quality' => $interval->getQuality(),
            'value' => $interval->getValue(),
        ];
    }
}
