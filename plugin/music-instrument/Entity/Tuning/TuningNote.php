<?php

namespace Claroline\MusicInstrumentBundle\Entity\Tuning;

use Claroline\MusicTheoryBundle\Entity\Note\Note;
use Doctrine\ORM\Mapping as ORM;

/**
 * TuningNote.
 *
 * @ORM\Entity()
 * @ORM\Table(name="claro_music_tuning_note")
 */
class TuningNote implements \JsonSerializable
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
     * Order of the Note into the Tuning.
     *
     * @ORM\Column(name="note_order", type="integer")
     *
     * @var int
     */
    private $order;

    /**
     * Parent Tuning.
     *
     * @ORM\ManyToOne(targetEntity="Claroline\MusicInstrumentBundle\Entity\Tuning\Tuning", inversedBy="notes")
     * @ORM\JoinColumn(name="tuning_id", referencedColumnName="id", onDelete="CASCADE")
     *
     * @var Tuning
     */
    private $tuning;

    /**
     * Note.
     *
     * @ORM\ManyToOne(targetEntity="Claroline\MusicTheoryBundle\Entity\Note\Note")
     * @ORM\JoinColumn(name="note_id", referencedColumnName="id", onDelete="CASCADE")
     *
     * @var Note
     */
    private $note;

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
     * Get order.
     *
     * @return int
     */
    public function getOrder()
    {
        return $this->order;
    }

    /**
     * Set order.
     *
     * @param int $order
     *
     * @return TuningNote
     */
    public function setOrder($order)
    {
        $this->order = $order;

        return $this;
    }

    /**
     * Get Tuning.
     *
     * @return Tuning
     */
    public function getTuning()
    {
        return $this->tuning;
    }

    /**
     * Set Tuning.
     *
     * @param Tuning $tuning
     *
     * @return TuningNote
     */
    public function setTuning(Tuning $tuning)
    {
        $this->tuning = $tuning;

        return $this;
    }

    /**
     * Get Note.
     *
     * @return Note
     */
    public function getNote()
    {
        return $this->note;
    }

    /**
     * Set Note.
     *
     * @param Note $note
     *
     * @return TuningNote
     */
    public function setNote(Note $note)
    {
        $this->note = $note;

        return $this;
    }

    public function jsonSerialize()
    {
        return $this->note;
    }
}
