<?php

namespace Claroline\MusicTheoryBundle\Repository;

use Claroline\MusicTheoryBundle\Entity\Note\Note;
use Doctrine\ORM\EntityRepository;

class NoteRepository extends EntityRepository
{
    /**
     * @param string $name
     * @param integer $octave
     * @param bool $flat
     *
     * @return Note
     */
    public function findOneByNameAndOctave($name, $octave, $flat = false)
    {
        $qb = $this->createQueryBuilder('n')
            ->join('n.info', 'ni')
            ->where('n.octave = :octave');

        if ($flat) {
            $qb->andWhere('ni.flatName = :name');
        } else {
            $qb->andWhere('ni.sharpName = :name');
        }

        return $qb
            ->setParameters([
                'name' => $name,
                'octave' => $octave
            ])
            ->getQuery()
            ->getSingleResult();
    }
}
