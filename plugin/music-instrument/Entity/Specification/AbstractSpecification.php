<?php

namespace Claroline\MusicInstrumentBundle\Entity\Specification;

use Doctrine\ORM\Mapping as ORM;
use Claroline\MusicInstrumentBundle\Entity\Instrument;

/**
 * Base class for all types of instrument.
 *
 * @ORM\MappedSuperclass()
 */
abstract class AbstractSpecification implements \JsonSerializable
{
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     *
     * @var int
     */
    protected $id;

    /**
     * General information about the Instrument.
     *
     * @var Instrument
     *
     * @ORM\OneToOne(targetEntity="Claroline\MusicInstrumentBundle\Entity\Instrument")
     * @ORM\JoinColumn(name="instrument_id", referencedColumnName="id", onDelete="CASCADE")
     */
    protected $instrument;

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
     * Get info.
     *
     * @return Instrument
     */
    public function getInstrument()
    {
        return $this->instrument;
    }

    /**
     * Set instrument.
     *
     * @param Instrument $instrument
     *
     * @return AbstractSpecification
     */
    public function setInstrument(Instrument $instrument)
    {
        $this->instrument = $instrument;

        return $this;
    }

    abstract public function jsonSerialize();
}
