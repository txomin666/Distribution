<?php

namespace TheoryBundle\DataFixtures\ORM;

use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use TheoryBundle\Entity\Note\Note;
use TheoryBundle\Entity\Note\NoteInfo;

/**
 * Initializes Notes.
 */
class LoadNoteData extends AbstractFixture implements OrderedFixtureInterface
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
        $notesInfoArray = [
            // C
            ['sharp_name' => 'C', 'flat_name' => 'C', 'accidental' => false, 'color' => '#006cb7'],
            // C♯ / D♭
            ['sharp_name' => 'C♯', 'flat_name' => 'D♭', 'accidental' => true, 'color' => '#008e83'],
            // D
            ['sharp_name' => 'D', 'flat_name' => 'D', 'accidental' => false, 'color' => '#00854a'],
            // D♯ / E♭
            ['sharp_name' => 'D♯', 'flat_name' => 'E♭', 'accidental' => true, 'color' => '#7fb439'],
            // E
            ['sharp_name' => 'E', 'flat_name' => 'E', 'accidental' => false, 'color' => '#fdb813'],
            // F
            ['sharp_name' => 'F', 'flat_name' => 'F', 'accidental' => false, 'color' => '#584742'],
            // F♯ / G♭
            ['sharp_name' => 'F♯', 'flat_name' => 'G♭', 'accidental' => true, 'color' => '#c15e20'],
            // G
            ['sharp_name' => 'G', 'flat_name' => 'G', 'accidental' => false, 'color' => '#f58220'],
            // G♯ / A♭
            ['sharp_name' => 'G♯', 'flat_name' => 'A♭', 'accidental' => true, 'color' => '#f04e46'],
            // A
            ['sharp_name' => 'A', 'flat_name' => 'A', 'accidental' => false, 'color' => '#8f0000'],
            // A♯ / B♭
            ['sharp_name' => 'A♯', 'flat_name' => 'B♭', 'accidental' => true, 'color' => '#a23e97'],
            // B
            ['sharp_name' => 'B', 'flat_name' => 'B', 'accidental' => false, 'color' => '#6a489d'],
        ];

        // Generate NoteInfo
        $notesInfo = [];
        foreach ($notesInfoArray as $noteInfoData) {
            $noteInfo = new NoteInfo();

            $noteInfo->setSharpName($noteInfoData['sharp_name']);
            $noteInfo->setFlatName($noteInfoData['flat_name']);
            $noteInfo->setAccidental($noteInfoData['accidental']);
            $noteInfo->setColor($noteInfoData['color']);

            $notesInfo[] = $noteInfo;

            // ORM persist
            $manager->persist($noteInfo);
        }

        // We start with C0
        $midi = 12;

        // A 440
        $refFreq = 440.000;
        $refValue = 57;

        // Generates notes
        $notes = [];
        for ($octave = 0; $octave < 9; ++$octave) {
            // Generate octaves
            for ($noteNum = 0; $noteNum < 12; ++$noteNum) {
                // Generate notes by octave
                $note = new Note();

                $value = ($noteNum + ($octave * 12));
                $frequency = $refFreq * (pow(2, (($value - $refValue) / 12)));
                $frequency = round($frequency, 3);

                $note->setOctave($octave);
                $note->setValue($value);
                $note->setFrequency($frequency);
                $note->setMidi($midi);
                $note->setInfo($notesInfo[$noteNum]);

                // Link Note to the previous one
                if (!empty($notes[count($notes) - 1])) {
                    $note->setPrevious($notes[count($notes) - 1]);
                }

                $notes[] = $note;

                // ORM persist
                $manager->persist($note);

                // Increment midi number
                ++$midi;

                // Store reference for use in other DataFixtures
                $this->addReference('note-'.$note->getInfo()->getSharpName().$octave, $note);
            }
        }

        // Save to DB
        $manager->flush();
    }
}
