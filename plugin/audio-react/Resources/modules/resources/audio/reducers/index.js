import cloneDeep from 'lodash/cloneDeep'
import {makeReducer} from '#/main/core/scaffolding/reducer'

import {
  SUBTITLE_ADD,
  SUBTITLE_UPDATE,
  SUBTITLE_REMOVE,
  EDITOR_READ
} from '#/plugin/audio-react/resources/audio/actions'

const reducer = {
  tracks: makeReducer({}, {
    [EDITOR_READ]: (state, action) => {
      const newState  = Object.assign({},state,{editor:true})
      return newState
    },
    [SUBTITLE_ADD]: (state, action) => {
      const newState = cloneDeep(state)
      newState.push(action.subtitle)

      return newState
    },
    [SUBTITLE_UPDATE]: (state, action) => {
      const newState = cloneDeep(state)
      const index = newState.findIndex(s => s.id === action.subtitle.id)

      if (index > -1) {
        newState[index] = action.subtitle
      }

      return newState
    },
    [SUBTITLE_REMOVE]: (state, action) => {
      const newState = cloneDeep(state)
      const index = newState.findIndex(s => s.id === action.id)

      if (index > -1) {
        newState.splice(index, 1)
      }

      return newState
    }
  })
}

export {
  reducer
}