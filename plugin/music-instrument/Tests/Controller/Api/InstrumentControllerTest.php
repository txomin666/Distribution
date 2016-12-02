<?php

namespace Claroline\MusicInstrumentBundle\Tests\Controller\Api;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
use Symfony\Bundle\FrameworkBundle\Client;

class InstrumentControllerTest extends WebTestCase
{
    /**
     * A Client instance
     *
     * @var Client
     */
    private $client;

    public function setUp()
    {
        parent::setUp();

        $this->client = static::createClient();
    }

    public function testListAction()
    {
        // Request the endpoint
        $this->client->request('GET', '/instruments', [], []);

        // Get the Response content
        $response = $this->client->getResponse();
        $content = json_decode($response->getContent());

        // Validate Response
        $this->assertEquals(200, $response->getStatusCode());
        $this->assertTrue(!empty($content->data));
        $this->assertTrue(is_array($content->data));
    }
}
