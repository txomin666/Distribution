import React from 'react'
import {PropTypes as T} from 'prop-types'
import {connect} from 'react-redux'

import {trans} from '#/main/core/translation'
import {RoutedPageContent} from '#/main/core/layout/router'
import {ResourcePage} from '#/main/core/resource/containers/page'
import {CALLBACK_BUTTON, LINK_BUTTON} from '#/main/app/buttons'

import {actions} from '#/plugin/bbb/resources/bbb/store'
import {BBBContent} from '#/plugin/bbb/resources/bbb/components/bbb-content'
import {BBBConfig} from '#/plugin/bbb/resources/bbb/components/bbb-config'

const BBBResource = props =>
  <ResourcePage
    styles={['claroline-distribution-plugin-big-blue-button-bbb']}
    editor={{
      path: '/edit',
      save: {
        disabled: false,
        action: props.validateForm
      }
    }}
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
        displayed: props.canEdit,
        callback: props.endBBB
      }
    ]}
  >
    <RoutedPageContent
      routes={[
        {
          path: '/',
          exact: true,
          component: BBBContent
        }, {
          path: '/edit',
          component: BBBConfig
        }
      ]}
    />
  </ResourcePage>

BBBResource.propTypes = {
  location: T.shape({
    pathname: T.string.isRequired
  }).isRequired,
  validateForm: T.func,
  endBBB: T.func
}

function customActions(props) {
  const actions = []

  actions.push({

  })

  if () {
    actions.push({

    })
  }

  return actions
}


export {
  BBBResource
}
