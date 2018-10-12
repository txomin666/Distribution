<?php

/*
 * This file is part of the Claroline Connect package.
 *
 * (c) Claroline Consortium <consortium@claroline.net>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Claroline\CoreBundle\Listener\Resource\Types;

use Claroline\AppBundle\API\SerializerProvider;
use Claroline\AppBundle\Persistence\ObjectManager;
use Claroline\CoreBundle\Entity\Resource\AbstractResource;
use Claroline\CoreBundle\Entity\Resource\Directory;
use Claroline\CoreBundle\Entity\Resource\ResourceNode;
use Claroline\CoreBundle\Entity\Role;
use Claroline\CoreBundle\Entity\User;
use Claroline\CoreBundle\Event\CreateResourceEvent;
use Claroline\CoreBundle\Event\Resource\CopyResourceEvent;
use Claroline\CoreBundle\Event\Resource\DeleteResourceEvent;
use Claroline\CoreBundle\Event\Resource\LoadResourceEvent;
use Claroline\CoreBundle\Event\Resource\OpenResourceEvent;
use Claroline\CoreBundle\Event\Resource\ResourceActionEvent;
use Claroline\CoreBundle\Exception\ResourceAccessException;
use Claroline\CoreBundle\Library\Security\Collection\ResourceCollection;
use Claroline\CoreBundle\Manager\Resource\ResourceActionManager;
use Claroline\CoreBundle\Manager\Resource\RightsManager;
use Claroline\CoreBundle\Manager\ResourceManager;
use JMS\DiExtraBundle\Annotation as DI;
use Symfony\Bundle\TwigBundle\TwigEngine;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

/**
 * Integrates the "Directory" resource.
 *
 * @DI\Service
 */
class DirectoryListener
{
    /** @var TokenStorageInterface */
    private $tokenStorage;

    /** @var TwigEngine */
    private $templating;

    /** @var SerializerProvider */
    private $serializer;

    /** @var ResourceManager */
    private $resourceManager;

    /** @var RightsManager */
    private $rightsManager;

    /**
     * DirectoryListener constructor.
     *
     * @DI\InjectParams({
     *     "tokenStorage"    = @DI\Inject("security.token_storage"),
     *     "templating"      = @DI\Inject("templating"),
     *     "om"              = @DI\Inject("claroline.persistence.object_manager"),
     *     "serializer"      = @DI\Inject("claroline.api.serializer"),
     *     "resourceManager" = @DI\Inject("claroline.manager.resource_manager"),
     *     "actionManager"   = @DI\Inject("claroline.manager.resource_action"),
     *     "rightsManager"   = @DI\Inject("claroline.manager.rights_manager")
     * })
     *
     * @param TokenStorageInterface $tokenStorage
     * @param TwigEngine            $templating
     * @param ObjectManager         $om
     * @param SerializerProvider    $serializer
     * @param ResourceManager       $resourceManager
     * @param RightsManager         $rightsManager
     * @param ResourceActionManager $actionManager
     */
    public function __construct(
        ResourceActionManager $actionManager,
        TokenStorageInterface $tokenStorage,
        TwigEngine $templating,
        ObjectManager $om,
        SerializerProvider $serializer,
        ResourceManager $resourceManager,
        RightsManager $rightsManager
    ) {
        $this->tokenStorage = $tokenStorage;
        $this->templating = $templating;
        $this->om = $om;
        $this->serializer = $serializer;
        $this->resourceManager = $resourceManager;
        $this->rightsManager = $rightsManager;
        $this->actionManager = $actionManager;
    }

    /**
     * Adds a new resource inside a directory.
     *
     * @DI\Observe("resource.directory.add")
     *
     * @param ResourceActionEvent $event
     */
    public function onAdd(ResourceActionEvent $event)
    {
        $data = $event->getData();
        $parent = $event->getResourceNode();

        $attributes['type'] = $data['resourceNode']['meta']['type'];
        $collection = new ResourceCollection([$parent]);
        $collection->setAttributes($attributes);

        $add = $this->actionManager->get($parent, 'add');

        if (!$this->actionManager->hasPermission($add, $collection)) {
            throw new ResourceAccessException($collection->getErrorsForDisplay(), $collection->getResources());
        }

        $options = $event->getOptions();

        // create the resource node

        /** @var ResourceNode $resourceNode */
        $resourceNode = $this->serializer->deserialize(ResourceNode::class, $data['resourceNode'], $options);
        $resourceNode->setParent($parent);
        $resourceNode->setWorkspace($parent->getWorkspace());
        if ($this->tokenStorage->getToken()->getUser() instanceof User) {
            $resourceNode->setCreator($this->tokenStorage->getToken()->getUser());
        }

        // initialize custom resource Entity
        $resourceClass = $resourceNode->getResourceType()->getClass();

        /** @var AbstractResource $resource */
        $resource = new $resourceClass();
        if (!empty($data['resource'])) {
            $resource = $this->serializer->deserialize($resourceClass, $data['resource'], $options);
        }

        $resource->setResourceNode($resourceNode);

        // maybe do it in the serializer (if it can be done without intermediate flush)
        if (!empty($data['resourceNode']['rights'])) {
            foreach ($data['resourceNode']['rights'] as $rights) {
                /** @var Role $role */
                $role = $this->om->getRepository('ClarolineCoreBundle:Role')->findOneBy(['name' => $rights['name']]);
                $this->rightsManager->editPerms($rights['permissions'], $role, $resourceNode);
            }
        } else {
            // todo : initialize default rights
        }

        // todo : dispatch creation event

        $this->om->persist($resource);
        $this->om->persist($resourceNode);

        $this->om->flush();

        // todo : dispatch get/load action instead
        $event->setResponse(new JsonResponse(
            [
                'resourceNode' => $this->serializer->serialize($resourceNode),
                'resource' => $this->serializer->serialize($resource),
            ],
            201
        ));
    }

    /**
     * Creates a new directory.
     *
     * @DI\Observe("resource.directory.create")
     *
     * @param CreateResourceEvent $event
     */
    public function onCreate(CreateResourceEvent $event)
    {
        $event->stopPropagation();
    }

    /**
     * Loads a directory.
     *
     * @DI\Observe("resource.directory.load")
     *
     * @param LoadResourceEvent $event
     */
    public function onLoad(LoadResourceEvent $event)
    {
        $event->setData([
            'directory' => $this->serializer->serialize($event->getResource()),
        ]);

        $event->stopPropagation();
    }

    /**
     * Opens a directory.
     *
     * @DI\Observe("open_directory")
     *
     * @param OpenResourceEvent $event
     */
    public function onOpen(OpenResourceEvent $event)
    {
        $directory = $event->getResource();

        $content = $this->templating->render(
            'ClarolineCoreBundle:directory:index.html.twig', [
                'directory' => $directory,
                '_resource' => $directory,
            ]
        );

        $response = new Response($content);
        $event->setResponse($response);

        $event->stopPropagation();
    }

    /**
     * Removes a directory.
     *
     * @DI\Observe("delete_directory")
     *
     * @param deleteResourceEvent $event
     */
    public function onDelete(DeleteResourceEvent $event)
    {
        $event->stopPropagation();
    }

    /**
     * Copies a directory.
     *
     * @DI\Observe("copy_directory")
     *
     * @param copyResourceEvent $event
     */
    public function onCopy(CopyResourceEvent $event)
    {
        $resourceCopy = new Directory();

        // TODO : implement

        $event->setCopy($resourceCopy);
    }
}
