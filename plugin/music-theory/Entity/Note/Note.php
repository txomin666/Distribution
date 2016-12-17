<?php

namespace Claroline\MusicTheoryBundle\Entity\Note;

use Claroline\MusicTheoryBundle\Entity\Interval;
use Doctrine\ORM\Mapping as ORM;

/**
 * Note.
 *
 * @ORM\Entity(repositoryClass="Claroline\MusicTheoryBundle\Repository\NoteRepository")
 * @ORM\Table(name="claro_music_note")
 */
class Note implements \JsonSerializable
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
     * Note relative value (in semitones) to C0.
     *
     * @ORM\Column(name="note_value", type="integer")
     *
     * @var int
     */
    private $value;

    /**
     * Octave of the Note.
     *
     * @ORM\Column(type="integer")
     *
     * @var int
     */
    private $octave;

    /**
     * Frequency of the Note (in Hz).
     *
     * @ORM\Column(type="float", precision=3)
     *
     * @var float
     */
    private $frequency;

    /**
     * Midi number of the Note.
     *
     * @ORM\Column(type="integer")
     *
     * @var int
     */
    private $midi;

    /**
     * Info of the Note (name, color, etc.).
     *
     * @ORM\ManyToOne(targetEntity="Claroline\MusicTheoryBundle\Entity\Note\NoteInfo", cascade={"remove", "persist"})
     * @ORM\JoinColumn(name="info_id", referencedColumnName="id", nullable=true, onDelete="SET NULL")
     *
     * @var NoteInfo
     */
    private $info;

    /**
     * Previous note.
     *
     * @ORM\OneToOne(targetEntity="Claroline\MusicTheoryBundle\Entity\Note\Note")
     * @ORM\JoinColumn(name="previous_id", referencedColumnName="id", nullable=true, onDelete="SET NULL")
     *
     * @var Note
     */
    private $previous;

    /**
     * Next note.
     *
     * @ORM\OneToOne(targetEntity="Claroline\MusicTheoryBundle\Entity\Note\Note")
     * @ORM\JoinColumn(name="next_id", referencedColumnName="id", nullable=true, onDelete="SET NULL")
     *
     * @var Note
     */
    private $next;

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
     * Get value.
     *
     * @return int
     */
    public function getValue()
    {
        return $this->value;
    }

    /**
     * Set value.
     *
     * @param int $value
     *
     * @return Note
     */
    public function setValue($value)
    {
        $this->value = $value;

        return $this;
    }

    /**
     * Get octave.
     *
     * @return int
     */
    public function getOctave()
    {
        return $this->octave;
    }

    /**
     * Set octave.
     *
     * @param int $octave
     *
     * @return Note
     */
    public function setOctave($octave)
    {
        $this->octave = $octave;

        return $this;
    }

    /**
     * Get frequency.
     *
     * @return int
     */
    public function getFrequency()
    {
        return $this->frequency;
    }

    /**
     * Set frequency.
     *
     * @param float $frequency
     *
     * @return Note
     */
    public function setFrequency($frequency)
    {
        $this->frequency = $frequency;

        return $this;
    }

    /**
     * Get midi.
     *
     * @return int
     */
    public function getMidi()
    {
        return $this->midi;
    }

    /**
     * Set midi.
     *
     * @param int $midi
     *
     * @return Note
     */
    public function setMidi($midi)
    {
        $this->midi = $midi;

        return $this;
    }

    /**
     * Get info.
     *
     * @return NoteInfo
     */
    public function getInfo()
    {
        return $this->info;
    }

    /**
     * Set info.
     *
     * @param NoteInfo $info
     *
     * @return Note
     */
    public function setInfo(NoteInfo $info)
    {
        $this->info = $info;

        return $this;
    }

    /**
     * Get previous Note.
     *
     * @return Note
     */
    public function getPrevious()
    {
        return $this->previous;
    }

    /**
     * Set previous Note.
     *
     * @param Note $previous
     *
     * @return Note
     */
    public function setPrevious(Note $previous)
    {
        if ($this->previous !== $previous) {
            $this->previous = $previous;

            $previous->setNext($this);
        }

        return $this;
    }

    /**
     * Get next Note.
     *
     * @return Note
     */
    public function getNext()
    {
        return $this->next;
    }

    /**
     * Set next Note.
     *
     * @param Note $next
     *
     * @return Note
     */
    public function setNext(Note $next)
    {
        if ($this->next !== $next) {
            $this->next = $next;

            $next->setPrevious($this);
        }

        return $this;
    }

    /**
     * Add Interval to the Note.
     *
     * @param Interval $interval
     *
     * @return Note
     */
    public function addInterval(Interval $interval)
    {
        $value = $interval->getValue();

        return $this->addSemitone($value);
    }

    /**
     * Add semitones to the Note.
     *
     * @param number $count
     *
     * @return Note
     */
    public function addSemitone($count)
    {
        $newValue = ($this->value + $count) % 12;

        $next = $this;
        for ($i = 0; $i < $newValue; ++$i) {
            $next = $next->getNext();
        }

        return $next;
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
            // Note properties
            'value' => $this->value,
            'octave' => $this->octave,
            'frequency' => $this->frequency,
            'midi' => $this->midi,

            // Flatten NoteInfo properties for simpler structure
            'sharp_name' => $this->info->getSharpName(),
            'flat_name' => $this->info->getFlatName(),
            'accidental' => $this->info->isAccidental(),
            'color' => $this->info->getColor(),
        ];
    }
}
