<?php

namespace Claroline\MusicBookBundle\Entity;

use Claroline\MusicInstrumentBundle\Entity\Instrument;
use Doctrine\ORM\Mapping as ORM;

/**
 * SongTrack.
 *
 * @ORM\Entity
 * @ORM\Table(name="claro_music_song_track")
 */
class SongTrack implements \JsonSerializable
{
    /**
     * Identifier of the track.
     *
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     *
     * @var int
     */
    private $id;

    /**
     * Name of the track.
     *
     * @ORM\Column(type="string", nullable=true)
     *
     * @var string
     */
    private $name;

    /**
     * Position of the track in the song.
     *
     * @ORM\Column(type="integer")
     *
     * @var int
     */
    private $order = 0;

    /**
     * Linked song.
     *
     * @ORM\ManyToOne(targetEntity="Claroline\MusicBookBundle\Entity\Song", inversedBy="tracks")
     * @ORM\JoinColumn(name="song_id", referencedColumnName="id", onDelete="CASCADE")
     *
     * @var Song
     */
    private $song;

    /**
     * Instrument of the track.
     *
     * @ORM\ManyToOne(targetEntity="Claroline\MusicInstrumentBundle\Entity\Instrument")
     * @ORM\JoinColumn(name="instrument_id", referencedColumnName="id", onDelete="CASCADE")
     *
     * @var Instrument
     */
    private $instrument;

    /**
     * URL to the midi file.
     *
     * @ORM\Column(type="string", nullable=true)
     *
     * @var string
     */
    private $midiFile = null;

    /**
     * Track number in the midi file.
     *
     * @ORM\Column(type="integer", nullable=true)
     *
     * @var number
     */
    private $midiTrack = null;

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
     * @return SongTrack
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
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
     * @return SongTrack
     */
    public function setOrder($order)
    {
        $this->order = $order;

        return $this;
    }

    /**
     * Get song.
     *
     * @return Song
     */
    public function getSong()
    {
        return $this->song;
    }

    /**
     * Set song.
     *
     * @param Song $song
     *
     * @return SongTrack
     */
    public function setSong(Song $song)
    {
        $this->song = $song;

        return $this;
    }

    /**
     * Get instrument.
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
     * @return SongTrack
     */
    public function setInstrument(Instrument $instrument)
    {
        $this->instrument = $instrument;

        return $this;
    }

    /**
     * Get midi file.
     *
     * @return string
     */
    public function getMidiFile()
    {
        return $this->midiFile;
    }

    /**
     * Set midi file.
     *
     * @param string $midiFile
     *
     * @return SongTrack
     */
    public function setMidiFile($midiFile)
    {
        $this->midiFile = $midiFile;

        return $this;
    }

    /**
     * Get midi track.
     *
     * @return number
     */
    public function getMidiTrack()
    {
        return $this->midiTrack;
    }

    /**
     * Set midi track.
     *
     * @param number $midiTrack
     *
     * @return SongTrack
     */
    public function setMidiTrack($midiTrack)
    {
        $this->midiTrack = $midiTrack;

        return $this;
    }

    public function jsonSerialize()
    {
        return [
            'id' => $this->id,
        ];
    }
}
