<?php

namespace Claroline\MusicInstrumentBundle\Entity\Specification;

use Doctrine\ORM\Mapping as ORM;

/**
 * Flute.
 * Used to store the configuration of a Flute.
 *
 * @ORM\Entity()
 * @ORM\Table(name="claro_music_instrument_flute")
 */
class FluteSpecification extends AbstractSpecification
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
            'type' => 'instrument_specifications',
            'id' => $this->id,
            'attributes' => [
                'range' => $this->range,
                'fingering' => $this->fingering,
            ],
        ];
    }
}
