<?php

namespace Claroline\MusicInstrumentBundle\Migrations\pdo_mysql;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated migration based on mapping information: modify it with caution
 *
 * Generation date: 2016/11/27 11:38:42
 */
class Version20161127113840 extends AbstractMigration
{
    public function up(Schema $schema)
    {
        $this->addSql("
            CREATE TABLE claro_music_instrument (
                id INT AUTO_INCREMENT NOT NULL, 
                type_id INT DEFAULT NULL, 
                manufacturer VARCHAR(255) DEFAULT NULL, 
                model VARCHAR(255) DEFAULT NULL, 
                resourceNode_id INT DEFAULT NULL, 
                INDEX IDX_2D9D7CD8C54C8C93 (type_id), 
                UNIQUE INDEX UNIQ_2D9D7CD8B87FAB32 (resourceNode_id), 
                PRIMARY KEY(id)
            ) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB
        ");
        $this->addSql("
            CREATE TABLE claro_music_instrument_type (
                id INT AUTO_INCREMENT NOT NULL, 
                name VARCHAR(255) NOT NULL,
                icon VARCHAR(255) NOT NULL,
                enabled TINYINT(1) NOT NULL, 
                class_name VARCHAR(255) NOT NULL, 
                polyphonic TINYINT(1) NOT NULL, 
                PRIMARY KEY(id)
            ) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB
        ");
        $this->addSql("
            CREATE TABLE claro_music_instrument_recorder (
                id INT AUTO_INCREMENT NOT NULL, 
                instrument_id INT DEFAULT NULL, 
                fingering VARCHAR(255) NOT NULL, 
                UNIQUE INDEX UNIQ_B2D92D0FCF11D9C (instrument_id), 
                PRIMARY KEY(id)
            ) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB
        ");
        $this->addSql("
            CREATE TABLE claro_music_instrument_guitar (
                id INT AUTO_INCREMENT NOT NULL, 
                instrument_id INT DEFAULT NULL, 
                tuning_id INT DEFAULT NULL, 
                headstock VARCHAR(255) NOT NULL, 
                body VARCHAR(255) NOT NULL, 
                amplification VARCHAR(255) NOT NULL, 
                strings INT NOT NULL, 
                frets INT NOT NULL, 
                leftHanded TINYINT(1) NOT NULL, 
                UNIQUE INDEX UNIQ_240B3054CF11D9C (instrument_id), 
                INDEX IDX_240B305442776A1D (tuning_id), 
                PRIMARY KEY(id)
            ) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB
        ");
        $this->addSql("
            CREATE TABLE claro_music_instrument_piano (
                id INT AUTO_INCREMENT NOT NULL, 
                instrument_id INT DEFAULT NULL,
                keys INT NOT NULL, 
                UNIQUE INDEX UNIQ_2170A776CF11D9C (instrument_id), 
                PRIMARY KEY(id)
            ) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB
        ");
        $this->addSql("
            CREATE TABLE claro_music_instrument_drums (
                id INT AUTO_INCREMENT NOT NULL, 
                instrument_id INT DEFAULT NULL, 
                UNIQUE INDEX UNIQ_170B428ACF11D9C (instrument_id), 
                PRIMARY KEY(id)
            ) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB
        ");
        $this->addSql("
            CREATE TABLE claro_music_instrument_vocals (
                id INT AUTO_INCREMENT NOT NULL, 
                instrument_id INT DEFAULT NULL, 
                UNIQUE INDEX UNIQ_7128A16DCF11D9C (instrument_id), 
                PRIMARY KEY(id)
            ) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB
        ");
        $this->addSql("
            CREATE TABLE claro_music_tuning (
                id INT AUTO_INCREMENT NOT NULL, 
                category_id INT DEFAULT NULL, 
                type_id INT DEFAULT NULL, 
                name VARCHAR(255) NOT NULL, 
                is_default TINYINT(1) NOT NULL, 
                INDEX IDX_BF20D8012469DE2 (category_id), 
                INDEX IDX_BF20D80C54C8C93 (type_id), 
                PRIMARY KEY(id)
            ) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB
        ");
        $this->addSql("
            CREATE TABLE claro_music_tuning_category (
                id INT AUTO_INCREMENT NOT NULL, 
                name VARCHAR(255) NOT NULL, 
                PRIMARY KEY(id)
            ) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB
        ");
        $this->addSql("
            CREATE TABLE claro_music_tuning_note (
                id INT AUTO_INCREMENT NOT NULL, 
                tuning_id INT DEFAULT NULL, 
                note_id INT DEFAULT NULL, 
                note_order INT NOT NULL, 
                INDEX IDX_84A09C3542776A1D (tuning_id), 
                INDEX IDX_84A09C3526ED0855 (note_id), 
                PRIMARY KEY(id)
            ) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB
        ");
        $this->addSql("
            ALTER TABLE claro_music_instrument 
            ADD CONSTRAINT FK_2D9D7CD8C54C8C93 FOREIGN KEY (type_id) 
            REFERENCES claro_music_instrument_type (id) 
            ON DELETE CASCADE
        ");
        $this->addSql("
            ALTER TABLE claro_music_instrument 
            ADD CONSTRAINT FK_2D9D7CD8B87FAB32 FOREIGN KEY (resourceNode_id) 
            REFERENCES claro_resource_node (id) 
            ON DELETE CASCADE
        ");
        $this->addSql("
            ALTER TABLE claro_music_instrument_recorder 
            ADD CONSTRAINT FK_B2D92D0FCF11D9C FOREIGN KEY (instrument_id) 
            REFERENCES claro_music_instrument (id) 
            ON DELETE CASCADE
        ");
        $this->addSql("
            ALTER TABLE claro_music_instrument_guitar 
            ADD CONSTRAINT FK_240B3054CF11D9C FOREIGN KEY (instrument_id) 
            REFERENCES claro_music_instrument (id) 
            ON DELETE CASCADE
        ");
        $this->addSql("
            ALTER TABLE claro_music_instrument_guitar 
            ADD CONSTRAINT FK_240B305442776A1D FOREIGN KEY (tuning_id) 
            REFERENCES claro_music_tuning (id) 
            ON DELETE SET NULL
        ");
        $this->addSql("
            ALTER TABLE claro_music_instrument_piano 
            ADD CONSTRAINT FK_2170A776CF11D9C FOREIGN KEY (instrument_id) 
            REFERENCES claro_music_instrument (id) 
            ON DELETE CASCADE
        ");
        $this->addSql("
            ALTER TABLE claro_music_instrument_drums 
            ADD CONSTRAINT FK_170B428ACF11D9C FOREIGN KEY (instrument_id) 
            REFERENCES claro_music_instrument (id) 
            ON DELETE CASCADE
        ");
        $this->addSql("
            ALTER TABLE claro_music_instrument_vocals 
            ADD CONSTRAINT FK_7128A16DCF11D9C FOREIGN KEY (instrument_id) 
            REFERENCES claro_music_instrument (id) 
            ON DELETE CASCADE
        ");
        $this->addSql("
            ALTER TABLE claro_music_tuning 
            ADD CONSTRAINT FK_BF20D8012469DE2 FOREIGN KEY (category_id) 
            REFERENCES claro_music_tuning_category (id)
        ");
        $this->addSql("
            ALTER TABLE claro_music_tuning 
            ADD CONSTRAINT FK_BF20D80C54C8C93 FOREIGN KEY (type_id) 
            REFERENCES claro_music_instrument_type (id) 
            ON DELETE CASCADE
        ");
        $this->addSql("
            ALTER TABLE claro_music_tuning_note 
            ADD CONSTRAINT FK_84A09C3542776A1D FOREIGN KEY (tuning_id) 
            REFERENCES claro_music_tuning (id) 
            ON DELETE CASCADE
        ");
        $this->addSql("
            ALTER TABLE claro_music_tuning_note 
            ADD CONSTRAINT FK_84A09C3526ED0855 FOREIGN KEY (note_id) 
            REFERENCES claro_music_note (id) 
            ON DELETE CASCADE
        ");
    }

    public function down(Schema $schema)
    {
        $this->addSql("
            ALTER TABLE claro_music_instrument_recorder 
            DROP FOREIGN KEY FK_B2D92D0FCF11D9C
        ");
        $this->addSql("
            ALTER TABLE claro_music_instrument_guitar 
            DROP FOREIGN KEY FK_240B3054CF11D9C
        ");
        $this->addSql("
            ALTER TABLE claro_music_instrument_piano 
            DROP FOREIGN KEY FK_2170A776CF11D9C
        ");
        $this->addSql("
            ALTER TABLE claro_music_instrument_vocals 
            DROP FOREIGN KEY FK_7128A16DCF11D9C
        ");
        $this->addSql("
            ALTER TABLE claro_music_instrument_piano 
            DROP FOREIGN KEY FK_170B428ACF11D9C
        ");
        $this->addSql("
            ALTER TABLE claro_music_instrument 
            DROP FOREIGN KEY FK_2D9D7CD8C54C8C93
        ");
        $this->addSql("
            ALTER TABLE claro_music_tuning 
            DROP FOREIGN KEY FK_BF20D80C54C8C93
        ");
        $this->addSql("
            ALTER TABLE claro_music_instrument_guitar 
            DROP FOREIGN KEY FK_240B305442776A1D
        ");
        $this->addSql("
            ALTER TABLE claro_music_tuning_note 
            DROP FOREIGN KEY FK_84A09C3542776A1D
        ");
        $this->addSql("
            ALTER TABLE claro_music_tuning 
            DROP FOREIGN KEY FK_BF20D8012469DE2
        ");
        $this->addSql("
            DROP TABLE claro_music_instrument
        ");
        $this->addSql("
            DROP TABLE claro_music_instrument_type
        ");
        $this->addSql("
            DROP TABLE claro_music_instrument_recorder
        ");
        $this->addSql("
            DROP TABLE claro_music_instrument_guitar
        ");
        $this->addSql("
            DROP TABLE claro_music_instrument_piano
        ");
        $this->addSql("
            DROP TABLE claro_music_instrument_drums
        ");
        $this->addSql("
            DROP TABLE claro_music_instrument_vocals
        ");
        $this->addSql("
            DROP TABLE claro_music_tuning
        ");
        $this->addSql("
            DROP TABLE claro_music_tuning_category
        ");
        $this->addSql("
            DROP TABLE claro_music_tuning_note
        ");
    }
}
