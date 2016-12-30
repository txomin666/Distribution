<?php

namespace Claroline\MusicBookBundle\Entity;

use Claroline\CoreBundle\Entity\Resource\AbstractResource;
use Doctrine\ORM\Mapping as ORM;

/**
 * Artist.
 *
 * @ORM\Entity()
 * @ORM\Table(name="claro_music_artist")
 */
class Artist extends AbstractResource
{
    /**
     * The type of the artist (Person, Group, Orchestra, Choir, Other).
     *
     * @var string
     */
    private $type;

    /**
     * Biography of the artist.
     *
     * @var string
     */
    private $biography;

    /**
     * Country of the artist.
     *
     * @var string
     */
    private $origin;

    /**
     * The date on which the artist began his career.
     *
     * @var \DateTime
     */
    private $beginDate;

    /**
     * The date on which the artist ended his career.
     *
     * @var \DateTime
     */
    private $endDate;

    private $members;

    private $pastMembers;

    private $releases;
}
