import {makeReducer} from '#/main/core/utilities/redux'

import {
  SONG_SET
} from './actions'

function setSong(songState, action = {}) {
  return action.song
}

const reducers = makeReducer({}, {
  [SONG_SET]: setSong
})

export {reducers}
