import React from 'react'
// import {PropTypes as T} from 'prop-types'

import {trans} from '#/main/core/translation'
import {CALLBACK_BUTTON, LINK_BUTTON} from '#/main/app/buttons'
import {FormData} from '#/main/app/content/form/containers/data'

import {selectors} from '#/plugin/big-blue-button/administration/bbb/store'


const BBBConfigForm = props =>
  <FormData
    level={3}
    displayLevel={2}
    name={selectors.FORM_NAME}
    title={trans('parameters')}
    className="content-container"
    buttons={true}
    save={{
      type: CALLBACK_BUTTON,
      callback: (bbbId) => props.saveForm(bbbId)
    }}
    cancel={{
      type: LINK_BUTTON,
      target: '/',
      exact: true
    }}
    sections={[
      {
        icon: 'fa fa-fw fa-home',
        title: trans('overview'),
        fields: [
          {
            name: 'serverUrl',
            type: 'string',
            label: trans('bbb_server_url', {}, 'bbb'),
            displayed: true
          }, {
            name: 'securitySalt',
            type: 'string',
            label: trans('security_salt', {}, 'bbb'),
            displayed: true
          }
        ]
      }
    ]}
  />

export {
  BBBConfigForm
}
