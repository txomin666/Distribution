<?php

namespace TheoryBundle\DataFixtures\ORM;

use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use Claroline\MusicTheoryBundle\Entity\Degree;

/**
 * Initializes Degrees.
 */
class LoadDegreeData extends AbstractFixture implements OrderedFixtureInterface
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
        // Full list of Degrees to insert into the DB
        $degrees = [
            ['symbol' => 'I', 'name' => 'tonic'],
            ['symbol' => 'II', 'name' => 'supertonic'],
            ['symbol' => 'III', 'name' => 'mediant'],
            ['symbol' => 'IV', 'name' => 'subdominant'],
            ['symbol' => 'V', 'name' => 'dominant'],
            ['symbol' => 'VI', 'name' => 'submediant'],
            ['symbol' => 'VII', 'name' => 'leading-tone'],
            ['symbol' => 'VIII', 'name' => 'octave'],
        ];

        foreach ($degrees as $degree) {
            $entity = new Degree();

            $entity->setName($degree['name']);
            $entity->setSymbol($degree['symbol']);

            $manager->persist($entity);

            // Store reference for use in other DataFixtures
            $this->addReference('degree-'.$entity->getSymbol(), $entity);
        }

        // Save to DB
        $manager->flush();
    }
}
