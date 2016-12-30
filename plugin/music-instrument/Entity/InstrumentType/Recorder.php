<?php

namespace Claroline\MusicInstrumentBundle\Entity\InstrumentType;

use Doctrine\ORM\Mapping as ORM;

/**
 * Recorder.
 * Used to store the configuration of a Recorder.
 *
 * @ORM\Entity()
 * @ORM\Table(name="claro_music_instrument_recorder")
 */
class Recorder extends AbstractType
{
    /**
     * Type of the fingering.
     *
     * @var string
     *
     * @ORM\Column(type="string")
     */
    private $fingering;

    private $range;

    /**
     * Get range.
     *
     * @return string
     */
    public function getRange()
    {
        return $this->range;
    }

    /**
     * Set range.
     *
     * @param string $range
     *
     * @return $this
     */
    public function setRange($range)
    {
        $this->range = $range;

        return $this;
    }

    /**
     * Get fingering.
     *
     * @return string
     */
    public function getFingering()
    {
        return $this->fingering;
    }

    /**
     * Set fingering.
     *
     * @param string $fingering
     *
     * @return $this
     */
    public function setFingering($fingering)
    {
        $this->fingering = $fingering;

        return $this;
    }

    /**
     * Serialize the Entity.
     *
     * @return array
     */
    public function jsonSerialize()
    {
        return [
            'id' => $this->id,
            'range' => $this->range,
            'fingering' => $this->fingering,
        ];
    }
}
