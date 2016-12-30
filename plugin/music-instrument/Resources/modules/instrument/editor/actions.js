import {makeActionCreator} from '#/main/core/utilities/redux'

export const SECTION_CHANGE = 'SECTION_CHANGE'

export const actions = {}

actions.changeSection = makeActionCreator(SECTION_CHANGE, 'section')
