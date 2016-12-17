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
            $entity->setIcon($type['icon']);
            $entity->setClass($type['class']);
            $entity->setPolyphonic($type['polyphonic']);
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
                'name' => 'Guitar',
                'icon' => 'instrument/guitar.svg',
                'class' => '\Claroline\MusicInstrumentBundle\Entity\Specification\GuitarSpecification',
                'polyphonic' => true,
            ],

            [
                'name' => 'Ukulele',
                'icon' => 'instrument/ukulele.svg',
                'class' => '\Claroline\MusicInstrumentBundle\Entity\Specification\GuitarSpecification',
                'polyphonic' => true,
            ],

            [
                'name' => 'Bass',
                'icon' => 'instrument/bass.svg',
                'class' => '\Claroline\MusicInstrumentBundle\Entity\Specification\GuitarSpecification',
                'polyphonic' => true,
            ],

            [
                'name' => 'Recorder',
                'icon' => 'instrument/recorder.svg',
                'class' => '\Claroline\MusicInstrumentBundle\Entity\Specification\RecorderSpecification',
                'polyphonic' => false,
            ],

            [
                'name' => 'Piano',
                'icon' => 'instrument/piano.svg',
                'class' => '\Claroline\MusicInstrumentBundle\Entity\Specification\PianoSpecification',
                'polyphonic' => true,
            ],
        ];
    }
}
