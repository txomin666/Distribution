import React from 'react'

import {Router, Routes} from '#/main/app/router'

import {SourceList} from '#/main/authentication/administration/external-synchronization/source-list/components/list'
import {SourceEditor} from '#/main/authentication/administration/external-synchronization/source-editor/components/editor'

const Configuration = () =>
  <Router>
    <Routes
      routes={[
        {
          path: '/',
          exact: true,
          component: SourceList
        }, {
          path: '/edit/:id?',
          component: SourceEditor
        }
      ]}
    />
  </Router>

export {
  Configuration as ExternalSyncConfiguration
}
