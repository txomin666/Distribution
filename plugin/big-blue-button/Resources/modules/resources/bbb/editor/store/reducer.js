import {makeReducer} from '#/main/app/store/reducer'
import {makeFormReducer} from '#/main/app/content/form/store/reducer'

import {RESOURCE_LOAD} from '#/main/core/resource/store/actions'
import {
  MESSAGE_RESET,
  MESSAGE_UPDATE
} from '#/plugin/big-blue-button/resources/bbb/store/actions'

import {selectors} from '#/plugin/big-blue-button/resources/bbb/editor/store/selectors'

const reducer = {
  bbbForm: makeFormReducer(selectors.FORM_NAME, {}, {
    data: makeReducer({}, {
      [RESOURCE_LOAD]: (state, action) => action.resourceData.bbb
    }),
    originalData: makeReducer({}, {
      [RESOURCE_LOAD]: (state, action) => action.resourceData.bbb
    })
  }),
  message: makeReducer({}, {
    [RESOURCE_LOAD]: (state, action) => action.resourceData.message,
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
  })
}

export {
  reducer
}
