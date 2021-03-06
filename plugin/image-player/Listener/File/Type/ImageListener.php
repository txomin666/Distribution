<?php

/*
 * This file is part of the Claroline Connect package.
 *
 * (c) Claroline Consortium <consortium@claroline.net>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Claroline\ImagePlayerBundle\Listener\File\Type;

use Claroline\CoreBundle\Event\Resource\File\LoadFileEvent;
use JMS\DiExtraBundle\Annotation as DI;

/**
 * Integrates Image files into Claroline.
 *
 * @DI\Service
 */
class ImageListener
{
    /**
     * @DI\Observe("file.image.load")
     *
     * @param LoadFileEvent $event
     */
    public function onLoad(LoadFileEvent $event)
    {
        // setting empty data let the dispatcher know there is
        // a player for pdf but it doesn't require any additional data
        // without it, the dispatcher will try to find a player for "application/*"
        $event->setData([]);
        $event->stopPropagation();
    }
}
