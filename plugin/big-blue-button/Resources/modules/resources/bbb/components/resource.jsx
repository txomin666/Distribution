import React from 'react'
import {PropTypes as T} from 'prop-types'

import {trans} from '#/main/core/translation'
import {RoutedPageContent} from '#/main/core/layout/router'
import {ResourcePage} from '#/main/core/resource/containers/page'
import {CALLBACK_BUTTON, LINK_BUTTON} from '#/main/app/buttons'

import {Player} from '#/plugin/big-blue-button/resources/bbb/player/components/player'
import {Editor} from '#/plugin/big-blue-button/resources/bbb/editor/components/editor'

const BBBResource = props =>
  <ResourcePage
    styles={['claroline-distribution-plugin-big-blue-button-bbb']}
    customActions={[
      {
        type: LINK_BUTTON,
        icon: 'fa fa-fw fa-home',
        label: trans('claroline_big_blue_button', {}, 'resource'),
        target: '/',
        exact: true
      }, {
        type: CALLBACK_BUTTON,
        icon: 'fa fa-fw fa-stop-circle',
        label: trans('bbb_end', {}, 'bbb'),
        displayed: props.editable,
        callback: props.endBBB
      }
    ]}
  >
    <RoutedPageContent
      routes={[
        {
          path: '/',
          exact: true,
          component: Player
        }, {
          path: '/edit',
          component: Editor
        }
      ]}
    />
  </ResourcePage>

BBBResource.propTypes = {
  location: T.shape({
    pathname: T.string.isRequired
  }).isRequired,
  validateForm: T.func,
  endBBB: T.func,
  editable: T.bool.isRequired
}

export {
  BBBResource
}
