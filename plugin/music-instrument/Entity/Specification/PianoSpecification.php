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

            ],
        ];
    }
}
