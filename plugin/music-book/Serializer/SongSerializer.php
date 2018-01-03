<?php

namespace Claroline\MusicBookBundle\Serializer;

use Claroline\MusicBookBundle\Entity\Song;
use JMS\DiExtraBundle\Annotation as DI;

/**
 * @DI\Service("claroline.serializer.music_song")
 * @DI\Tag("claroline.serializer")
 */
class SongSerializer
{
    /**
     * @return string
     */
    public function getClass()
    {
        return 'Claroline\MusicBookBundle\Entity\Song';
    }

    /**
     * @return string
     */
    public function getSchema()
    {
        return '#/plugin/music-book/song.json';
    }

    /**
     * @return string
     */
    public function getSamples()
    {
        return '#/plugin/music-book/song';
    }

    public function serialize(Song $song, array $options = [])
    {
        // todo implement

        return [
            'id' => 123456,
            'tempo' => 120,
            'audio' => '/04 - Pandemonic Hyperblast.mp3',
            'cover' => '/CodexNecro.jpg',
            'releaseDate' => '2009',
            'artists' => [
                ['id' => '123', 'name' => 'Anaal Nathrakh'],
                ['id' => '234', 'name' => 'Belphegor'],
            ],
            'tracks' => [
                [
                    'id' => '1',
                    'name' => 'Vocals',
                    'type' => ['name' => 'vocals']
                ], [
                    'id' => '2',
                    'name' => 'Lead guitar',
                    'type' => ['name' => 'guitar']
                ], [
                    'id' => '3',
                    'name' => 'Rythm guitar',
                    'type' => ['name' => 'guitar']
                ], [
                    'id' => '4',
                    'name' => 'Bass',
                    'type' => ['name' => 'bass']
                ], [
                    'id' => '5',
                    'name' => 'Drums',
                    'type' => ['name' => 'drums']
                ],
            ],
            'tags' => ['black metal', 'grindcore']
        ];
    }
}
