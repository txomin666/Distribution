<?php

namespace Claroline\CoreBundle\Migrations\pdo_mysql;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated migration based on mapping information: modify it with caution.
 *
 * Generation date: 2018/09/03 02:32:23
 */
class Version20180903143222 extends AbstractMigration
{
    public function up(Schema $schema)
    {
        $this->addSql('
            ALTER TABLE claro_workspace
            DROP FOREIGN KEY FK_D9028545FDFF2E92
        ');
        $this->addSql('
            DROP INDEX IDX_D9028545FDFF2E92 ON claro_workspace
        ');
        $this->addSql('
            ALTER TABLE claro_workspace
            ADD poster VARCHAR(255) DEFAULT NULL,
            ADD thumbnail VARCHAR(255) DEFAULT NULL,
            DROP thumbnail_id
        ');
    }

    public function down(Schema $schema)
    {
        $this->addSql('
            ALTER TABLE claro_workspace 
            ADD thumbnail_id INT DEFAULT NULL,
            DROP poster,
            DROP thumbnail
        ');
        $this->addSql('
            ALTER TABLE claro_workspace
            ADD CONSTRAINT FK_D9028545FDFF2E92 FOREIGN KEY (thumbnail_id)
            REFERENCES claro_public_file (id)
            ON DELETE SET NULL
        ');
        $this->addSql('
            CREATE INDEX IDX_D9028545FDFF2E92 ON claro_workspace (thumbnail_id)
        ');
    }
}
