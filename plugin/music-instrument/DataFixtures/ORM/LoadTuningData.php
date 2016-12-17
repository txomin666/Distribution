<?php

namespace Claroline\MusicInstrumentBundle\DataFixtures\ORM;

use Claroline\MusicInstrumentBundle\Entity\InstrumentType;
use Claroline\MusicInstrumentBundle\Entity\Tuning\Tuning;
use Claroline\MusicInstrumentBundle\Entity\Tuning\TuningNote;
use Claroline\MusicTheoryBundle\Repository\NoteRepository;
use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;

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
        $tunings = $this->getData();
        foreach ($tunings as $tuning) {
            $entity = new Tuning();

            /** @var InstrumentType $instrumentType */
            $instrumentType = $this->getReference($tuning['instrumentType']);

            $entity->setInstrumentType($instrumentType);
            $entity->setName($tuning['name']);
            $entity->setDefault($tuning['default']);

            // Add tuning Notes
            foreach ($tuning['notes'] as $index => $note) {
                /** @var NoteRepository $noteRepo */
                $noteRepo = $manager->getRepository('ClarolineMusicTheoryBundle:Note\Note');
                $noteEntity = $noteRepo->findOneByNameAndOctave($note[0], $note[1]);

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

    private function getData()
    {
        return [
            [
                'instrumentType' => 'guitar',
                'default' => true,
                'name' => 'Standard',
                'notes' => [['E', 2], ['A', 2], ['D', 3], ['G', 3], ['B', 3], ['E', 4]],
            ], [
                'instrumentType' => 'guitar',
                'default' => false,
                'name' => 'Down 1 step',
                'notes' => [['D', 2], ['G', 2], ['C', 3], ['F', 3], ['A', 3], ['D', 4]],
            ], [
                'instrumentType' => 'guitar',
                'default' => false,
                'name' => 'Down 2 steps',
                'notes' => [['C', 2], ['F', 2], ['A♯', 2], ['D♯', 3], ['G', 3], ['C', 4]],
            ], [
                'instrumentType' => 'bass',
                'default' => true,
                'name' => 'Standard',
                'notes' => [['E', 1], ['A', 1], ['D', 2], ['G', 2]],
            ], [
                'instrumentType' => 'ukulele',
                'default' => true,
                'name' => 'C Tuning',
                'notes' => [['G', 4], ['C', 4], ['E', 4], ['A', 4]],
            ], [
                'instrumentType' => 'ukulele',
                'default' => false,
                'name' => 'D Tuning',
                'notes' => [['A', 4], ['D', 4], ['F♯', 4], ['B', 4]],
            ], [
                'instrumentType' => 'ukulele',
                'default' => false,
                'name' => 'Low G',
                'notes' => [['G', 3], ['C', 4], ['E', 4], ['A', 4]],
            ]
        ];
    }
}
