<?php

/*
 * This file is part of the Claroline Connect package.
 *
 * (c) Claroline Consortium <consortium@claroline.net>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Claroline\CoreBundle\Persistence\Adapter;

use Claroline\CoreBundle\Document\Log as MongoLog;
use Claroline\CoreBundle\Entity\Log\Log as MySqlLog;
use Claroline\CoreBundle\Model\Log as ModelLog;
use Claroline\CoreBundle\Model\LogInterface;
use Claroline\CoreBundle\Persistence\AdapterInterface;
use Claroline\CoreBundle\Persistence\ObjectManager;
use Claroline\CoreBundle\Persistence\Options;
use JMS\DiExtraBundle\Annotation as DI;

/**
 * @DI\Service("claroline.persistence.adapter.log")
 * @DI\Tag("claroline.adapter")
 */
class Log implements AdapterInterface
{
    /**
     * Finder constructor.
     *
     * @DI\InjectParams({
     *     "om" = @DI\Inject("claroline.persistence.object_manager")
     * })
     *
     * @param ObjectManager $om
     */
    public function __construct(
      ObjectManager $om
  ) {
        $this->om = $om;
    }

    //only adapt from model atm, maybe never allow the others
    public function adapt($log, $to)
    {
        $new = $to === Options::MYSQL ?
          new MySqlLog() : new MongoLog();

        return $this->migrate($log, $new);
    }

    //probably add the option here
    private function migrate(LogInterface $model, LogInterface $new)
    {
        $new->setAction($model->getAction());
        $new->setDateLog($model->getDateLog());
        $new->setDetails($model->getDetails());
        $new->setDoerType($model->getDoerType());
        $new->setDoerIp($model->getDoerIp());
        $new->setDoerSessionId($model->getDoerSessionId());
        $new->setDoer($model->getDoer());

        foreach ($model->getDoerPlatformRoles() as $doerPlatformRole) {
            $new->addDoerPlatformRole($doerPlatformRole);
        }

        foreach ($model->getDoerWorkspaceRoles() as $workspaceRole) {
            $new->addDoerWorkspaceRole($workspaceRole);
        }

        $new->setReceiver($model->getReceiver());
        $new->setReceiverGroup($model->getReceiverGroup());
        $new->setOwner($model->getOwner());
        $new->setWorkspace($model->getWorkspace());
        $new->setResourceNode($model->getResourceNode());
        $new->setResourceType($model->getResourceType());
        $new->setRole($model->getRole());
        $new->setToolName($model->getToolName());
        $new->setIsDisplayedInAdmin($model->isDisplayedInAdmin());
        $new->setIsDisplayedInWorkspace($model->isDisplayedInWorkspace());
        $new->setOtherElementId($model->getOtherElementId());

        return $new;
    }

    /**
     * Depending on how we store datas (serialized data for mongodb)
     * this might not be (as) usefull
     * as it is now (because serialization could be already done).
     */
    public function fromMongo($model)
    {
        $new = new ModelLog();

        $new->setAction($model->getAction());
        $new->setDateLog($model->getDateLog());
        $new->setDetails($model->getDetails());
        $new->setDoerType($model->getDoerType());
        $new->setDoerIp($model->getDoerIp());
        $new->setDoerSessionId($model->getDoerSessionId());
        $new->setDoer($this->find('ClarolineCoreBundle:User', 'findOneByUuid', $model->getDoer()));

        foreach ($model->getDoerPlatformRoles() as $doerPlatformRole) {
            $role = $this->find('ClarolineCoreBundle:Role', 'findOneByUuid', $doerPlatformRole);
            if ($role) {
                $new->addDoerPlatformRole($role);
            }
        }

        foreach ($model->getDoerWorkspaceRoles() as $workspaceRole) {
            $role = $this->find('ClarolineCoreBundle:Role', 'findOneByUuid', $workspaceRole);
            if ($role) {
                $new->addDoerWorkspaceRole($role);
            }
        }

        $new->setReceiver($this->find('ClarolineCoreBundle:User', 'findOneByUuid', $model->getReceiver()));
        $new->setReceiverGroup($this->find('ClarolineCoreBundle:User', 'findOneByUuid', $model->getReceiverGroup()));
        $new->setOwner($this->find('ClarolineCoreBundle:User', 'findOneByUuid', $model->getOwner()));
        $new->setWorkspace($this->find('ClarolineCoreBundle:Workspace\Workspace', 'findOneByGuid', $model->getWorkspace()));
        $new->setResourceNode($this->find('ClarolineCoreBundle:Resource\ResourceNode', 'findOneByGuid', $model->getResourceNode()));
        $new->setResourceType($this->find('ClarolineCoreBundle:Resource\ResourceType', 'findOneByName', $model->getResourceType()));
        $new->setRole($this->find('ClarolineCoreBundle:Role', 'findOneByUuid', $model->getRole()));
        $new->setToolName($model->getToolName());
        $new->setIsDisplayedInAdmin($model->isDisplayedInAdmin());
        $new->setIsDisplayedInWorkspace($model->isDisplayedInWorkspace());
        $new->setOtherElementId($model->getOtherElementId());

        return $new;
        //some database fetches will be required at this point
    }

    public function fromMySql($log)
    {
        $model = new ModelLog();

        return $this->migrate($log, $model);
    }

    //maybe use getModel instead
    public function getInterface()
    {
        return 'Claroline\CoreBundle\Model\LogInterface';
    }

    public function getDocumentClass()
    {
        return 'Claroline\CoreBundle\Document\Log';
    }

    public function getEntityClass()
    {
        return 'Claroline\CoreBundle\Entity\Log\Log';
    }

    private function find($class, $method, $value)
    {
        if ($value) {
            return $this->om->getRepository($class)->$method($value);
        }
    }
}
