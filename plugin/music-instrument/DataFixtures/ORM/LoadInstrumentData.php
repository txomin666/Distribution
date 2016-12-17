<?php

namespace Claroline\MusicInstrumentBundle\DataFixtures\ORM;

use Claroline\MusicInstrumentBundle\Entity\Instrument;
use Claroline\MusicInstrumentBundle\Entity\InstrumentType;
use Claroline\MusicInstrumentBundle\Entity\Specification\AbstractSpecification;
use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;

/**
 * Initializes instruments
 * Loads generic platform instrument into the DB.
 */
class LoadInstrumentData extends AbstractFixture implements OrderedFixtureInterface
{
    /**
     * {@inheritdoc}
     */
    public function getOrder()
    {
        return 3;
    }

    /**
     * {@inheritdoc}
     */
    public function load(ObjectManager $manager)
    {
        $instruments = $this->getData();
        foreach ($instruments as $instrument) {
            /** @var InstrumentType $type */
            $type = $this->getReference($instrument['type']);
            if ($type) {
                $entity = new Instrument();

                $entity->setName($instrument['name']);
                $entity->setInstrumentType($type);

                $specificationClass = $type->getClass();

                /** @var AbstractSpecification $specification */
                $specification = new $specificationClass();

                // Set template properties
                if (!empty($instrument['specification'])) {
                    foreach ($instrument['specification'] as $propertyName => $propertyValue) {
                        $setter = 'set'.ucwords($propertyName);
                        if (method_exists($specification, $setter)) {
                            $specification->$setter($propertyValue);
                        }
                    }
                }

                $entity->setSpecification($specification);

                $manager->persist($entity);
                $manager->persist($specification);
            }
        }

        $manager->flush();
    }

    private function getData()
    {
        return [
            [
                'type' => 'guitar',
                'name' => 'Classic guitar',
                'specification' => [
                    'leftHanded' => false,
                    'headstock' => 'top-bottom',
                    'body' => 'hollow',
                    'amplification' => 'acoustic',
                    'strings' => 6,
                    'frets' => 19,
                    'tuning' => $this->getReference('guitar-standard'),
                ],
            ], [
                'type' => 'guitar',
                'name' => 'Folk guitar',
                'specification' => [
                    'leftHanded' => false,
                    'headstock' => 'top-bottom',
                    'body' => 'hollow',
                    'amplification' => 'acoustic',
                    'strings' => 6,
                    'frets' => 20,
                    'tuning' => $this->getReference('guitar-standard'),
                ],
            ], [
                'type' => 'guitar',
                'name' => 'Electric guitar',
                'specification' => [
                    'leftHanded' => false,
                    'headstock' => 'in-line',
                    'body' => 'solid',
                    'amplification' => 'electric',
                    'strings' => 6,
                    'frets' => 24,
                    'tuning' => $this->getReference('guitar-standard'),
                ],
            ], [
                'type' => 'bass',
                'name' => 'Bass 4 strings',
                'specification' => [
                    'leftHanded' => false,
                    'headstock' => 'in-line',
                    'body' => 'solid',
                    'amplification' => 'electric',
                    'strings' => 4,
                    'frets' => 24,
                    'tuning' => $this->getReference('bass-standard'),
                ],
            ], [
                'type' => 'bass',
                'name' => 'Bass 5 strings',
                'specification' => [
                    'leftHanded' => false,
                    'headstock' => 'in-line',
                    'body' => 'solid',
                    'amplification' => 'electric',
                    'strings' => 5,
                    'frets' => 24,
                    'tuning' => null,
                ],
            ], [
                'type' => 'ukulele',
                'name' => 'Soprano Ukulele',
                'specification' => [
                    'leftHanded' => false,
                    'headstock' => 'top-bottom',
                    'body' => 'hollow',
                    'amplification' => 'acoustic',
                    'strings' => 4,
                    'frets' => 15,
                    'tuning' => $this->getReference('ukulele-c-tuning'),
                ],
            ],
        ];
    }
}
