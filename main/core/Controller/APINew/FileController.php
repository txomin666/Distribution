<?php

/*
 * This file is part of the Claroline Connect package.
 *
 * (c) Claroline Consortium <consortium@claroline.net>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Claroline\CoreBundle\Controller\APINew;

use Claroline\AppBundle\Annotations\ApiMeta;
use Claroline\AppBundle\Controller\AbstractCrudController;
use Claroline\AppBundle\Event\StrictDispatcher;
use Sensio\Bundle\FrameworkExtraBundle\Configuration as EXT;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

/**
 * Manages platform uploaded files... sort of.
 *
 * @ApiMeta(
 *     class="Claroline\CoreBundle\Entity\File\PublicFile",
 *     ignore={"update", "exist", "list", "copyBulk"}
 * )
 * @EXT\Route("/publicfile")
 */
class FileController extends AbstractCrudController
{
    /**
     * @EXT\Route(
     *    "/upload",
     *    name="apiv2_file_upload",
     *    options={ "method_prefix" = false }
     * )
     * @EXT\Method("POST")
     *
     * @param Request $request
     *
     * @return JsonResponse
     */
    public function uploadAction(Request $request)
    {
        $files = $this->uploadFiles($request);
        $data = [];

        foreach ($files as $file) {
            $data[] = $this->serializer->serialize($file);
        }

        return new JsonResponse($data, 200);
    }

    private function uploadFiles(Request $request)
    {
        $files = $request->files->all();
        $handler = $request->get('handler');
        $objects = [];
        /** @var StrictDispatcher */
        $dispatcher = $this->container->get('claroline.event.event_dispatcher');

        foreach ($files as $file) {
            $object = $this->crud->create(
              'Claroline\CoreBundle\Entity\File\PublicFile',
              [],
              ['file' => $file]
          );

            $dispatcher->dispatch(strtolower('upload_file_'.$handler), 'File\UploadFile', [$object]);
            $objects[] = $object;
        }

        return $objects;
    }

    /** @return string */
    public function getName()
    {
        return 'uploadedfile';
    }
}
