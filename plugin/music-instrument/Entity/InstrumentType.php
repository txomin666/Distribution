<?php

namespace Claroline\MusicInstrumentBundle\Entity;

use Claroline\CoreBundle\Entity\Model\UuidTrait;
use Doctrine\ORM\Mapping as ORM;

/**
 * InstrumentType Entity.
 * Stores the default configuration for each instrument type (e.g. guitar, bass, recorder, keyboard).
 *
 * @ORM\Entity()
 * @ORM\Table(name="claro_music_instrument_type")
 */
class InstrumentType
{
    use UuidTrait;

    /**
     * Identifier of the type.
     *
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
     * Specification class name.
     *
     * @ORM\Column(name="class_name", type="string")
     *
     * @var string
     */
    private $class;

    /**
     * Can the instrument have different tunings ?
     *
     * @ORM\Column(type="boolean")
     *
     * @var bool
     */
    private $tunable = false;

    /**
     * Can the instrument play several notes simultaneously ? (to play chords).
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
     * InstrumentType constructor.
     */
    public function __construct()
    {
        $this->refreshUuid();
    }

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
     * Get Specification class name.
     *
     * @return string
     */
    public function getClass()
    {
        return $this->class;
    }

    /**
     * Set Specification class name.
     *
     * @param string $class
     *
     * @return $this
     */
    public function setClass($class)
    {
        $this->class = $class;

        return $this;
    }

    /**
     * Is tunable ?
     *
     * @return bool
     */
    public function isTunable()
    {
        return $this->tunable;
    }

    /**
     * Set tunable.
     *
     * @param bool $tunable
     *
     * @return $this
     */
    public function setTunable($tunable)
    {
        $this->tunable = $tunable;

        return $this;
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
}
