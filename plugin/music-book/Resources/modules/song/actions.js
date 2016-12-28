import { makeActionCreator } from '#/main/core/utilities/redux'

export const META_UPDATE = 'META_UPDATE'

export const ARTIST_ADD    = 'ARTIST_ADD'
export const ARTIST_REMOVE = 'ARTIST_REMOVE'

export const TRACK_ADD    = 'TRACK_ADD'
export const TRACK_REMOVE = 'TRACK_REMOVE'

export const actions = {}

actions.updateMeta = makeActionCreator(META_UPDATE, 'propName', 'propValue')

actions.addArtist = makeActionCreator(ARTIST_ADD, 'artist')
actions.removeArtist = makeActionCreator(ARTIST_REMOVE, 'artist')

actions.addTrack = makeActionCreator(TRACK_ADD, 'track')
actions.removeTrack = makeActionCreator(TRACK_REMOVE, 'track')
