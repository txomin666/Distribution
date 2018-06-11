<?php

namespace Innova\AudioReactBundle\Manager;

use Doctrine\ORM\EntityManager;
use Innova\AudioReactBundle\Entity\MediaResource;
use JMS\DiExtraBundle\Annotation as DI;

/**
 * @DI\Service("innova_audio_react.manager.media_resource_media")
 */
class MediaManager
{
    protected $em;

    /**
     * @DI\InjectParams({
     *      "em"          = @DI\Inject("doctrine.orm.entity_manager")
     * })
     *
     * @param ContainerInterface $container
     * @param EntityManager      $em
     **/
    public function __construct(EntityManager $em)
    {
        $this->em = $em;
    }

    public function getRepository()
    {
        return $this->em->getRepository('InnovaAudioReactBundle:Media');
    }

    public function getAudioMediaUrlForAjax(MediaResource $mr)
    {
        $audio = $this->getRepository()->findOneBy(['mediaResource' => $mr, 'type' => 'audio']);

        return $audio->getUrl();
    }
}
