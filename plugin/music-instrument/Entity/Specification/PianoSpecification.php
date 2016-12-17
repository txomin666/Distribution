<?php

namespace Claroline\MusicInstrumentBundle\Entity\Specification;

use Doctrine\ORM\Mapping as ORM;

/**
 * Piano.
 * Used to store the configuration of a Piano.
 *
 * @ORM\Entity()
 * @ORM\Table(name="claro_music_instrument_piano")
 */
class PianoSpecification extends AbstractSpecification
{
    /**
     * Number of keys of the piano.
     *
     * @ORM\Column(type="integer")
     *
     * @var int
     */
    private $keys = 88;

    /**
     * Get number of keys.
     *
     * @return int
     */
    public function getKeys()
    {
        return $this->keys;
    }

    /**
     * Set number of keys.
     *
     * @param int $keys
     *
     * @return $this
     */
    public function setKeys($keys)
    {
        $this->keys = $keys;

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
            'keys' => $this->keys,
        ];
    }
}
