import React from 'react'
import {PropTypes as T} from 'prop-types'
import {connect} from 'react-redux'

import {trans} from '#/main/core/translation'
import {LINK_BUTTON} from '#/main/app/buttons'
import {FormData} from '#/main/app/content/form/containers/data'
import {selectors as formSelect} from '#/main/app/content/form/store/selectors'

import {selectors} from '#/plugin/result/resources/results/editor/store/selectors'

const EditorComponent = (props) =>
  <FormData
    name={selectors.FORM_NAME}
    target={['apiv2_result_update', {id:props.resultForm.id}]}
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

EditorComponent.propTypes = {
  resultForm: T.shape({
    id: T.string.isRequired
  }).isRequired
}

const Editor = connect(
  (state) => ({
    resultForm: formSelect.data(formSelect.form(state, selectors.FORM_NAME))
  })
)(EditorComponent)

export {
  Editor
}
