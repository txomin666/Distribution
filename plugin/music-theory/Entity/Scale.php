<?php

namespace Claroline\MusicTheoryBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Scale.
 *
 * @ORM\Entity()
 * @ORM\Table(name="claro_music_scale")
 */
class Scale implements \JsonSerializable
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

    /**
     * Serialize the Entity.
     *
     * @return array
     */
    public function jsonSerialize()
    {
        return array(
            'type' => 'scales',
            'id' => $this->id,
            'attributes' => array(
                'name' => $this->name,
            ),
        );
    }
}
