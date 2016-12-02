<?php

namespace Claroline\MusicBookBundle\Tests\Manager;

use Claroline\CoreBundle\Library\Testing\TransactionalTestCase;

class SongManagerTest extends TransactionalTestCase
{
    private $manager;

    protected function setUp()
    {
        parent::setUp();
        
        $this->manager = $this->client->getContainer()->get('claro_music_book.manager.song');
    }
}
