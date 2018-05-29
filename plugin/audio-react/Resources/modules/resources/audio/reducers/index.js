import cloneDeep from 'lodash/cloneDeep'
import {makeReducer} from '#/main/core/scaffolding/reducer'

import {
  EDITOR_READ
} from '#/plugin/audio-react/resources/audio/actions'

const reducer = {
  tracks: makeReducer([], {
    [EDITOR_READ]: (state, action) => {
      const newState  = Object.assign({},state,{editor:true})
      return newState
    }

  })
}

export {
  reducer
}