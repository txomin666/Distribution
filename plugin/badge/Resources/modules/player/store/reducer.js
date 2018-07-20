import {makeReducer} from '#/main/app/store/reducer'

const reducer = {
  inWorkspace: makeReducer(false, {})
}

export {
  reducer
}