<?php

namespace Claroline\MusicTheoryBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;

/**
 * Chord.
 *
 * @ORM\Entity()
 * @ORM\Table(name="claro_music_chord")
 */
class Chord implements \JsonSerializable
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
     * Number of Notes in the Chords
     * Used to classify chords (e.g. triad, tetrad).
     *
     * @var int
     *
     * @ORM\Column(type="integer")
     */
    private $notesCount;

    /**
     * Symbol of the Chord.
     *
     * @var string
     *
     * @ORM\Column(type="string")
     */
    private $symbol;

    /**
     * Intervals composing the chord.
     *
     * @var \Doctrine\Common\Collections\ArrayCollection
     *
     * @ORM\ManyToMany(targetEntity="Claroline\MusicTheoryBundle\Entity\Interval", cascade={"all"})
     * @ORM\JoinTable(
     *      name               = "theory_chord_interval",
     *      joinColumns        = { @ORM\JoinColumn(name="chord_id",    referencedColumnName="id") },
     *      inverseJoinColumns = { @ORM\JoinColumn(name="interval_id", referencedColumnName="id") }
     * )
     */
    private $intervals;

    /**
     * Entity constructor.
     */
    public function __construct()
    {
        $this->intervals = new ArrayCollection();
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
     * Get number of Notes.
     *
     * @return int
     */
    public function getNotesCount()
    {
        return $this->notesCount;
    }

    /**
     * Set number of Notes.
     *
     * @param int $count
     *
     * @return $this
     */
    public function setNotesCount($count)
    {
        $this->notesCount = $count;

        return $this;
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
     * @return $this
     */
    public function setSymbol($symbol)
    {
        $this->symbol = $symbol;

        return $this;
    }

    /**
     * Get the list of intervals of the Chord.
     *
     * @return \Doctrine\Common\Collections\ArrayCollection
     */
    public function getIntervals()
    {
        return $this->intervals;
    }

    /**
     * Add an Interval to the Chord.
     *
     * @param Interval $interval
     *
     * @return Chord
     */
    public function addInterval(Interval $interval)
    {
        if (!$this->intervals->contains($interval)) {
            $this->intervals->add($interval);
        }

        return $this;
    }

    /**
     * Remove an Interval from the Chord.
     *
     * @param Interval $interval
     *
     * @return Chord
     */
    public function removeInterval(Interval $interval)
    {
        if ($this->intervals->contains($interval)) {
            $this->intervals->removeElement($interval);
        }

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
            'type' => 'chords',
            'id' => $this->id,
            'attributes' => array(
                'name' => $this->name,
                'symbol' => $this->symbol,
                'notes_count' => $this->notesCount,
            ),
        );
    }
}
