<?php

namespace TuningBundle\DataFixtures\ORM;

use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use InstrumentBundle\Entity\InstrumentType;
use TheoryBundle\Entity\Note\Note;
use TuningBundle\Entity\Tuning;
use TuningBundle\Entity\TuningNote;

/**
 * Initializes Tunings.
 */
class LoadTuningData extends AbstractFixture implements OrderedFixtureInterface
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
        $tunings = [
            [
                'instrumentType' => 'guitar',
                'default' => true,
                'name' => 'Standard',
                'notes' => ['E2', 'A2', 'D3', 'G3', 'B3', 'E4']
            ], [
                'instrumentType' => 'guitar',
                'default' => false,
                'name' => 'Down 1 step',
                'notes' => ['D2', 'G2', 'C3', 'F3', 'A3', 'D4']
            ], [
                'instrumentType' => 'guitar',
                'default' => false,
                'name' => 'Down 2 steps',
                'notes' => ['C2', 'F2', 'A♯2', 'D♯3', 'G3', 'C4']
            ], [
                'instrumentType' => 'bass',
                'default' => true,
                'name' => 'Standard',
                'notes' => ['E1', 'A1', 'D2', 'G2']
            ], [
                'instrumentType' => 'ukulele',
                'default' => true,
                'name' => 'C Tuning',
                'notes' => ['G4', 'C4', 'E4', 'A4']
            ], [
                'instrumentType' => 'ukulele',
                'default' => false,
                'name' => 'D Tuning',
                'notes' => ['A4', 'D4', 'F♯4', 'B4']
            ], [
                'instrumentType' => 'ukulele',
                'default' => false,
                'name' => 'Low G',
                'notes' => ['G3', 'C4', 'E4', 'A4']
            ]
        ];

        foreach ($tunings as $tuning) {
            $entity = new Tuning();

            /** @var InstrumentType $instrumentType */
            $instrumentType = $this->getReference($tuning['instrumentType']);

            $entity->setInstrumentType($instrumentType);
            $entity->setName($tuning['name']);
            $entity->setDefault($tuning['default']);

            // Add tuning Notes
            foreach ($tuning['notes'] as $index => $note) {
                /** @var Note $noteEntity */
                $noteEntity = $this->getReference('note-'.$note);

                $tuningNote = new TuningNote();
                $tuningNote->setOrder($index);
                $tuningNote->setNote($noteEntity);

                $entity->addNote($tuningNote);
            }

            $manager->persist($entity);

            // Store reference for use in other DataFixtures
            $normalizedName = strtolower(str_replace(' ', '-', $tuning['name']));
            $this->addReference($tuning['instrumentType'].'-'.$normalizedName, $entity);
        }

        $manager->flush();
    }
}
