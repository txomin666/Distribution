import {makeReducer} from '#/main/core/scaffolding/reducer'

import {
  EDIT_PLAYER

} from '#/plugin/audio-react/resources/audio/actions'

const reducer = {
  tracks: makeReducer([], {
    [EDIT_PLAYER]: (state, action) => {
      const newState  = Object.assign({},state,{editor:(typeof(state.editor)!='undefined')? !state.editor:false})
      return newState
    }

  })
}

export {
  reducer
}