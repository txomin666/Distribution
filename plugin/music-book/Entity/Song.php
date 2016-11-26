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
     * The list of associated sheet music.
     *
     * @ORM\ManyToMany(targetEntity="Claroline\MusicBookBundle\Entity\SheetMusic")
     * @ORM\JoinTable(name="claro_music_song_sheet_music",
     *     joinColumns        = {@ORM\JoinColumn(name="song_id", referencedColumnName="id")},
     *     inverseJoinColumns = {@ORM\JoinColumn(name="sheet_music_id", referencedColumnName="id", unique=true)}
     * )
     *
     * @var \Doctrine\Common\Collections\ArrayCollection
     */
    private $sheetMusic;

    /**
     * Entity constructor.
     */
    public function __construct()
    {
        $this->sheetMusic = new ArrayCollection();
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
     * @return $this
     */
    public function setCover($cover)
    {
        $this->cover = $cover;

        return $this;
    }

    /**
     * Get the list of sheet music.
     *
     * @return ArrayCollection
     */
    public function getSheetMusic()
    {
        return $this->sheetMusic;
    }

    /**
     * Add a sheet music.
     *
     * @param SheetMusic $sheetMusic
     *
     * @return $this
     */
    public function addSheetMusic(SheetMusic $sheetMusic)
    {
        if (!$this->sheetMusic->contains($sheetMusic)) {
            $this->sheetMusic->add($sheetMusic);
        }

        return $this;
    }

    /**
     * Remove a sheet music.
     *
     * @param SheetMusic $sheetMusic
     *
     * @return $this
     */
    public function removeSheetMusic(SheetMusic $sheetMusic)
    {
        if ($this->sheetMusic->contains($sheetMusic)) {
            $this->sheetMusic->removeElement($sheetMusic);
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
            // Identifier of the Resource
            'type' => 'songs',
            'id' => $this->id,

            // Attributes of the Resource
            'attributes' => [
                'name' => $this->name,
                'artist' => $this->artist,
            ],

            // Relationships with other Resources
            'relationships' => [
                'cover' => [
                    'data' => $this->cover,
                ],
                'sheetMusic' => [
                    'data' => $this->sheetMusic,
                ],
            ],
        ];
    }
}
