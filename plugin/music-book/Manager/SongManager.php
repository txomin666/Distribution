<?php

namespace Claroline\MusicBookBundle\Manager;

use Claroline\CoreBundle\Entity\User;
use Claroline\CoreBundle\Persistence\ObjectManager;
use Claroline\MusicBookBundle\Entity\Song;
use JMS\DiExtraBundle\Annotation as DI;

/**
 * @DI\Service("claro_music_book.manager.song")
 */
class SongManager
{
    /**
     * @var ObjectManager
     */
    private $om;

    /**
     * @var \Doctrine\Common\Persistence\ObjectRepository
     */
    private $repository;

    /**
     * SongManager constructor.
     *
     * @DI\InjectParams({
     *      "om" = @DI\Inject("claroline.persistence.object_manager")
     * })
     *
     * @param ObjectManager $om
     */
    public function __construct(ObjectManager $om)
    {
        $this->om = $om;
        $this->repository = $this->om->getRepository('ClarolineMusicBookBundle:Song');
    }

    public function search(User $user)
    {
        return $this->repository->findBy([], ['name' => 'ASC']);
    }

    public function create(\stdClass $data)
    {
        return $this->update($data, new Song());
    }

    public function update(\stdClass $data, Song $song)
    {
        $this->om->persist($song);
        $this->om->flush();

        return $song;
    }

    public function delete(Song $song)
    {
        $this->om->remove($song);
        $this->om->flush();
    }
}
