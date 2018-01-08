
import {makeReducer} from '#/main/core/scaffolding/reducer'
import {makeResourceReducer} from '#/main/core/resource/reducer'

const reducer = makeResourceReducer({}, {
  song: makeReducer({}, {

  })
})

export {
  reducer
}
