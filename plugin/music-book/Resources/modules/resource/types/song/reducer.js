
import {makeReducer} from '#/main/core/utilities/redux/reducer'
import {makeResourceReducer} from '#/main/core/layout/resource/reducer'

const reducer = makeResourceReducer({}, {
  song: makeReducer({}, {

  })
})

export {
  reducer
}
