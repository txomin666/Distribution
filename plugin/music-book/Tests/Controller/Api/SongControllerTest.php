<?php

namespace Claroline\MusicBookBundle\Tests\Controller\Api;

use Claroline\CoreBundle\Library\Testing\RequestTrait;
use Claroline\CoreBundle\Library\Testing\TransactionalTestCase;

class SongControllerTest extends TransactionalTestCase
{
    use RequestTrait;

    protected function setUp()
    {
        parent::setUp();
    }
}
