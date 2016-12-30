import {makeReducer, combineReducers} from '#/main/core/utilities/redux'

import {reducers as editorReducers} from './editor/reducers'

/*import {
 TUNING_SELECT
 } from './actions'*/

const reducers = combineReducers({
  node: makeReducer({}),
  instrument: makeReducer({}, {

  }),
  editor: editorReducers
})

export {reducers}
