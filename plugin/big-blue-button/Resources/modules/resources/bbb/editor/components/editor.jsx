import React from 'react'
import {connect} from 'react-redux'
import {PropTypes as T} from 'prop-types'

import {trans} from '#/main/core/translation'
import {CALLBACK_BUTTON, LINK_BUTTON} from '#/main/app/buttons'
import {FormData} from '#/main/app/content/form/containers/data'
import {actions as formActions} from '#/main/app/content/form/store/actions'

import {actions, selectors} from '#/plugin/big-blue-button/resources/bbb/editor/store'

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
        callback: (bbbId) => props.saveForm(bbbId)
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
                  name: 'dates',
                  type: 'date-range',
                  label: trans('access_dates'),
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
  params: T.shape({
    id: T.number,
    roomName: T.string,
    welcomeMessage: T.string,
    newTab: T.boolean,
    moderatorRequired: T.boolean,
    record: T.boolean,
    dates: T.string
  }),
  message: T.shape({
    content: T.string,
    type: T.string
  }),
  initializeForm: T.func,
  updateForm: T.func,
  resetMessage: T.func
}

const Editor = connect(
  (state) => ({
    message: selectors.message(state)
  }),
  (dispatch) => ({
    saveForm(forumId) {
      dispatch(formActions.saveForm(selectors.FORM_NAME, ['apiv2_forum_update', {id: forumId}]))
    },
    resetMessage: () => dispatch(actions.resetMessage())
  })
)(EditorComponent)

export {
  Editor
}
