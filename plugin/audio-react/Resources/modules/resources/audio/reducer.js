import {makeReducer} from '#/main/core/scaffolding/reducer'
import {makeResourceReducer} from '#/main/core/resource/reducer'

import {reducer as editorReducer} from '#/plugin/audio-react/resources/audio/reducers'
import {regionReducer} from '#/plugin/audio-react/resources/audio/reducers/regions'

const reducer = makeResourceReducer({}, {
  url: makeReducer({}, {}),
  audio: makeReducer({}, {}),
  tracks: editorReducer.tracks,
  regions:regionReducer.regions
})

export {
  reducer
}