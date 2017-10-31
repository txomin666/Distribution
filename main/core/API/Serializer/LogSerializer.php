<?php

namespace Claroline\CoreBundle\API\Serializer;

use Claroline\CoreBundle\Model\LogInterface;
use JMS\DiExtraBundle\Annotation as DI;
use Symfony\Component\Translation\TranslatorInterface;

/**
 * @DI\Service("claroline.serializer.log")
 * @DI\Tag("claroline.serializer")
 */
class LogSerializer
{
    use SerializerTrait;

    /**
     * @DI\InjectParams({
     *     "translator" = @DI\Inject("translator")
     * })
     *
     * @param TranslatorInterface $translator
     */
    public function __construct(
      TranslatorInterface $translator
    ) {
        $this->translator = $translator;
    }

    public function getClass()
    {
        return 'Claroline\CoreBundle\Model\LogInterface';
    }

    /*
     * If it's fetched from MongoDB with already serialized objects, some chunck of this method
     * might be useless but it's not the case (yet) - SEE the NO_HYDRATE option
     */
    public function serialize(LogInterface $log, array $options = [])
    {
        $data = [
            'action' => $this->translator->trans('log_'.$log->getAction().'_shortname', [], 'log'),
            'explanation' => $this->translator->trans('log_'.$log->getAction().'_sentence', [], 'log'),
            'details' => $log->getDetails(),
            'doer' => [
              'ip' => $log->getDoerIp(),
              'type' => $log->getDoerType(),
              'session' => $log->getDoerSessionId(),
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

        $doer = $log->getDoer() ? ['username' => $log->getDoer()->getUsername()] : null;
        $data['doer']['user'] = $doer;

        if ($log->getReceiver()) {
            $receiver = ['username' => $log->getReceiver()->getUsername()];

            $data['receiver'] = $receiver;

            if ($log->getReceiverGroup()) {
                $data['receiver']['group'] = [
                    'uuid' => $log->getReceiverGroup()->getUuid(),
                    'name' => $log->getReceiverGroup()->getName(),
                ];
            }
        }

        return $data;
    }
}
