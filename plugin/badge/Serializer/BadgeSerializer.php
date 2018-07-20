<?php

namespace Icap\BadgeBundle\Serializer;

use Claroline\AppBundle\API\Serializer\SerializerTrait;
use Claroline\AppBundle\Persistence\ObjectManager;
use Icap\BadgeBundle\Entity\Badge;
use JMS\DiExtraBundle\Annotation as DI;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * @DI\Service("icap.serializer.badge")
 * @DI\Tag("claroline.serializer")
 */
class BadgeSerializer
{
    use SerializerTrait;

    /** @var ObjectManager */
    private $om;

    /** @var ChapterRepository */
    private $chapterRepository;

    /**
     * LessonSerializer constructor.
     *
     * @DI\InjectParams({
     *     "om"        = @DI\Inject("claroline.persistence.object_manager"),
     *     "container" = @DI\Inject("service_container")
     * })
     *
     * @param ObjectManager      $om
     * @param ContainerInterface $container
     */
    public function __construct(ObjectManager $om, ContainerInterface $container)
    {
        $this->om = $om;
        $this->chapterRepository = $container->get('doctrine.orm.entity_manager')->getRepository('IcapLessonBundle:Chapter');
    }

    /**
     * @return string
     */
    public function getClass()
    {
        return 'Icap\BadgeBundle\Entity\Badge';
    }

    /**
     * @return string
     */
    public function getSchema()
    {
        return '#/plugin/badge/badge.json';
    }

    /**
     * Serializes a Badge entity for the JSON api.
     *
     * @param Badge $badge   - the Badge entity to serialize
     * @param array $options - a list of serialization options
     *
     * @return array - the serialized representation of the Lesson resource
     */
    public function serialize(Badge $badge, array $options = [])
    {
        return [
            'id' => $badge->getUuid(),
            'version' => $badge->getVersion(),
            'imagePath' => $badge->getImagePath(),
            //TODO: serialize contained entities
            'userBadges' => null,
            'badgeClaims' => null,
            'translations' => null,
        ];
    }

    /**
     * @param array        $data
     * @param Badge | null $badge
     *
     * @return Badge - The deserialized badge entity
     */
    public function deserialize($data, Badge $badge = null)
    {
        if (empty($badge)) {
            $badge = new Badge();
            $badge->refreshUuid();
        }

        //TODO: sipe

        return $badge;
    }
}
