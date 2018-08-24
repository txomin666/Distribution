<?php

namespace Claroline\ResultBundle\Serializer;

use Claroline\AppBundle\API\FinderProvider;
use Claroline\AppBundle\API\Serializer\SerializerTrait;
use Claroline\CoreBundle\Security\PermissionCheckerTrait;
use Claroline\ResultBundle\Entity\Result;
use JMS\DiExtraBundle\Annotation as DI;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * @DI\Service("claroline.serializer.result")
 * @DI\Tag("claroline.serializer")
 */
class ResultSerializer
{
    use PermissionCheckerTrait;

    private $finder;

    /**
     * ResultSerializer constructor.
     *
     * @DI\InjectParams({
     *     "container" = @DI\Inject("service_container")
     * })
     *
     * @param FinderProvider $finder
     */
    public function __construct(ContainerInterface $container)
    {
        $this->container = $container;
    }

    use SerializerTrait;

    public function getClass()
    {
        return Result::class;
    }

    /**
     * Serializes a Result entity.
     *
     * @param Result $result
     * @param array  $options
     *
     * @return array
     */
    public function serialize(Result $result, array $options = [])
    {
        return [
            'id' => $result->getUuid(),
        ];
    }

    /**
     * Deserializes data into a Result entity.
     *
     * @param array  $data
     * @param Result $result
     * @param array  $options
     *
     * @return Result
     */
    public function deserialize($data, Result $result, array $options = [])
    {
    }
}
