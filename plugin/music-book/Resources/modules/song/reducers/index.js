import {makeReducer} from '#/main/core/utilities/redux'

import {
  SONG_SET
} from './../actions/index'

function setSong(songState, action = {}) {
  return action.song
}

const songReducer = makeReducer({}, {
  [SONG_SET]: setSong
})

export default songReducer
