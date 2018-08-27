import {API_REQUEST} from '#/main/core/api/actions'
import {actions as formActions} from '#/main/core/data/form/actions'

export const actions = {}

actions.open = (formName, id = null, defaultProps) => {
  if (id) {
    return {
      [API_REQUEST]: {
        url: ['apiv2_plannednotificationmessage_get', {id}],
        success: (data, dispatch) => dispatch(formActions.resetForm(formName, data, false))
      }
    }
  } else {
    return formActions.resetForm(formName, defaultProps, true)
  }
}

actions.sendMessages = (messages, users) => {
  const data = {
    messages: messages.map(message => message.id),
    users: users
  }
  const formData = new FormData()
  formData.append('messagesData', JSON.stringify(data))

  return {
    [API_REQUEST]: {
      url: ['apiv2_plannednotificationmessage_messages_send'],
      request: {
        method: 'POST',
        body: formData
      }
    }
  }
}
