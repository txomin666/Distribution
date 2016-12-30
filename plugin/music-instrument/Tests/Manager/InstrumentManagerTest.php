<?php

namespace Claroline\MusicInstrumentBundle\Tests\Manager;

use Claroline\CoreBundle\Persistence\ObjectManager;
use Claroline\MusicInstrumentBundle\Manager\InstrumentManager;

class InstrumentManagerTest extends \PHPUnit_Framework_TestCase
{
    /** @var ObjectManager|\PHPUnit_Framework_MockObject_MockObject */
    private $om;
    /** @var InstrumentManager */
    private $manager;

    protected function setUp()
    {
        // Mock dependencies of the manager
        $this->om = $this->mock('Claroline\CoreBundle\Persistence\ObjectManager');
        $this->manager = new InstrumentManager($this->om);
    }

    public function testEncode()
    {
        $this->markTestIncomplete(
            'This test has not been implemented yet.'
        );
    }

    public function testCreate()
    {
        $this->markTestIncomplete(
            'This test has not been implemented yet.'
        );
    }

    public function testCreateWithInvalidData()
    {
        $this->markTestIncomplete(
            'This test has not been implemented yet.'
        );
    }

    public function testUpdate()
    {
        $this->markTestIncomplete(
            'This test has not been implemented yet.'
        );
    }

    public function testUpdateWithInvalidData()
    {
        $this->markTestIncomplete(
            'This test has not been implemented yet.'
        );
    }

    public function testCopy()
    {
        $this->markTestIncomplete(
            'This test has not been implemented yet.'
        );
    }

    public function testDelete()
    {
        $this->markTestIncomplete(
            'This test has not been implemented yet.'
        );
    }

    private function mock($class)
    {
        return $this->getMockBuilder($class)
            ->disableOriginalConstructor()
            ->getMock();
    }
}
