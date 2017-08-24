import {makeReducer} from '#/main/core/utilities/redux'
import {update} from './../utils'

import {
  SAVE_TITLE_EDIT,
  TITLE_EDIT,
  ADD_NEW_ENTRY
} from './../actions/actionHeader'


function addEntry (state, action) {
	let newState = state
	return newState
}


function editTitle(state, action) {
	console.log(action)
	let newState   = state
	//newState.clickeditTitle = action.clickeditTitle
	const clickeditTitle = true
	newState = update(newState, {$set: clickeditTitle})
	return newState
}


function saveTitleResource(state, action) {
	return action.titleResource
}


const headerReducer = makeReducer([], {
  [SAVE_TITLE_EDIT]: saveTitleResource,
  [TITLE_EDIT]: editTitle,
  [ADD_NEW_ENTRY]: addEntry
})

export default headerReducer