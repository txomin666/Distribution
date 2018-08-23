import cloneDeep from 'lodash/cloneDeep'
import {makeReducer, combineReducers} from '#/main/app/store/reducer'
import {makeFormReducer} from '#/main/app/content/form/store/reducer'
import {RESOURCE_LOAD} from '#/main/core/resource/store'
import {
  CONFIGURATION_UPDATE,
  CONFIGURATION_MESSAGE_RESET,
  CONFIGURATION_MESSAGE_UPDATE,
  MEETINGS_INIT
} from '#/plugin/big-blue-button/administration/bbb/store/actions'
import {selectors} from '#/plugin/big-blue-button/administration/bbb/store/actions'

const reducer = combineReducers({
  config: makeFormReducer(selectors.FORM_NAME, {}, {
    [CONFIGURATION_UPDATE]: (state, action) => {
      const newState = cloneDeep(state)
      newState[action.property] = action.value

      return newState
    }
  }),
  message: makeReducer({}, {
    [RESOURCE_LOAD]: (state, action) => action.resourceData.message,
    [CONFIGURATION_MESSAGE_RESET]: () => {
      return {
        content: null,
        type: null
      }
    },
    [CONFIGURATION_MESSAGE_UPDATE]: (state, action) => {
      return {
        content: action.content,
        type: action.status
      }
    }
  }),
  meetings: makeReducer([], {
    [MEETINGS_INIT]: (state, action) => {
      return action.meetings
    }
  })
})

export {
  reducer
}
