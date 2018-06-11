import cloneDeep from 'lodash/cloneDeep'
import {makeReducer} from '#/main/core/scaffolding/reducer'

import {
<<<<<<< HEAD
  EDIT_PLAYER
=======
  EDITOR_READ
>>>>>>> 29f8b47be55c5e7e6931963a02715d88bbd3ac4d
} from '#/plugin/audio-react/resources/audio/actions'

const reducer = {
  tracks: makeReducer([], {
<<<<<<< HEAD
    [EDIT_PLAYER]: (state, action) => {
      const newState  = Object.assign({},state,{editor:(typeof(state.editor)!='undefined')? !state.editor:false})
=======
    [EDITOR_READ]: (state, action) => {
      const newState  = Object.assign({},state,{editor:true})
>>>>>>> 29f8b47be55c5e7e6931963a02715d88bbd3ac4d
      return newState
    }

  })
}

export {
  reducer
}