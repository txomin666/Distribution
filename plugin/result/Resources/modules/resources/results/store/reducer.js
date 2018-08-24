import {combineReducers, makeReducer} from '#/main/app/store/reducer'

import {FORM_SUBMIT_SUCCESS} from '#/main/app/content/form/store/actions'
import {RESOURCE_LOAD} from '#/main/core/resource/store/actions'

import {selectors as editorSelectors} from '#/plugin/result/resources/results/editor/store/selectors'
import {reducer as editorReducer} from '#/plugin/result/resources/results/editor/store/reducer'

const reducer = combineReducers({
  resultForm: editorReducer,
  result: makeReducer({}, {
    [RESOURCE_LOAD]: (state, action) => action.resourceData.result,
    [FORM_SUBMIT_SUCCESS+'/'+editorSelectors.FORM_NAME]: (state, action) => action.updatedData
  })
})

export {
  reducer
}
