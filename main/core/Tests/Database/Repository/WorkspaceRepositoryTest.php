<?php

/*
 * This file is part of the Claroline Connect package.
 *
 * (c) Claroline Consortium <consortium@claroline.net>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Claroline\CoreBundle\Repository;

use Claroline\CoreBundle\Library\Testing\RepositoryTestCase;

class WorkspaceRepositoryTest extends RepositoryTestCase
{
    public static $repo;

    public static function setUpBeforeClass()
    {
        parent::setUpBeforeClass();
        self::$repo = self::getRepository('ClarolineCoreBundle:Workspace\Workspace');

        self::createWorkspace('ws_1');
        self::createWorkspace('ws_2');
        self::createDisplayableWorkspace('ws_3', true);
        self::createDisplayableWorkspace('ws_4', false);
        self::createDisplayableWorkspace('ws_5', true);
        self::createRole('ROLE_1', self::get('ws_1'));
        self::createRole('ROLE_2', self::get('ws_2'));
        self::createRole('ROLE_BIS_2', self::get('ws_2'));
        self::createRole('ROLE_3', self::get('ws_3'));
        self::createRole('ROLE_4', self::get('ws_4'));
        self::createRole('ROLE_5', self::get('ws_5'));
        self::createRole('ROLE_ANONYMOUS');
        self::createTool('tool_1');
        self::createTool('tool_2');
        self::createWorkspaceTool(self::get('tool_1'), self::get('ws_1'), [self::get('ROLE_ANONYMOUS')], 1);
        self::createWorkspaceTool(self::get('tool_2'), self::get('ws_2'), [self::get('ROLE_2')], 1);
        self::createUser('john', [self::get('ROLE_1'), self::get('ROLE_2')], self::get('ws_1'));
        self::createLog(self::get('john'), 'workspace-tool-read', self::get('ws_1'));
        self::sleep(1); // dates involved
        self::createLog(self::get('john'), 'workspace-tool-read', self::get('ws_2'));
        self::createResourceType('t_dir', 'Directory');
        self::createDirectory('dir_1', self::get('t_dir'), self::get('john'), self::get('ws_2'));
    }

    public function testFindByUser()
    {
        $workspaces = self::$repo->findByUser(self::get('john'));
        $this->assertEquals(2, count($workspaces));
    }

    public function testCount()
    {
        $this->assertEquals(5, self::$repo->count());
    }

    public function testFindByRoles()
    {
        $workspaces = self::$repo->findByRoles(['ROLE_2', 'ROLE_ANONYMOUS']);
        $this->assertEquals(2, count($workspaces));
    }

    public function testFindByUserAndRoleNamesNotIn()
    {
        $workspaces = self::$repo->findByUserAndRoleNamesNotIn(
            self::get('john'),
            ['ROLE'],
            [self::get('ws_1')->getId()]
        );
        $this->assertEquals(1, count($workspaces));
        $this->assertEquals(self::get('ws_2'), $workspaces[0]);
    }

    public function testFindLatestWorkspaceByUser()
    {
        $workspaces = self::$repo->findLatestWorkspacesByUser(
            self::get('john'),
            ['ROLE_1', 'ROLE_2']
        );
        $this->assertEquals(2, count($workspaces));
        $this->assertEquals('ws_2', $workspaces[0]['workspace']->getName());
        $workspaces = self::$repo->findLatestWorkspacesByUser(
            self::get('john'),
            ['ROLE_1']
        );
        $this->assertEquals(1, count($workspaces));
        $this->assertEquals('ws_1', $workspaces[0]['workspace']->getName());
    }

    public function testFindWorkspacesWithMostResources()
    {
        $workspaces = self::$repo->findWorkspacesWithMostResources(10);
        $this->assertEquals(5, count($workspaces));
        $this->assertEquals('ws_2', $workspaces[0]['name']);
        $this->assertEquals(1, $workspaces[0]['total']);
    }

    public function testFindDisplayableWorkspaces()
    {
        $workspaces = self::$repo->findDisplayableWorkspaces();
        $this->assertEquals(3, count($workspaces));
        $this->assertEquals(self::get('ws_3'), $workspaces[0]);
        $this->assertEquals(self::get('ws_4'), $workspaces[1]);
        $this->assertEquals(self::get('ws_5'), $workspaces[2]);
    }

    public function testFindDisplayableWorkspacesBySearch()
    {
        $workspaces = self::$repo->findDisplayableWorkspacesBySearch('ws_3');
        $this->assertEquals(1, count($workspaces));
        $this->assertEquals(self::get('ws_3'), $workspaces[0]);
    }

    public function testFindDisplayableWorkspacesBySearchWithSeveralResults()
    {
        $workspaces = self::$repo->findDisplayableWorkspacesBySearch('ws_');
        $this->assertEquals(3, count($workspaces));
        $this->assertEquals(self::get('ws_3'), $workspaces[0]);
        $this->assertEquals(self::get('ws_4'), $workspaces[1]);
        $this->assertEquals(self::get('ws_5'), $workspaces[2]);
    }
}
