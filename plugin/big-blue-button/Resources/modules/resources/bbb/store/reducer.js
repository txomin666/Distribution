import {makeReducer, combineReducers} from '#/main/app/store/reducer'

import {RESOURCE_LOAD} from '#/main/core/resource/store'
import {FORM_SUBMIT_SUCCESS} from '#/main/app/content/form/store/actions'

import {
  CAN_JOIN_UPDATE,
  BBB_URL_UPDATE
} from '#/plugin/big-blue-button/resources/bbb/store/actions'
import {reducer as editorReducer} from '#/plugin/big-blue-button/resources/bbb/editor/store'
import {selectors} from '#/plugin/big-blue-button/resources/bbb/store'

const reducer = combineReducers({
  bbb: makeReducer({}, {
    [RESOURCE_LOAD]: (state, action) => action.resourceData.bbb,
    [FORM_SUBMIT_SUCCESS+'/'+selectors.STORE_NAME+'.bbbForm']: (state, action) => action.updatedData
  }),
  canJoin: makeReducer({}, {
    [CAN_JOIN_UPDATE]: (state, action) => action.value
  }),
  bbbUrl: makeReducer(null, {
    [RESOURCE_LOAD]: (state, action) => action.resourceData.bbbUrl,
    [BBB_URL_UPDATE]: (state, action) => action.url
  }),
  config: makeReducer({}, {
    [RESOURCE_LOAD]: (state, action) => action.resourceData.config
  }),
  bbbForm: editorReducer
})

export {
  reducer
}
