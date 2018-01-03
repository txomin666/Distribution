<?php

namespace Claroline\MusicInstrumentBundle\DataFixtures\ORM;

use Claroline\MusicInstrumentBundle\Entity\InstrumentType;
use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;

/**
 * Initializes instrument types.
 */
class LoadInstrumentTypeData extends AbstractFixture implements OrderedFixtureInterface
{
    /**
     * {@inheritdoc}
     */
    public function getOrder()
    {
        return 1;
    }

    /**
     * {@inheritdoc}
     */
    public function load(ObjectManager $manager)
    {
        $types = $this->getData();
        foreach ($types as $type) {
            $entity = new InstrumentType();

            $entity->setName($type['name']);
            $entity->setClass($type['class']);
            $entity->setPolyphonic($type['polyphonic']);
            $entity->setTunable($type['tunable']);

            // Auto enable all instrument types
            $entity->setEnabled(true);

            $manager->persist($entity);

            // Store reference for use in other DataFixtures
            $this->addReference(strtolower($type['name']), $entity);
        }

        $manager->flush();
    }

    private function getData()
    {
        return [
            [
                'name' => 'guitar',
                'class' => '\Claroline\MusicInstrumentBundle\Entity\InstrumentType\Guitar',
                'polyphonic' => true,
                'tunable' => true,
            ],
            [
                'name' => 'ukulele',
                'class' => '\Claroline\MusicInstrumentBundle\Entity\InstrumentType\Guitar',
                'polyphonic' => true,
                'tunable' => true,
            ],
            [
                'name' => 'bass',
                'class' => '\Claroline\MusicInstrumentBundle\Entity\InstrumentType\Guitar',
                'polyphonic' => true,
                'tunable' => true,
            ],
            [
                'name' => 'recorder',
                'class' => '\Claroline\MusicInstrumentBundle\Entity\InstrumentType\Recorder',
                'polyphonic' => false,
                'tunable' => true,
            ],
            [
                'name' => 'keyboard',
                'class' => '\Claroline\MusicInstrumentBundle\Entity\InstrumentType\Keyboard',
                'polyphonic' => true,
                'tunable' => false,
            ],
            [
                'name' => 'drums',
                'class' => '\Claroline\MusicInstrumentBundle\Entity\InstrumentType\Drums',
                'polyphonic' => false,
                'tunable' => false,
            ],
            [
                'name' => 'vocals',
                'class' => '\Claroline\MusicInstrumentBundle\Entity\InstrumentType\Vocals',
                'polyphonic' => false,
                'tunable' => true,
            ],
        ];
    }
}
