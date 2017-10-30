<?php

namespace Claroline\CoreBundle\Command\DatabaseIntegrity;

use Claroline\CoreBundle\Persistence\Options;
use Symfony\Bundle\FrameworkBundle\Command\ContainerAwareCommand;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;

class LogMigrationCommand extends ContainerAwareCommand
{
    const BATCH_SIZE = 500;

    protected function configure()
    {
        $this->setName('claroline:log:migrate')
            ->setDescription('Migrate logs to a mongodb database');

        $this->addOption(
            'force',
            'f',
            InputOption::VALUE_NONE,
            'When set to true, it will actually migrate everything'
        );
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $om = $this->getContainer()->get('claroline.persistence.object_manager');
        $dm = $this->getContainer()->get('doctrine_mongodb.odm.document_manager');
        $count = $om->count('Claroline\CoreBundle\Entity\Log\Log');
        $output->writeLn("{$count} rows to migrate");
        $adapter = $this->getContainer()->get('claroline.persistence.adapter');
        $logAdapter = $adapter->get('Claroline\CoreBundle\Model\LogInterface');

        if (!$input->getOption('force')) {
            $output->writeLn('Use --force to start the migration.');

            return;
        }

        //asks for confirmation and check it's possible

        //2nd step: fetch logs (with batches)
        $i = 0;
        $repo = $om->getRepository('Claroline\CoreBundle\Entity\Log\Log');

        while ($i < $count) {
            $logs = $repo->findBy([], null, self::BATCH_SIZE, $i);

            foreach ($logs as $log) {
                $model = $logAdapter->fromMySql($log);
                $dm->persist($logAdapter->adapt($model, Options::MONGO));
                ++$i;
                $output->writeLn("{$i}/{$count} persisted !");
            }
            $output->writeLn('Flushing...');
            $dm->flush();
        }
    }
}
