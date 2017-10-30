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
        $data = [
            'id' => $log->getId(),
            'action' => $log->getAction(),
            'details' => $log->getDetails(),
            'doer' => [
              'ip' => $log->getDoerIp(),
              'type' => $log->getDoerType(),
              'session' => $log->getDoerSessionId(),
              'uuid' => $log->getDoer(),
              'platform_roles' => [
                //list of doer roles
              ],
              'workspace_roles' => [
                //again
              ],
            ],
            'owner' => [

            ],
            'workspace' => [

            ],
            'resourceNode' => [

            ],
            'role' => [

            ],
            'tool' => [

            ],
            'is_admin' => $log->isDisplayedInAdmin(),
            'is_workspace' => $log->isDisplayedInWorkspace(),
            'other_element_id' => $log->getOtherElementId(),
        ];

        if ($log->getDateLog()) {
            $data['date'] = $log->getDateLog()->format('Y-m-d\TH:i:s');
        }

        if ($log->getReceiver()) {
            $data['receiver'] = [
              'uuid' => $log->getReceiver(),
              'group' => $log->getReceiver()->getGroup()->getName(),
          ];
        }

        return $data;
    }
}
