<?php

namespace TheoryBundle\DataFixtures\ORM;

use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use TheoryBundle\Entity\Chord;

/**
 * Initializes chords.
 */
class LoadChordData extends AbstractFixture implements OrderedFixtureInterface
{
    /**
     * {@inheritdoc}
     */
    public function getOrder()
    {
        return 2;
    }

    /**
     * {@inheritdoc}
     */
    public function load(ObjectManager $manager)
    {
        // List of Chords to insert into the DB
        $chords = [
            ['notesCount' => 3, 'name' => 'major', 'symbol' => '', 'intervals' => ['M3', 'P5']],
            ['notesCount' => 3, 'name' => 'minor', 'symbol' => 'm', 'intervals' => ['m3', 'P5']],
            ['notesCount' => 3, 'name' => 'diminished', 'symbol' => '°', 'intervals' => ['m3', 'd5']],
            ['notesCount' => 3, 'name' => 'augmented', 'symbol' => '+', 'intervals' => ['M3', 'A5']],
        ];

        foreach ($chords as $chord) {
            $entity = new Chord();

            $entity->setName($chord['name']);
            $entity->setSymbol($chord['symbol']);
            $entity->setNotesCount($chord['notesCount']);

            // Get the Intervals of the Chord
            foreach ($chord['intervals'] as $interval) {
                /** @var \TheoryBundle\Entity\Interval $intervalEntity */
                $intervalEntity = $this->getReference('interval-'.$interval);
                $entity->addInterval($intervalEntity);
            }

            $manager->persist($entity);
        }

        // Save to DB
        $manager->flush();
    }
}
