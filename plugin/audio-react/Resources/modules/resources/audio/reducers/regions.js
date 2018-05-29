import cloneDeep from 'lodash/cloneDeep'
import {makeReducer} from '#/main/core/scaffolding/reducer'

import {
  ADD_REGION_TO_PLAYER
} from '#/plugin/audio-react/resources/audio/actions'

const regionReducer = {
  regions: makeReducer([], {

    [ADD_REGION_TO_PLAYER]: (state, action) => {
      const newState = cloneDeep(state)
      newState.push(action.region)

      return newState
    }
  })
}

export {
  regionReducer
}