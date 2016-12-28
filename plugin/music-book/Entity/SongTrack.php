<?php

namespace Claroline\MusicBookBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * SongTrack.
 *
 * @ORM\Entity
 * @ORM\Table(name="claro_music_song_track")
 */
class SongTrack
{
    private $song;
}
