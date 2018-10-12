import React from 'react'
import {connect} from 'react-redux'
import {PropTypes as T} from 'prop-types'

import {trans} from '#/main/core/translation'
import {ListData} from '#/main/app/content/list/containers/data'
import {CALLBACK_BUTTON, LINK_BUTTON} from '#/main/app/buttons'
import {MODAL_CONFIRM} from '#/main/app/modals/confirm'
import {actions as modalActions} from '#/main/app/overlay/modal/store'

import {MessageCard} from '#/plugin/message/data/components/message-card'
import {actions} from '#/plugin/message/tools/messaging/store'

const ReceivedMessagesComponent = (props) =>
  <ListData
    title={trans('messages_received', {}, 'message')}
    name="receivedMessages"
    fetch={{
      url: ['apiv2_message_received'],
      autoload: true
    }}
    primaryAction={(message) => ({
      type: LINK_BUTTON,
      target: '/message/'+message.id,
      label: trans('open', {}, 'actions')
    })}
    definition={[
      {
        name: 'object',
        type: 'string',
        label: trans('message_form_object', {}, 'message'),
        displayed: true,
        primary: true
      }, {
        name: 'from.username',
        alias: 'senderUsername',
        type: 'string',
        label: trans('from_message', {}, 'message'),
        displayed: true,
        filterable: false,
        sortable: true
      }, {
        name: 'meta.date',
        alias: 'date',
        type: 'date',
        label: trans('date'),
        displayed: true,
        searchable: true,
        filterable: true,
        option: {
          time: true
        }
      }, {
        name: 'meta.read',
        alias: 'isRead',
        type: 'boolean',
        label: trans('message_read', {}, 'message'),
        displayed: true,
        searchable: true,
        filterable: true
      }
    ]}
    actions={(rows) => [
      {
        type: CALLBACK_BUTTON,
        icon: 'fa fa-fw fa-check',
        label: trans('marked_read_message', {}, 'message'),
        displayed: !rows[0].meta.read,
        callback: () => props.readMessages(rows)
      }, {
        type: CALLBACK_BUTTON,
        icon: 'fa fa-fw fa-times',
        label: trans('marked_unread_message', {}, 'message'),
        displayed: rows[0].meta.read,
        callback: () => props.unreadMessages(rows)
      }, {
        type: CALLBACK_BUTTON,
        icon: 'fa fa-fw fa-trash-o',
        label: trans('delete'),
        dangerous: true,
        confirm: {
          title: trans('messages_delete_title', {}, 'message'),
          message: trans('messages_delete_confirm', {}, 'message')
        },
        callback: () => props.removeMessages(rows, 'receivedMessages')
      }
    ]}
    card={(props) =>
      <MessageCard
        {...props}
        contentText={props.data.content}
      />
    }
  />

ReceivedMessagesComponent.propTypes = {
  removeMessages: T.func.isRequired,
  unreadMessages: T.func.isRequired,
  readMessages: T.func.isRequired,
  data: T.shape({
    content: T.string
  })
}

const ReceivedMessages = connect(
  null,
  dispatch => ({
    removeMessages(message, form) {
      dispatch(
        modalActions.showModal(MODAL_CONFIRM, {
          title: trans('messages_delete_title', {}, 'message'),
          question: trans('remove_message_confirm_message', {}, 'message'),
          dangerous: true,
          handleConfirm: () => dispatch(actions.removeMessages(message, form))
        })
      )
    },
    readMessages(messages) {
      dispatch(actions.readMessages(messages))
    },
    unreadMessages(messages) {
      dispatch(actions.unreadMessages(messages))
    }
  })
)(ReceivedMessagesComponent)

export {
  ReceivedMessages
}
