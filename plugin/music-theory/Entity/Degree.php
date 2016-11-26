<?php

namespace Claroline\MusicTheoryBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Degree.
 *
 * @ORM\Entity()
 * @ORM\Table(name="claro_music_degree")
 */
class Degree implements \JsonSerializable
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
     * Symbol of the Interval.
     *
     * @var string
     *
     * @ORM\Column(type="string")
     */
    private $symbol;

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
     * Get symbol.
     *
     * @return string
     */
    public function getSymbol()
    {
        return $this->symbol;
    }

    /**
     * Set symbol.
     *
     * @param string $symbol
     *
     * @return Degree
     */
    public function setSymbol($symbol)
    {
        $this->symbol = $symbol;

        return $this;
    }

    /**
     * Serialize the Entity.
     *
     * @return array
     */
    public function jsonSerialize()
    {
        return array(
            'type' => 'degrees',
            'id' => $this->id,
            'attributes' => array(
                'name' => $this->name,
                'symbol' => $this->symbol,
            ),
        );
    }
}
