<?php

namespace Claroline\MusicInstrumentBundle\Entity\Tuning;

use Doctrine\ORM\Mapping as ORM;

/**
 * Tuning Category.
 *
 * @ORM\Entity()
 * @ORM\Table(name="claro_music_tuning_category")
 */
class TuningCategory implements \JsonSerializable
{
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     *
     * @var int
     */
    private $id;

    /**
     * @ORM\Column(type="string")
     *
     * @var string
     */
    private $name;

    /**
     * Get id.
     *
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Get name.
     *
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set name.
     *
     * @param string $name
     */
    public function setName($name)
    {
        $this->name = $name;
    }

    public function jsonSerialize()
    {
        return [
            // Identifier of the Resource
            'type' => 'tuning_categories',
            'id' => $this->id,

            // Attributes of the Resource
            'attributes' => [
                'name' => $this->name,
            ],
        ];
    }
}
