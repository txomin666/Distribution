<?php

namespace Claroline\MusicBookBundle\Migrations\pdo_mysql;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated migration based on mapping information: modify it with caution.
 *
 * Generation date: 2016/11/27 11:37:11
 */
class Version20161127113707 extends AbstractMigration
{
    public function up(Schema $schema)
    {
        $this->addSql('
            CREATE TABLE claro_music_artist (
                id INT AUTO_INCREMENT NOT NULL, 
                resourceNode_id INT DEFAULT NULL, 
                UNIQUE INDEX UNIQ_AEBFD881B87FAB32 (resourceNode_id), 
                PRIMARY KEY(id)
            ) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB
        ');
        $this->addSql('
            ALTER TABLE claro_music_artist 
            ADD CONSTRAINT FK_AEBFD881B87FAB32 FOREIGN KEY (resourceNode_id) 
            REFERENCES claro_resource_node (id) 
            ON DELETE CASCADE
        ');
        $this->addSql('
            CREATE TABLE claro_music_sheet_music (
                id INT AUTO_INCREMENT NOT NULL, 
                resourceNode_id INT DEFAULT NULL, 
                UNIQUE INDEX UNIQ_DE7CE679B87FAB32 (resourceNode_id), 
                PRIMARY KEY(id)
            ) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB
        ');
        $this->addSql('
            CREATE TABLE claro_music_song (
                id INT AUTO_INCREMENT NOT NULL, 
                artist VARCHAR(255) DEFAULT NULL, 
                cover VARCHAR(255) DEFAULT NULL, 
                resourceNode_id INT DEFAULT NULL, 
                UNIQUE INDEX UNIQ_5556160B87FAB32 (resourceNode_id), 
                PRIMARY KEY(id)
            ) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB
        ');
        $this->addSql('
            CREATE TABLE claro_music_song_sheet_music (
                song_id INT NOT NULL, 
                sheet_music_id INT NOT NULL, 
                INDEX IDX_5C18AFAEA0BDB2F3 (song_id), 
                UNIQUE INDEX UNIQ_5C18AFAE8CC70837 (sheet_music_id), 
                PRIMARY KEY(song_id, sheet_music_id)
            ) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB
        ');
        $this->addSql('
            ALTER TABLE claro_music_sheet_music 
            ADD CONSTRAINT FK_DE7CE679B87FAB32 FOREIGN KEY (resourceNode_id) 
            REFERENCES claro_resource_node (id) 
            ON DELETE CASCADE
        ');
        $this->addSql('
            ALTER TABLE claro_music_song 
            ADD CONSTRAINT FK_5556160B87FAB32 FOREIGN KEY (resourceNode_id) 
            REFERENCES claro_resource_node (id) 
            ON DELETE CASCADE
        ');
        $this->addSql('
            ALTER TABLE claro_music_song_sheet_music 
            ADD CONSTRAINT FK_5C18AFAEA0BDB2F3 FOREIGN KEY (song_id) 
            REFERENCES claro_music_song (id)
        ');
        $this->addSql('
            ALTER TABLE claro_music_song_sheet_music 
            ADD CONSTRAINT FK_5C18AFAE8CC70837 FOREIGN KEY (sheet_music_id) 
            REFERENCES claro_music_sheet_music (id)
        ');
        $this->addSql('
            CREATE TABLE claro_music_song_track (
                id INT AUTO_INCREMENT NOT NULL, 
                song_id INT DEFAULT NULL, 
                instrument_id INT DEFAULT NULL, 
                name VARCHAR(255) DEFAULT NULL, 
                `order` INT NOT NULL, 
                midiFile VARCHAR(255) DEFAULT NULL, 
                midiTrack INT DEFAULT NULL, 
                INDEX IDX_A6578E6A0BDB2F3 (song_id), 
                INDEX IDX_A6578E6CF11D9C (instrument_id), 
                PRIMARY KEY(id)
            ) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB
        ');
        $this->addSql('
            ALTER TABLE claro_music_song_track 
            ADD CONSTRAINT FK_A6578E6A0BDB2F3 FOREIGN KEY (song_id) 
            REFERENCES claro_music_song (id) 
            ON DELETE CASCADE
        ');
        $this->addSql('
            ALTER TABLE claro_music_song_track 
            ADD CONSTRAINT FK_A6578E6CF11D9C FOREIGN KEY (instrument_id) 
            REFERENCES claro_music_instrument (id) 
            ON DELETE CASCADE
        ');
    }

    public function down(Schema $schema)
    {
        $this->addSql('
            DROP TABLE claro_music_song_track
        ');
        $this->addSql('
            ALTER TABLE claro_music_song_sheet_music 
            DROP FOREIGN KEY FK_5C18AFAE8CC70837
        ');
        $this->addSql('
            ALTER TABLE claro_music_song_sheet_music 
            DROP FOREIGN KEY FK_5C18AFAEA0BDB2F3
        ');
        $this->addSql('
            DROP TABLE claro_music_sheet_music
        ');
        $this->addSql('
            DROP TABLE claro_music_song
        ');
        $this->addSql('
            DROP TABLE claro_music_song_sheet_music
        ');
        $this->addSql('
            DROP TABLE claro_music_artist
        ');
    }
}
