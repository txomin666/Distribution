<?php

namespace Claroline\MusicInstrumentBundle\Entity\Tuning;

use Claroline\MusicInstrumentBundle\Entity\InstrumentType;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;

/**
 * Tuning.
 *
 * @ORM\Entity()
 * @ORM\Table(name="claro_music_tuning")
 */
class Tuning implements \JsonSerializable
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
     * Is it the default Tuning of the Instrument ?
     *
     * @ORM\Column(name="is_default", type="boolean")
     *
     * @var bool
     */
    private $default = false;

    /**
     * Notes that compose the Tuning.
     *
     * @ORM\OneToMany(targetEntity="Claroline\MusicInstrumentBundle\Entity\Tuning\TuningNote", mappedBy="tuning", orphanRemoval=true, cascade={"persist", "remove"})
     * @ORM\OrderBy({"order" = "ASC"})
     *
     * @var ArrayCollection
     */
    private $notes;

    /**
     * Category of the Tuning.
     *
     * @ORM\ManyToOne(targetEntity="Claroline\MusicInstrumentBundle\Entity\Tuning\TuningCategory")
     * @ORM\JoinColumn(name="category_id", referencedColumnName="id", nullable=true)
     *
     * @var TuningCategory
     */
    private $category;

    /**
     * Type of the Instrument.
     *
     * @ORM\ManyToOne(targetEntity="Claroline\MusicInstrumentBundle\Entity\InstrumentType")
     * @ORM\JoinColumn(name="type_id", referencedColumnName="id", onDelete="CASCADE")
     *
     * @var InstrumentType
     */
    private $instrumentType;

    /**
     * Tuning constructor.
     */
    public function __construct()
    {
        $this->notes = new ArrayCollection();
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
     *
     * @return Tuning
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Is default ?
     *
     * @return bool
     */
    public function isDefault()
    {
        return $this->default;
    }

    /**
     * Set default.
     *
     * @param $default
     *
     * @return Tuning
     */
    public function setDefault($default)
    {
        $this->default = $default;

        return $this;
    }

    /**
     * Get Notes.
     *
     * @return ArrayCollection
     */
    public function getNotes()
    {
        return $this->notes;
    }

    /**
     * Add a Note.
     *
     * @param TuningNote $tuningNote
     *
     * @return Tuning
     */
    public function addNote(TuningNote $tuningNote)
    {
        if (!$this->notes->contains($tuningNote)) {
            $this->notes->add($tuningNote);

            $tuningNote->setTuning($this);
        }

        return $this;
    }

    /**
     * Remove a Note.
     *
     * @param TuningNote $tuningNote
     *
     * @return Tuning
     */
    public function removeNote(TuningNote $tuningNote)
    {
        if ($this->notes->contains($tuningNote)) {
            $this->notes->removeElement($tuningNote);
        }

        return $this;
    }

    /**
     * Get category.
     *
     * @return TuningCategory
     */
    public function getCategory()
    {
        return $this->category;
    }

    /**
     * Set category.
     *
     * @param TuningCategory $category
     *
     * @return Tuning
     */
    public function setCategory(TuningCategory $category = null)
    {
        $this->category = $category;

        return $this;
    }

    /**
     * Get type of the Instrument.
     *
     * @return InstrumentType
     */
    public function getInstrumentType()
    {
        return $this->instrumentType;
    }

    /**
     * Set type of the Instrument.
     *
     * @param InstrumentType $instrumentType
     *
     * @return Tuning
     */
    public function setInstrumentType(InstrumentType $instrumentType)
    {
        $this->instrumentType = $instrumentType;

        return $this;
    }

    public function jsonSerialize()
    {
        return [
            // Identifier of the Resource
            'type' => 'tunings',
            'id' => $this->id,

            // Attributes of the Resource
            'attributes' => [
                'name' => $this->name,
                'default' => $this->default,
            ],

            // Relationships with other Resources
            'relationships' => [
                'instrumentType' => [
                    'data' => $this->instrumentType,
                ],
                'category' => [
                    'data' => $this->category,
                ],
                'notes' => [
                    'data' => $this->notes->toArray(),
                ],
            ],
        ];
    }
}
