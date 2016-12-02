import {makeActionCreator} from '#/main/core/utilities/redux'

export const SONG_SET = 'SONG_SET'

export const actions = {}

actions.setSong = makeActionCreator(SONG_SET, 'song')
