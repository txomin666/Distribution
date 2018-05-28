import {makeReducer} from '#/main/core/scaffolding/reducer'
import {makeResourceReducer} from '#/main/core/resource/reducer'

import {reducer as editorReducer} from '#/plugin/audio-react/resources/audio/reducers'

const reducer = makeResourceReducer({}, {
  url: makeReducer({}, {}),
  audio: makeReducer({}, {}),
  tracks: editorReducer.tracks
})

export {
  reducer
}