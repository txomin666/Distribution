<?php

namespace Claroline\MusicInstrumentBundle\Entity\InstrumentType;

use Doctrine\ORM\Mapping as ORM;

/**
 * Drums.
 * Used to store the configuration of Drums.
 *
 * @ORM\Entity()
 * @ORM\Table(name="claro_music_instrument_drums")
 */
class Drums extends AbstractType
{
    /**
     * Serialize the Entity.
     *
     * @return array
     */
    public function jsonSerialize()
    {
        return [
            'id' => $this->id,
        ];
    }
}
