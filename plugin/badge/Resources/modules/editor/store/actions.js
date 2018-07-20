import {API_REQUEST} from '#/main/app/api'
import {actions as formActions} from '#/main/core/data/form/actions'

export const actions = {}

actions.open = (formName, id = null) => {
  if (id) {
    return {
      [API_REQUEST]: {
        url: ['apiv2_user_get', {id}],
        success: (response, dispatch) => dispatch(formActions.resetForm(formName, response, false))
      }
    }
  } else {
    return formActions.resetForm(formName, {}, true)
  }
}