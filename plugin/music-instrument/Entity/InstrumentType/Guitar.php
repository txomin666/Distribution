<?php

namespace Claroline\MusicInstrumentBundle\Entity\InstrumentType;

use Claroline\MusicInstrumentBundle\Library\Model\TuningTrait;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * Guitar.
 * Used to store the configuration of a Guitar.
 *
 * @ORM\Entity()
 * @ORM\Table(name="claro_music_instrument_guitar")
 */
class Guitar extends AbstractType
{
    /*
     * Tuning of the Guitar
     */
    use TuningTrait;

    /**
     * Shape of the guitar's headstock (in-line or top-bottom).
     *
     * @ORM\Column(type="string")
     * @Assert\Choice(
     *      choices = {"in-line", "top-bottom"},
     *      message = "Choose a valid headstock shape."
     * )
     *
     * @var string
     */
    private $headstock = 'top-bottom';

    /**
     * Shape of the guitar's body (hollow, semi-hollow, solid).
     *
     * @ORM\Column(type="string")
     * @Assert\Choice(
     *      choices = {"hollow", "semi-hollow", "solid"},
     *      message = "Choose a valid body shape."
     * )
     *
     * @var string
     */
    private $body = 'hollow';

    /**
     * Amplification type of the Guitar (acoustic, electro-acoustic, electric).
     *
     * @ORM\Column(type="string")
     * @Assert\Choice(
     *      choices = {"acoustic", "electro-acoustic", "electric"},
     *      message = "Choose a valid amplification type."
     * )
     *
     * @var string
     */
    private $amplification = 'acoustic';

    /**
     * Number of strings.
     *
     * @ORM\Column(type="integer")
     * @Assert\Range(
     *      min = 4,
     *      max = 18,
     *      minMessage = "A Guitar must have at least {{ limit }} strings.",
     *      maxMessage = "A Guitar cannot have more than {{ limit }} strings."
     * )
     *
     * @var int
     */
    private $strings = 6;

    /**
     * Number of frets.
     *
     * @ORM\Column(type="integer")
     *
     * @var int
     */
    private $frets = 19;

    /**
     * Does the guitar have frets ?
     *
     * @ORM\Column(type="boolean")
     *
     * @var bool
     */
    private $fretless = false;

    /**
     * The fret markers type.
     *
     * @ORM\Column(type="string")
     *
     * @var string
     */
    private $markers = 'circle';

    /**
     * Is the Guitar left-handed ?
     *
     * @ORM\Column(type="boolean")
     *
     * @var bool
     */
    private $leftHanded = false;

    /**
     * Get headstock.
     *
     * @return string
     */
    public function getHeadstock()
    {
        return $this->headstock;
    }

    /**
     * Set headstock.
     *
     * @param string $headstock
     *
     * @return $this
     */
    public function setHeadstock($headstock)
    {
        $this->headstock = $headstock;

        return $this;
    }

    /**
     * Get body.
     *
     * @return string
     */
    public function getBody()
    {
        return $this->body;
    }

    /**
     * Set body.
     *
     * @param string $body
     *
     * @return $this
     */
    public function setBody($body)
    {
        $this->body = $body;

        return $this;
    }

    /**
     * Get amplification.
     *
     * @return string
     */
    public function getAmplification()
    {
        return $this->amplification;
    }

    /**
     * Set amplification.
     *
     * @param string $amplification
     *
     * @return $this
     */
    public function setAmplification($amplification)
    {
        $this->amplification = $amplification;

        return $this;
    }

    /**
     * Get number of strings.
     *
     * @return int
     */
    public function getStrings()
    {
        return $this->strings;
    }

    /**
     * Set number of strings.
     *
     * @param int $strings
     *
     * @return $this
     */
    public function setStrings($strings)
    {
        $this->strings = $strings;

        return $this;
    }

    /**
     * Get number of frets.
     *
     * @return int
     */
    public function getFrets()
    {
        return $this->frets;
    }

    /**
     * Get number of frets.
     *
     * @param int $frets
     *
     * @return $this
     */
    public function setFrets($frets)
    {
        $this->frets = $frets;

        return $this;
    }

    /**
     * Is fretless ?
     *
     * @return bool
     */
    public function isFretless()
    {
        return $this->fretless;
    }

    /**
     * Set fretless.
     *
     * @param bool $fretless
     *
     * @return $this
     */
    public function setFretless($fretless)
    {
        $this->fretless = $fretless;

        return $this;
    }

    /**
     * Is left handed ?
     *
     * @return bool
     */
    public function isLeftHanded()
    {
        return $this->leftHanded;
    }

    /**
     * Set left handed.
     *
     * @param bool $leftHanded
     *
     * @return $this
     */
    public function setLeftHanded($leftHanded)
    {
        $this->leftHanded = $leftHanded;

        return $this;
    }

    /**
     * Get fret markers.
     *
     * @return string
     */
    public function getMarkers()
    {
        return $this->markers;
    }

    /**
     * Set fret markers.
     *
     * @param string $markers
     *
     * @return $this
     */
    public function setMarkers($markers)
    {
        $this->markers = $markers;

        return $this;
    }
}
