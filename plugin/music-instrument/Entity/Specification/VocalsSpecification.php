<?php

namespace Claroline\MusicInstrumentBundle\Entity\Specification;

use Doctrine\ORM\Mapping as ORM;

/**
 * Vocals.
 * Used to store the configuration of Drums.
 *
 * @ORM\Entity()
 * @ORM\Table(name="claro_music_instrument_vocals")
 */
class VocalsSpecification extends AbstractSpecification
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
