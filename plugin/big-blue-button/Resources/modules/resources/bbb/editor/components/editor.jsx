import React from 'react'
import {connect} from 'react-redux'
import {PropTypes as T} from 'prop-types'

import {trans, t} from '#/main/core/translation'
import {CALLBACK_BUTTON, LINK_BUTTON} from '#/main/app/buttons'
import {FormData} from '#/main/app/content/form/containers/data'
import {selectors as formSelect} from '#/main/app/content/form/store/selectors'

import {actions} from '#/plugin/big-blue-button/resources/bbb/editor/store'
import {selectors} from '#/plugin/big-blue-button/resources/bbb/store'

const EditorComponent = (props) =>
  <div>
    {props.message && props.message.content &&
      <div className={`alert alert-${props.message.type}`}>
        <i
          className="fa fa-times close"
          onClick={() => props.resetMessage()}
        >
        </i>
        {props.message.content}
      </div>
    }
    <FormData
      level={3}
      displayLevel={2}
      name={selectors.FORM_NAME}
      title={trans('parameters')}
      className="content-container"
      buttons={true}
      save={{
        type: CALLBACK_BUTTON,
        callback: () => props.saveForm(props.bbbForm)
      }}
      cancel={{
        type: LINK_BUTTON,
        target: '/',
        exact: true
      }}
      sections={[
        {
          title: trans('general'),
          primary: true,
          fields: [
            {
              name: 'roomName',
              type: 'string',
              label: trans('room_name', {}, 'bbb'),
              displayed: true
            }, {
              name: 'moderatorRequired',
              type: 'boolean',
              label: trans('wait_for_moderator', {}, 'bbb'),
              displayed: true
            }, {
              name: 'record',
              type: 'boolean',
              label: trans('allow_recording', {}, 'bbb'),
              displayed: true
            }, {
              icon: 'fa fa-fw fa-info',
              title: trans('information'),
              fields: [
                {
                  name: 'welcomeMessage',
                  type: 'string',
                  label: trans('welcome_message', {}, 'bbb'),options: {
                    long: true
                  },
                  displayed: true
                }
              ]
            }, {
              icon: 'fa fa-fw fa-desktop',
              title: trans('display_parameters'),
              fields: [
                {
                  name: 'newTab',
                  type: 'boolean',
                  label: trans('open_bbb_in_new_tab', {}, 'bbb'),
                  displayed: true
                }
              ]
            }, {
              icon: 'fa fa-fw fa-key',
              title: trans('access_restrictions'),
              fields: [
                {
                  name: 'startDate',
                  type: 'date',
                  label: t('start_date'),
                  displayed: true
                }, {
                  name: 'endDate',
                  type: 'date',
                  label: t('end_date'),
                  displayed: true
                }
              ]
            }
          ]
        }
      ]}
    />
  </div>


EditorComponent.propTypes = {
  bbbForm: T.shape({
    id: T.number,
    roomName: T.string,
    welcomeMessage: T.string,
    newTab: T.boolean,
    moderatorRequired: T.boolean,
    record: T.boolean,
    startDate: T.oneOfType([T.object, T.string]),
    endDate: T.oneOfType([T.object, T.string])
  }),
  message: T.shape({
    content: T.string,
    type: T.string
  }),
  saveForm: T.func,
  resetMessage: T.func
}

const Editor = connect(
  (state) => ({
    bbbForm: formSelect.data(formSelect.form(state, selectors.FORM_NAME)),
    message: selectors.message(state)
  }),
  (dispatch) => ({
    saveForm(bbbForm) {
      dispatch(actions.saveConfig(bbbForm))
    },
    resetMessage: () => dispatch(actions.resetMessage())
  })
)(EditorComponent)

export {
  Editor
}
