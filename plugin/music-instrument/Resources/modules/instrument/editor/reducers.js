import {makeReducer, combineReducers} from '#/main/core/utilities/redux'

import { CONFIG_SECTION } from './enums'

import {
 SECTION_CHANGE
 } from './actions'

function changeSection(sectionState, action) {
  return action.section
}

const reducers = combineReducers({
  currentSection: makeReducer(CONFIG_SECTION, {
    [SECTION_CHANGE]: changeSection
  })
})

export {reducers}
