<?php

namespace Claroline\MusicInstrumentBundle\Entity;

use Claroline\CoreBundle\Entity\Resource\AbstractResource;
use Claroline\MusicInstrumentBundle\Annotation\ApiDefinition;
use Claroline\MusicInstrumentBundle\Entity\InstrumentType\AbstractType;
use Doctrine\ORM\Mapping as ORM;

/**
 * Instrument Entity.
 * Used to store the common configuration of all types of instrument.
 *
 * @ORM\Entity()
 * @ORM\EntityListeners({"\Claroline\MusicInstrumentBundle\Listener\Entity\InstrumentListener"})
 * @ORM\Table(name="claro_music_instrument")
 *
 * @ApiDefinition("Claroline\MusicInstrumentBundle\Definitions\InstrumentDefinition")
 */
class Instrument extends AbstractResource implements \JsonSerializable
{
    /**
     * Type of the Instrument.
     *
     * @ORM\ManyToOne(targetEntity="Claroline\MusicInstrumentBundle\Entity\InstrumentType")
     * @ORM\JoinColumn(name="type_id", referencedColumnName="id", onDelete="CASCADE")
     *
     * @var InstrumentType
     */
    private $type;

    /**
     * Midi number of the Instrument.
     *
     * @ORM\Column(type="integer")
     *
     * @var int
     */
    private $midi = 10; // FIXME

    /**
     * Specification of the Instrument.
     *
     * @var AbstractType
     */
    private $specification;

    /**
     * Manufacturer of the Instrument.
     *
     * @ORM\Column(type="string", nullable=true)
     *
     * @var string
     */
    private $manufacturer;

    /**
     * Model of the Instrument.
     *
     * @ORM\Column(type="string", nullable=true)
     *
     * @var string
     */
    private $model;

    /**
     * Get type of the Instrument.
     *
     * @return InstrumentType
     */
    public function getType()
    {
        return $this->type;
    }

    /**
     * Set type of the Instrument.
     *
     * @param InstrumentType $type
     *
     * @return Instrument
     */
    public function setType(InstrumentType $type)
    {
        $this->type = $type;

        return $this;
    }

    /**
     * Get midi number.
     *
     * @return int
     */
    public function getMidi()
    {
        return $this->midi;
    }

    /**
     * Set midi number.
     *
     * @param int $midi
     *
     * @return Instrument
     */
    public function setMidi($midi)
    {
        $this->midi = $midi;

        return $this;
    }

    /**
     * Get specification.
     *
     * @return AbstractType
     */
    public function getSpecification()
    {
        return $this->specification;
    }

    /**
     * Set specification.
     *
     * @param AbstractType $specification
     *
     * @return Instrument
     */
    public function setSpecification(AbstractType $specification)
    {
        $this->specification = $specification;

        // Set inverse side of relationship
        $specification->setInstrument($this);

        return $this;
    }

    /**
     * Get manufacturer.
     *
     * @return string
     */
    public function getManufacturer()
    {
        return $this->manufacturer;
    }

    /**
     * Set manufacturer.
     *
     * @param string $manufacturer
     *
     * @return Instrument
     */
    public function setManufacturer($manufacturer)
    {
        $this->manufacturer = $manufacturer;

        return $this;
    }

    /**
     * Get model.
     *
     * @return string
     */
    public function getModel()
    {
        return $this->model;
    }

    /**
     * Set model.
     *
     * @param string $model
     *
     * @return Instrument
     */
    public function setModel($model)
    {
        $this->model = $model;

        return $this;
    }

    /**
     * Serialize the Entity.
     *
     * @return array
     */
    public function jsonSerialize()
    {
        $specification = $this->specification->jsonSerialize();

        return [
            'id' => $this->id,

            // Attributes of the Resource
            'attributes' => array_merge($specification['attributes'], [
                'name' => $this->name,
                'manufacturer' => $this->manufacturer,
                'model' => $this->model,
            ]),

            // Relationships with other Resources
            'relationships' => array_merge($specification['relationships'], [
                'instrumentType' => [
                    'data' => $this->type,
                ],
            ]),
        ];
    }
}
