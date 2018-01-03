import {makeActionCreator} from '#/main/core/utilities/redux'

export const TUNING_SELECT = 'TUNING_SELECT'

export const actions = {}

actions.selectTuning = makeActionCreator(TUNING_SELECT, 'tuning')
