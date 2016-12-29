<?php

namespace Claroline\MusicBookBundle\Entity;

use Claroline\CoreBundle\Entity\Resource\AbstractResource;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;

/**
 * Song.
 *
 * @ORM\Entity()
 * @ORM\Table(name="claro_music_song")
 */
class Song extends AbstractResource implements \JsonSerializable
{
    /**
     * Artist of the Song.
     *
     * @ORM\Column(type="string", nullable=true)
     *
     * @var string
     */
    private $artist;

    /**
     * URL to the cover of the Song.
     *
     * @ORM\Column(type="string", nullable=true)
     *
     * @var string
     */
    private $cover;

    /**
     * The list of tracks of the song.
     *
     * @ORM\OneToMany(
     *     targetEntity="Claroline\MusicInstrumentBundle\Entity\Tuning\TuningNote",
     *     mappedBy="song",
     *     orphanRemoval=true,
     *     cascade={"all"}
     * )
     * @ORM\OrderBy({"order" = "ASC"})
     *
     * @var ArrayCollection
     */
    private $tracks;

    /**
     * Entity constructor.
     */
    public function __construct()
    {
        $this->tracks = new ArrayCollection();
    }

    /**
     * Set artist.
     *
     * @param string $artist
     *
     * @return Song
     */
    public function setArtist($artist)
    {
        $this->artist = $artist;

        return $this;
    }

    /**
     * Get artist.
     *
     * @return string
     */
    public function getArtist()
    {
        return $this->artist;
    }

    /**
     * Get cover.
     *
     * @return string
     */
    public function getCover()
    {
        return $this->cover;
    }

    /**
     * Set cover.
     *
     * @param string $cover
     *
     * @return Song
     */
    public function setCover($cover)
    {
        $this->cover = $cover;

        return $this;
    }

    /**
     * Get tracks.
     *
     * @return ArrayCollection
     */
    public function getTracks()
    {
        return $this->tracks;
    }

    /**
     * Add a track.
     *
     * @param SongTrack $track
     *
     * @return Song
     */
    public function addTrack(SongTrack $track)
    {
        if (!$this->tracks->contains($track)) {
            $this->tracks->add($track);
            $track->setSong($this);
        }

        return $this;
    }

    /**
     * Remove a track.
     *
     * @param SongTrack $track
     *
     * @return Song
     */
    public function removeTrack(SongTrack $track)
    {
        if ($this->tracks->contains($track)) {
            $this->tracks->removeElement($track);
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
        return [
            'id' => $this->id,
            'name' => $this->name,
            'artist' => $this->artist,
            'cover' => $this->cover,
            'tracks' => $this->tracks->toArray()
        ];
    }
}
