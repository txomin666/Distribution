import {trans} from '#/main/core/translation'
import {makeActionCreator} from '#/main/app/store/actions'
import {API_REQUEST} from '#/main/app/api'

export const RESOURCE_INITIALIZE ='RESOURCE_INITIALIZE'
export const MESSAGE_RESET = 'MESSAGE_RESET'
export const MESSAGE_UPDATE = 'MESSAGE_UPDATE'

export const actions = {}

actions.setResource = makeActionCreator(RESOURCE_INITIALIZE, 'state')

actions.saveConfig = (bbbForm) => (dispatch) => {
  dispatch({
    [API_REQUEST]: {
      url: ['claro_bbb_configuration_save', {bbb: bbbForm.id}],
      request: {
        method: 'POST',
        body: JSON.stringify(Object.assign({}, bbbForm))
      },
      success: (data, dispatch) => {
        dispatch(actions.setResource(data))
        dispatch(actions.updateMessage(trans('bbb_params_saved_success_msg', {}, 'bbb'), 'success'))
      }
    }
  })
}

actions.resetMessage = makeActionCreator(MESSAGE_RESET)
actions.updateMessage = makeActionCreator(MESSAGE_UPDATE, 'content', 'status')
