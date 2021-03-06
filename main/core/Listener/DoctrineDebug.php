<?php

namespace Claroline\CoreBundle\Listener;

use Claroline\BundleRecorder\Log\LoggableTrait;
use Doctrine\ORM\Event\OnFlushEventArgs;
use JMS\DiExtraBundle\Annotation as DI;
use Psr\Log\LoggerInterface;
use Psr\Log\LogLevel;
use Symfony\Component\DependencyInjection\ContainerAwareTrait;

/**
 * @DI\Service("claroline.doctrine.debug")
 * @DI\Tag("doctrine.event_listener", attributes={"event"="onFlush"})
 *
 * @todo merge with logger in claroline.persistence.object_manager and keep only one implementation
 *  - logging MUST BE enabled inside the claroline.persistence.object_manager
 *  - printing log MUST BE down through event listening
 */
class DoctrineDebug
{
    use ContainerAwareTrait;

    const DEBUG_NONE = 0;
    const DEBUG_CLAROLINE = 1;
    const DEBUG_ALL = 2;
    const DEBUG_VENDOR = 3;

    use LoggableTrait;

    private $activateLog;
    private $debugLevel;
    private $debugVendor;

    public function __construct()
    {
        $this->activateLog = false;
        $this->debugLevel = 0;
        $this->debugVendor = null;
    }

    /**
     * Gets all the entities to flush.
     *
     * @param OnFlushEventArgs $eventArgs Event args
     */
    public function onFlush(OnFlushEventArgs $eventArgs)
    {
        //reduce the amount of flushes to increase performances !
        //you can also activate the log from the claroline.persistence.object_manager service when you use it
        //if you want additional informations about transactions
        if ($this->activateLog) {
            $this->log('onFlush event fired !!!', LogLevel::DEBUG);

            if (self::DEBUG_NONE !== $this->debugLevel) {
                $stack = debug_backtrace();

                foreach ($stack as $call) {
                    if (isset($call['file'])) {
                        $file = $call['file'];
                        if (self::DEBUG_CLAROLINE === $this->debugLevel) {
                            if (strpos($file, 'claroline')) {
                                $this->logTrace($call);
                            }
                        } elseif (self::DEBUG_ALL === $this->debugLevel) {
                            $this->logTrace($call);
                        } elseif (self::DEBUG_VENDOR === $this->debugLevel) {
                            if (strpos($file, $this->debugVendor)) {
                                $this->logTrace($call);
                            }
                        }
                    }
                }

                $this->log('Data printed !');
            }
        }
    }

    private function logTrace(array $call)
    {
        $this->log('Function "'.$call['function'].'" was called from file '.$call['file'].' on line '.$call['line'].'.', LogLevel::DEBUG);
    }

    public function setLogger(LoggerInterface $logger)
    {
        $this->logger = $logger;

        return $this;
    }

    public function activateLog()
    {
        $this->activateLog = true;

        return $this;
    }

    public function disableLog()
    {
        $this->activateLog = false;

        return $this;
    }

    public function setDebugLevel($debugLevel)
    {
        $this->debugLevel = $debugLevel;

        return $this;
    }

    public function setVendor($string)
    {
        $this->debugVendor = $string;

        return $this;
    }
}
