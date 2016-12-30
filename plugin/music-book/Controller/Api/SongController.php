<?php

namespace Claroline\MusicBookBundle\Controller\Api;

use Claroline\CoreBundle\Entity\User;
use Claroline\CoreBundle\Library\Security\Collection\ResourceCollection;
use Claroline\CoreBundle\Library\Validation\ValidationException;
use Claroline\MusicBookBundle\Entity\Song;
use Claroline\MusicBookBundle\Manager\SongManager;
use JMS\DiExtraBundle\Annotation as DI;
use Sensio\Bundle\FrameworkExtraBundle\Configuration as EXT;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Authorization\AuthorizationCheckerInterface;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;

/**
 * Song CRUD Controller.
 *
 * @EXT\Route("/songs", options={"expose"=true})
 */
class SongController
{
    /**
     * @var AuthorizationCheckerInterface
     */
    private $authorization;

    /**
     * @var SongManager
     */
    private $songManager;

    /**
     * SongController constructor.
     *
     * @DI\InjectParams({
     *     "authorization" = @DI\Inject("security.authorization_checker"),
     *     "songManager"   = @DI\Inject("claro_music_book.manager.song")
     * })
     *
     * @param AuthorizationCheckerInterface $authorization
     * @param SongManager                   $songManager
     */
    public function __construct(
        AuthorizationCheckerInterface $authorization,
        SongManager $songManager)
    {
        $this->authorization = $authorization;
        $this->songManager = $songManager;
    }

    /**
     * Lists all Songs.
     *
     * @EXT\Route("")
     * @EXT\Method("GET")
     *
     * @param User $user
     *
     * @return JsonResponse
     */
    public function listAction(User $user)
    {
        return new JsonResponse(
            $this->songManager->search($user)
        );
    }

    /**
     * Gets a Song entity.
     *
     * @EXT\Route("/{id}")
     * @EXT\Method("GET")
     *
     * @param Song $song
     *
     * @return JsonResponse
     */
    public function getAction(Song $song)
    {
        $this->assertHasPermission('OPEN', $song);

        return new JsonResponse($song);
    }

    /**
     * Creates a new Song.
     *
     * @EXT\Route("")
     * @EXT\Method("POST")
     *
     * @param Request $request
     *
     * @return JsonResponse
     */
    public function createAction(Request $request)
    {
        try {
            $song = $this->songManager->create($request->get('data'));

            return new JsonResponse($song);
        } catch (ValidationException $e) {
            return new JsonResponse($e->getErrors(), 422);
        }
    }

    /**
     * Edits a Song.
     *
     * @EXT\Route("/{id}")
     * @EXT\Method("PUT")
     *
     * @param Song    $song
     * @param Request $request
     *
     * @return JsonResponse
     */
    public function updateAction(Song $song, Request $request)
    {
        $this->assertHasPermission('ADMINISTRATE', $song);

        try {
            $song = $this->songManager->update($request->get('data'), $song);

            return new JsonResponse($song);
        } catch (ValidationException $e) {
            return new JsonResponse($e->getErrors(), 422);
        }
    }

    /**
     * Deletes a Song.
     *
     * @EXT\Route("/{id}")
     * @EXT\Method("DELETE")
     *
     * @param Song $song
     *
     * @return JsonResponse
     */
    public function deleteAction(Song $song)
    {
        $this->assertHasPermission('ADMINISTRATE', $song);

        $this->songManager->delete($song);

        return new JsonResponse(null, 204);
    }

    private function assertHasPermission($permission, Song $song)
    {
        $collection = new ResourceCollection([$song->getResourceNode()]);

        if (!$this->authorization->isGranted($permission, $collection)) {
            throw new AccessDeniedException($collection->getErrorsForDisplay());
        }
    }
}
