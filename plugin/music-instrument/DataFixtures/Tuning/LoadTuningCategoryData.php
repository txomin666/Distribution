<?php

namespace TuningBundle\DataFixtures\ORM;

use Claroline\MusicInstrumentBundle\Entity\Tuning\TuningCategory;
use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;

/**
 * Initializes Tunings.
 */
class LoadTuningCategoryData extends AbstractFixture implements OrderedFixtureInterface
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
        $categories = [];

        foreach ($categories as $category) {
            $entity = new TuningCategory();
            $entity->setName($category['name']);

            $manager->persist($entity);
        }

        $manager->flush();
    }
}
