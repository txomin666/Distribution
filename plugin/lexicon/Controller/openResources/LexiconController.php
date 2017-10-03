<?php

/*
 * This file is part of the Claroline Connect package.
 *
 * (c) Claroline Consortium <consortium@claroline.net>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Claroline\LexiconBundle\Controller\openResources;


use Claroline\CoreBundle\Entity\Group;
use Claroline\CoreBundle\Entity\User;
use Sensio\Bundle\FrameworkExtraBundle\Configuration as EXT;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;
use Symfony\Component\DependencyInjection\ContainerInterface;
use JMS\DiExtraBundle\Annotation as DI;



class LexiconController extends Controller
{

    /**
     * @EXT\Route(
     *     "/{path}",
     *     name="lexicon_home",
     *     requirements={
     *        "path": "home"
     *     }
     * )
     * @EXT\Method("GET")
     * @EXT\Template("ClarolineLexiconBundle:Pages:home.html.twig")
     */
    
    public function indexHome()
    {
        $user         = $this->container->get('claroline_lexicon.manager.users')->getCurrentUser();
        $data_content = $this->container->get('claroline_lexicon.manager.dictionaries')->getAllUserResources();

        return $this->render('ClarolineLexiconBundle:Pages:home.html.twig', array('data' => $data_content, 'active_user' => $user));
    }

    /**
     * @EXT\Route(
     *     "/clarouser",
     *     name="claro_login_para"
     * )
     * @EXT\Method("GET")
     * @EXT\Template("ClarolineLexiconBundle:Pages:home.html.twig")
     * Displays the message form with the "to" field filled with users of a group.
     */
    public function getLoginClaro()
    {
       $claroUserLogin          = $this->container->get('claroline_lexicon.manager.users')->getUriUser();
       $username                = $claroUserLogin[0];
       $userpassword            = $claroUserLogin[1];
       $authClaroUser           = new \stdClass();
       $authClaroUser->name     = $username;
       $authClaroUser->password = $userpassword;
       return $authClaroUser;
    }


}

