<?php

namespace Claroline\MusicInstrumentBundle\Listener\Entity;

use Claroline\MusicInstrumentBundle\Entity\Instrument;
use Doctrine\ORM\Event\LifecycleEventArgs;

/**
 * Instrument Listener
 * Manages Life cycle of the Instrument
 * As the relation between Instrument and its specification uses an abstract class (e.g. AbstractSpecification),
 * Doctrine is unable to manage it automatically.
 */
class InstrumentListener
{
    /**
     * PrePersist
     * Persists the linked Specification too (or add an empty one) when an Instrument is removed.
     *
     * @param Instrument         $instrument
     * @param LifecycleEventArgs $event
     */
    public function prePersist(Instrument $instrument, LifecycleEventArgs $event)
    {
        $specification = $instrument->getSpecification();

        if (null === $specification) {
            $class = $instrument->getType()->getClass();
            $specification = new $class();
            $instrument->setSpecification($specification);
        }

        if (!empty($specification)) {
            $event->getEntityManager()->persist($specification);
        }
    }

    /**
     * PreRemove
     * Removes the linked Specification too when an Instrument is removed.
     *
     * @param Instrument         $instrument
     * @param LifecycleEventArgs $event
     */
    public function preRemove(Instrument $instrument, LifecycleEventArgs $event)
    {
        $specification = $instrument->getSpecification();
        if (!empty($specification)) {
            $event->getEntityManager()->remove($specification);
        }
    }

    /**
     * PostLoad
     * Loads the linked Specification too when an Instrument is loaded from the DB.
     *
     * @param Instrument         $instrument
     * @param LifecycleEventArgs $event
     */
    public function postLoad(Instrument $instrument, LifecycleEventArgs $event)
    {
        $type = $instrument->getType();

        if (!empty($type)) {
            $repository = $event
                ->getEntityManager()
                ->getRepository($type->getClass());

            /** @var \Claroline\MusicInstrumentBundle\Entity\InstrumentType\AbstractType $specification */
            $specification = $repository->findOneBy([
                'instrument' => $instrument,
            ]);

            if (!empty($specification)) {
                $instrument->setSpecification($specification);
            }
        }
    }
}
