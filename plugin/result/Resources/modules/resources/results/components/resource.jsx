import React from 'react'
import {PropTypes as T} from 'prop-types'

import {trans} from '#/main/core/translation'
import {RoutedPageContent} from '#/main/core/layout/router'
import {ResourcePage} from '#/main/core/resource/containers/page'
import {CALLBACK_BUTTON} from '#/main/app/buttons'

import {Player} from '#/plugin/result/resources/results/player/components/player'
import {Editor} from '#/plugin/result/resources/results/editor/components/editor'

const ResultResource = (props) =>
  <ResourcePage
    customActions={[
      {
        type: CALLBACK_BUTTON,
        icon: 'fa fa-fw fa-file-import',
        label: trans('marks.import', {}, 'results'),
        displayed: props.editable,
        callback: () => console.log('import csv')
      }
    ]}
  >
    <RoutedPageContent
      headerSpacer={true}
      routes={[
        {
          path: '/',
          component: Player,
          exact: true
        }, {
          path: '/edit',
          component: Editor,
          disabled: !props.editable
        }
      ]}
    />
  </ResourcePage>

export {
  ResultResource
}
