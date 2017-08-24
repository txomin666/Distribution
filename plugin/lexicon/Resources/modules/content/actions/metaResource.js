import {makeActionCreator} from '#/main/core/utilities/redux'
import {REQUEST_SEND} from './actionsApi'

export const CLICK_EDIT_TITLE = 'CLICK_EDIT_TITLE'
export const SAVE_EDIT_TITLE  = 'SAVE_EDIT_TITLE'

export const actions  = {}

actions.saveEditTitle  = makeActionCreator(SAVE_EDIT_TITLE, 'titleResource')
actions.clickEditTitle = makeActionCreator(CLICK_EDIT_TITLE, 'editable')

actions.saveTitle = (titleResource) => ({
  [REQUEST_SEND]: {
    route: ['edit_entry'],
    request: {
      method: 'PUT',
      body: JSON.stringify({titleResource})
    },
    success: () => actions.saveEditTitle(titleResource)
  }
})


console.log(actions)