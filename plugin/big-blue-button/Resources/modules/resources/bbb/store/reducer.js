import cloneDeep from 'lodash/cloneDeep'
import {makeReducer, combineReducers} from '#/main/app/store/reducer'

import {RESOURCE_LOAD} from '#/main/core/resource/store'
import {FORM_SUBMIT_SUCCESS} from '#/main/app/content/form/store/actions'

import {
  BBB_URL_UPDATE,
  RESOURCE_FORM_INITIALIZE,
  RESOURCE_FORM_UPDATE,
  RESOURCE_INITIALIZE,
  CAN_JOIN_UPDATE,
  MESSAGE_RESET,
  MESSAGE_UPDATE
} from '#/plugin/big-blue-button/resources/bbb/store/actions'
import {reducer as editorReducer} from '#/plugin/big-blue-button/resources/bbb/editor/store'

const reducer = combineReducers({
  bbb: makeReducer(null, {
    [RESOURCE_LOAD]: (state, action) => action.resourceData.bbb,
    [BBB_URL_UPDATE]: (state, action) => action.url
  }),
  resourceForm: makeReducer({}, {
    [RESOURCE_FORM_INITIALIZE]: (state, action) => action.state,
    [RESOURCE_FORM_UPDATE]: (state, action) => {
      const newState = cloneDeep(state)
      newState[action.property] = action.value

      return newState
    }
  }),
  resource: makeReducer({}, {
    [RESOURCE_INITIALIZE]: (state, action) => action.state
  }),
  canJoin: makeReducer({}, {
    [CAN_JOIN_UPDATE]: (state, action) => action.value
  }),
  message: makeReducer({}, {
    [MESSAGE_RESET]: () => {
      return {
        content: null,
        type: null
      }
    },
    [MESSAGE_UPDATE]: (state, action) => {
      return {
        content: action.content,
        type: action.status
      }
    }
  }),
  bbbForm: editorReducer
})

export {
  reducer
}
