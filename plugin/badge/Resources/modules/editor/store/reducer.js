import {makeReducer, combineReducers} from '#/main/app/store/reducer'
import {makeFormReducer} from '#/main/core/data/form/reducer'

const reducer = {
  inWorkspace: makeReducer(false, {}),
  badges: combineReducers({
    current: makeFormReducer('users.current', {}, {})
  })
}

export {
  reducer
}