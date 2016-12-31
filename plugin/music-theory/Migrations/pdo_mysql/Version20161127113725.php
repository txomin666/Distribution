<?php

namespace Claroline\MusicTheoryBundle\Migrations\pdo_mysql;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated migration based on mapping information: modify it with caution
 *
 * Generation date: 2016/11/27 11:37:27
 */
class Version20161127113725 extends AbstractMigration
{
    public function up(Schema $schema)
    {
        $this->addSql("
            CREATE TABLE claro_music_chord (
                id INT AUTO_INCREMENT NOT NULL, 
                name VARCHAR(255) NOT NULL, 
                notesCount INT NOT NULL, 
                symbol VARCHAR(255) NOT NULL, 
                PRIMARY KEY(id)
            ) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB
        ");
        $this->addSql("
            CREATE TABLE claro_music_chord_interval (
                chord_id INT NOT NULL, 
                interval_id INT NOT NULL, 
                INDEX IDX_604D2F39D4EB08E5 (chord_id), 
                INDEX IDX_604D2F39505A342E (interval_id), 
                PRIMARY KEY(chord_id, interval_id)
            ) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB
        ");
        $this->addSql("
            CREATE TABLE claro_music_chord_grid (
                id INT AUTO_INCREMENT NOT NULL, 
                resourceNode_id INT DEFAULT NULL, 
                UNIQUE INDEX UNIQ_7BBD81D4B87FAB32 (resourceNode_id), 
                PRIMARY KEY(id)
            ) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB
        ");
        $this->addSql("
            CREATE TABLE claro_music_degree (
                id INT AUTO_INCREMENT NOT NULL, 
                name VARCHAR(255) NOT NULL, 
                symbol VARCHAR(255) NOT NULL, 
                PRIMARY KEY(id)
            ) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB
        ");
        $this->addSql("
            CREATE TABLE claro_music_interval (
                id INT AUTO_INCREMENT NOT NULL, 
                name VARCHAR(255) NOT NULL, 
                symbol VARCHAR(255) NOT NULL, 
                number INT NOT NULL, 
                quality VARCHAR(255) NOT NULL, 
                value INT NOT NULL, 
                PRIMARY KEY(id)
            ) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB
        ");
        $this->addSql("
            CREATE TABLE claro_music_note (
                id INT AUTO_INCREMENT NOT NULL, 
                info_id INT DEFAULT NULL, 
                previous_id INT DEFAULT NULL, 
                next_id INT DEFAULT NULL, 
                note_value INT NOT NULL, 
                octave INT NOT NULL, 
                frequency DOUBLE PRECISION NOT NULL, 
                midi INT NOT NULL, 
                INDEX IDX_F90575D55D8BC1F8 (info_id), 
                UNIQUE INDEX UNIQ_F90575D52DE62210 (previous_id), 
                UNIQUE INDEX UNIQ_F90575D5AA23F6C8 (next_id), 
                PRIMARY KEY(id)
            ) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB
        ");
        $this->addSql("
            CREATE TABLE claro_music_note_info (
                id INT AUTO_INCREMENT NOT NULL, 
                sharp_name VARCHAR(10) NOT NULL, 
                flat_name VARCHAR(10) NOT NULL, 
                accidental TINYINT(1) NOT NULL, 
                color VARCHAR(255) NOT NULL, 
                PRIMARY KEY(id)
            ) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB
        ");
        $this->addSql("
            CREATE TABLE claro_music_scale (
                id INT AUTO_INCREMENT NOT NULL, 
                name VARCHAR(255) NOT NULL, 
                PRIMARY KEY(id)
            ) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB
        ");
        $this->addSql("
            ALTER TABLE claro_music_chord_interval 
            ADD CONSTRAINT FK_B41E83BDD4EB08E5 FOREIGN KEY (chord_id) 
            REFERENCES claro_music_chord (id)
        ");
        $this->addSql("
            ALTER TABLE claro_music_chord_interval 
            ADD CONSTRAINT FK_B41E83BD505A342E FOREIGN KEY (interval_id) 
            REFERENCES claro_music_interval (id)
        ");
        $this->addSql("
            ALTER TABLE claro_music_chord_grid 
            ADD CONSTRAINT FK_7BBD81D4B87FAB32 FOREIGN KEY (resourceNode_id) 
            REFERENCES claro_resource_node (id) 
            ON DELETE CASCADE
        ");
        $this->addSql("
            ALTER TABLE claro_music_note 
            ADD CONSTRAINT FK_F90575D55D8BC1F8 FOREIGN KEY (info_id) 
            REFERENCES claro_music_note_info (id) 
            ON DELETE SET NULL
        ");
        $this->addSql("
            ALTER TABLE claro_music_note 
            ADD CONSTRAINT FK_F90575D52DE62210 FOREIGN KEY (previous_id) 
            REFERENCES claro_music_note (id) 
            ON DELETE SET NULL
        ");
        $this->addSql("
            ALTER TABLE claro_music_note 
            ADD CONSTRAINT FK_F90575D5AA23F6C8 FOREIGN KEY (next_id) 
            REFERENCES claro_music_note (id) 
            ON DELETE SET NULL
        ");
    }

    public function down(Schema $schema)
    {
        $this->addSql("
            ALTER TABLE claro_music_chord_interval 
            DROP FOREIGN KEY FK_B41E83BDD4EB08E5
        ");
        $this->addSql("
            ALTER TABLE claro_music_chord_interval 
            DROP FOREIGN KEY FK_B41E83BD505A342E
        ");
        $this->addSql("
            ALTER TABLE claro_music_note 
            DROP FOREIGN KEY FK_F90575D52DE62210
        ");
        $this->addSql("
            ALTER TABLE claro_music_note 
            DROP FOREIGN KEY FK_F90575D5AA23F6C8
        ");
        $this->addSql("
            ALTER TABLE claro_music_note 
            DROP FOREIGN KEY FK_F90575D55D8BC1F8
        ");
        $this->addSql("
            DROP TABLE claro_music_chord
        ");
        $this->addSql("
            DROP TABLE claro_music_chord_interval
        ");
        $this->addSql("
            DROP TABLE claro_music_chord_grid
        ");
        $this->addSql("
            DROP TABLE claro_music_degree
        ");
        $this->addSql("
            DROP TABLE claro_music_interval
        ");
        $this->addSql("
            DROP TABLE claro_music_note
        ");
        $this->addSql("
            DROP TABLE claro_music_note_info
        ");
        $this->addSql("
            DROP TABLE claro_music_scale
        ");
    }
}