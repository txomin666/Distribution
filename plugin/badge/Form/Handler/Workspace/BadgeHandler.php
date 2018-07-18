<?php

namespace Icap\BadgeBundle\Form\Handler\Workspace;

use Claroline\CoreBundle\Library\Utilities\FileUtilities;
use Doctrine\ORM\EntityManager;
use Icap\BadgeBundle\Entity\Badge;
use Icap\BadgeBundle\Form\Type\BadgeType;
use Icap\BadgeBundle\Manager\BadgeManager;
use JMS\DiExtraBundle\Annotation as DI;
use Symfony\Component\Form\FormFactoryInterface;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\RequestStack;

/**
 * @DI\Service("icap_badge.form_handler.badge.workspace")
 */
class BadgeHandler
{
    /**
     * @var FormInterface
     */
    protected $form;

    /**
     * @var Request
     */
    protected $request;

    /**
     * @var EntityManager
     */
    protected $entityManager;

    /**
     * @var BadgeManager
     */
    protected $badgeManager;

    protected $uploadDir;

    /**
     * @DI\InjectParams({
     *     "formFactory"   = @DI\Inject("form.factory"),
     *     "request"       = @DI\Inject("request_stack"),
     *     "entityManager" = @DI\Inject("doctrine.orm.entity_manager"),
     *     "badgeManager"  = @DI\Inject("icap_badge.manager.badge"),
     *     "webDir"        = @DI\Inject("%claroline.param.web_directory%"),
     *     "fu"            = @DI\Inject("claroline.utilities.file")
     * })
     *
     * @param $formFactory
     * @param RequestStack  $request
     * @param EntityManager $entityManager
     * @param BadgeManager  $badgeManager
     * @param string        $webDir
     * @param FileUtilities $fu
     */
    public function __construct(
       FormFactoryInterface $formFactory,
       RequestStack $request,
       EntityManager $entityManager,
       BadgeManager $badgeManager,
       $webDir,
       FileUtilities $fu
     ) {
        $this->form = $formFactory->create(BadgeType::class);
        $this->request = $request->getMasterRequest();
        $this->entityManager = $entityManager;
        $this->badgeManager = $badgeManager;
        $this->webDir = $webDir;
        $this->uploadDir = $webDir.DIRECTORY_SEPARATOR.Badge::getUploadDir();
        $this->fu = $fu;
    }

    /**
     * @param Badge $badge
     *
     * @return bool True on successfull processing, false otherwise
     */
    public function handleAdd(Badge $badge)
    {
        $this->form->setData($badge);

        if ($this->request->isMethod('POST')) {
            $this->form->submit($this->request);

            if ($this->form->isValid()) {
                $badge->setUuid(uniqid('', true));
                $this->handleUpload($this->form->get('file')->getData(), $badge);
                $this->entityManager->persist($badge);
                $this->entityManager->flush();

                return true;
            }
        }

        return false;
    }

    /**
     * @param Badge $badge
     *
     * @return bool True on successfull processing, false otherwise
     */
    public function handleEdit(Badge $badge, $badgeManager = null, $unawardBadge = false)
    {
        $this->form->setData($badge);

        /** @var BadgeRule[]|\Doctrine\Common\Collections\ArrayCollection $originalRules */
        $originalRules = $badge->getRules();

        if ($this->request->isMethod('POST')) {
            $this->form->handleRequest($this->request);

            if ($this->form->isValid()) {
                $this->handleUpload($this->form->get('file')->getData(), $badge);
                $badgeRules = $badge->getRules();

                $userBadges = $badge->getUserBadges();

                if (0 < count($userBadges) && $this->badgeManager->isRuleChanged($badgeRules, $originalRules)) {
                    /** @var \Doctrine\ORM\UnitOfWork $unitOfWork */
                    $unitOfWork = $this->entityManager->getUnitOfWork();

                    $newBadge = clone $badge;
                    $newBadge->setVersion($badge->getVersion() + 1);

                    $unitOfWork->refresh($badge);

                    $badge->setDeletedAt(new \DateTime());

                    $this->entityManager->persist($newBadge);

                    // If the new badge has to be revoked from users already awarded, skip the next part
                    if (!$unawardBadge) {
                        foreach ($userBadges as $userBadge) {
                            // Award new version to previous users
                            $badgeManager->addBadgeToUser($newBadge, $userBadge->getUser());
                        }
                    }
                } else {
                    // Compute which rules was deleted
                    foreach ($badgeRules as $rule) {
                        if ($originalRules->contains($rule)) {
                            $originalRules->removeElement($rule);
                        }
                    }

                    // Delete rules
                    foreach ($originalRules as $rule) {
                        $this->entityManager->remove($rule);
                    }
                }

                $this->entityManager->persist($badge);
                $this->entityManager->flush();

                return true;
            }
        }

        return false;
    }

    public function handleDelete(Badge $badge)
    {
        $ds = DIRECTORY_SEPARATOR;
        $imagePath = $badge->getImagePath();

        $this->entityManager->remove($badge);
        $this->entityManager->flush();

        if (null !== $imagePath && file_exists($this->uploadDir.$ds.$imagePath)) {
            @unlink($this->uploadDir.$ds.$imagePath);
        }
    }

    private function handleUpload(UploadedFile $file = null, Badge $badge)
    {
        if ($file) {
            $publicFile = $this->fu->createFile($file, $file->getBasename());
            $this->fu->createFileUse($publicFile, 'Icap\BadgeBundle\Entity\Badge', $badge->getUuid());
            $badge->setImagePath($publicFile->getUrl());
        }
    }
}
