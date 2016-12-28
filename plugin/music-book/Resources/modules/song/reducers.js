import { makeReducer, combineReducers } from '#/main/core/utilities/redux'
import update from 'immutability-helper'

import {
  META_UPDATE,
  ARTIST_ADD,
  ARTIST_REMOVE,
  TRACK_ADD,
  TRACK_REMOVE
} from './actions'

function updateMeta(songState, action) {
  return update(songState, {[action.propName]: {$set: action.propValue}})
}

function addTrack(tracksState, action) {
  return tracksState
}

function removeTrack(tracksState, action) {
  return tracksState
}

function addArtist(artistsState, action) {
  return artistsState
}

function removeArtist(artistsState, action) {
  return artistsState
}

const reducers = combineReducers({
  node: makeReducer({}),
  song: makeReducer({}, {
    [META_UPDATE]: updateMeta
  }),
  tacks: makeReducer({}, {
    [TRACK_ADD]: addTrack,
    [TRACK_REMOVE]: removeTrack
  }),
  artists: makeReducer({}, {
    [ARTIST_ADD]: addArtist,
    [ARTIST_REMOVE]: removeArtist
  })
})

export {reducers}
