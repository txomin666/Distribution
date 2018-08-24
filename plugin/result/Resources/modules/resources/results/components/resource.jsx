import React from 'react'

import {RoutedPageContent} from '#/main/core/layout/router'
import {ResourcePage} from '#/main/core/resource/containers/page'

import {Player} from '#/plugin/result/resources/results/player/components/player'
import {Editor} from '#/plugin/result/resources/results/editor/components/editor'

const ResultResource = () =>
  <ResourcePage>
    <RoutedPageContent
      headerSpacer={true}
      routes={[
        {
          path: '/',
          component: Player,
          exact: true
        }, {
          path: '/edit',
          component: Editor
        }
      ]}
    />
  </ResourcePage>

export {
  ResultResource
}
