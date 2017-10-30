import {makeReducer} from '#/main/core/utilities/redux'
import {makeListReducer} from '#/main/core/layout/list/reducer'

const logReducer = makeReducer([], {})

const reducer = makeListReducer({
  data: logReducer
})

export {
  reducer
}
