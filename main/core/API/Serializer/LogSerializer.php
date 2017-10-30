<?php

namespace Claroline\CoreBundle\API\Serializer;

use Claroline\CoreBundle\Model\LogInterface;
use JMS\DiExtraBundle\Annotation as DI;

/**
 * @DI\Service("claroline.serializer.log")
 * @DI\Tag("claroline.serializer")
 */
class LogSerializer
{
    use SerializerTrait;

    public function getClass()
    {
        return 'Claroline\CoreBundle\Model\LogInterface';
    }

    public function serialize(LogInterface $log, array $options = [])
    {
        return [
            'id' => $log->getId(),
        ];
    }
}
