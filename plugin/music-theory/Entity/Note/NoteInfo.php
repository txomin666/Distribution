<?php

namespace Claroline\MusicTheoryBundle\Entity\Note;

use Doctrine\ORM\Mapping as ORM;

/**
 * Note Info.
 *
 * @ORM\Entity()
 * @ORM\Table(name="claro_music_note_info")
 */
class NoteInfo
{
    const DISPLAY_SHARP = 'sharpName';
    const DISPLAY_FLAT = 'flatName';

    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     *
     * @var int
     */
    private $id;

    /**
     * Sharp Name of the Note.
     *
     * @ORM\Column(name="sharp_name", type="string", length=10)
     *
     * @var string
     */
    private $sharpName;

    /**
     * Flat Name of the Note.
     *
     * @ORM\Column(name="flat_name", type="string", length=10)
     *
     * @var string
     */
    private $flatName;

    /**
     * Is the Note accidental ?
     *
     * @ORM\Column(type="boolean")
     *
     * @var bool
     */
    private $accidental = false;

    /**
     * Color of the Note.
     *
     * @ORM\Column(type="string")
     *
     * @var string
     */
    private $color;

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
     * @param string $displayType
     *
     * @return string
     */
    public function getName($displayType = self::DISPLAY_SHARP)
    {
        $property = $displayType;

        return $this->$property;
    }

    /**
     * Get sharp name.
     *
     * @return string
     */
    public function getSharpName()
    {
        return $this->sharpName;
    }

    /**
     * Set sharp name.
     *
     * @param string $sharpName
     *
     * @return NoteInfo
     */
    public function setSharpName($sharpName)
    {
        $this->sharpName = $sharpName;

        return $this;
    }

    /**
     * Get flat name.
     *
     * @return string
     */
    public function getFlatName()
    {
        return $this->flatName;
    }

    /**
     * Set flat name.
     *
     * @param string $flatName
     *
     * @return NoteInfo
     */
    public function setFlatName($flatName)
    {
        $this->flatName = $flatName;

        return $this;
    }

    /**
     * Is accidental ?
     *
     * @return bool
     */
    public function isAccidental()
    {
        return $this->accidental;
    }

    /**
     * Set accidental.
     *
     * @param bool $accidental
     *
     * @return NoteInfo
     */
    public function setAccidental($accidental)
    {
        $this->accidental = $accidental;

        return $this;
    }

    /**
     * Get color.
     *
     * @return string
     */
    public function getColor()
    {
        return $this->color;
    }

    /**
     * Set color.
     *
     * @param string $color
     *
     * @return NoteInfo
     */
    public function setColor($color)
    {
        $this->color = $color;

        return $this;
    }
}
