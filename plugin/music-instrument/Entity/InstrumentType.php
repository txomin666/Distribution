<?php

namespace Claroline\MusicInstrumentBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * InstrumentType Entity
 * Stores the default configuration for each instrument type (e.g. guitar, bass, recorder, piano).
 *
 * @ORM\Entity()
 * @ORM\Table(name="claro_music_instrument_type")
 */
class InstrumentType implements \JsonSerializable
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
     * Icon of the Instrument Type.
     *
     * @ORM\Column(type="string")
     *
     * @var string
     */
    private $icon;

    /**
     * Prefix used to retrieve corresponding Specification class.
     *
     * @ORM\Column(type="string")
     *
     * @var string
     */
    private $prefix;

    /**
     * Is the instrument can play several notes simultaneously ? (to play chords).
     *
     * @ORM\Column(type="boolean")
     *
     * @var bool
     */
    private $polyphonic = true;

    /**
     * Is the instrument type enabled in the platform ?
     *
     * @ORM\Column(type="boolean")
     *
     * @var bool
     */
    private $enabled = true;

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
     * Get icon.
     *
     * @return string
     */
    public function getIcon()
    {
        return $this->icon;
    }

    /**
     * Set icon.
     *
     * @param string $icon
     *
     * @return $this
     */
    public function setIcon($icon)
    {
        $this->icon = $icon;

        return $this;
    }

    /**
     * Get prefix.
     *
     * @return string
     */
    public function getPrefix()
    {
        return $this->prefix;
    }

    /**
     * Set prefix.
     *
     * @param string $prefix
     *
     * @return $this
     */
    public function setPrefix($prefix)
    {
        $this->prefix = $prefix;

        return $this;
    }

    /**
     * Get Specification class name.
     *
     * @return string
     */
    public function getClass()
    {
        return '\\Claroline\\MusicInstrumentBundle\\Entity\\Specification\\'.$this->prefix.'Specification';
    }

    /**
     * Is polyphonic ?
     *
     * @return bool
     */
    public function isPolyphonic()
    {
        return $this->polyphonic;
    }

    /**
     * Set polyphonic.
     *
     * @param bool $polyphonic
     *
     * @return $this
     */
    public function setPolyphonic($polyphonic)
    {
        $this->polyphonic = $polyphonic;

        return $this;
    }

    /**
     * Is enabled ?
     *
     * @return bool
     */
    public function isEnabled()
    {
        return $this->enabled;
    }

    /**
     * Set enabled.
     *
     * @param bool $enabled
     *
     * @return $this
     */
    public function setEnabled($enabled)
    {
        $this->enabled = $enabled;

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
            'name' => $this->name,
            'icon' => $this->icon,
            'prefix' => $this->prefix,
            'polyphonic' => $this->polyphonic,
        ];
    }
}
