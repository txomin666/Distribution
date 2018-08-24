import React from 'react'

import {trans} from '#/main/core/translation'
import {LINK_BUTTON} from '#/main/app/buttons'
import {FormData} from '#/main/app/content/form/containers/data'

import {selectors} from '#/plugin/result/resources/results/editor/store/selectors'

const Editor = () =>
  <FormData
    name={selectors.FORM_NAME}
    target={['apiv2_resource_result_update']}
    buttons={true}
    cancel={{
      type: LINK_BUTTON,
      target: '/',
      exact: true
    }}
    sections={[
      {
        title: trans('general', {}, 'platform'),
        primary: true,
        fields: [
          {
            name: 'date',
            type: 'date',
            label: trans('date_mark', {}, 'results'),
            required: true
          }, {
            name: 'total',
            type: 'number',
            label: trans('maximum_mark', {}, 'results'),
            required: true
          }
        ]
      }
    ]}
  />


export {
  Editor
}
