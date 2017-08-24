import {makeReducer} from '#/main/core/utilities/redux'
import {update} from './../utils'

import {
  SEARCH_ENTRY,
  CONTENT_ENTRY,
  EDIT_CONTENT_ENTRY,
  CLICK_SEARCH_ENTRY
} from './../actions/actionBody'


function clickSearchEntry (state, action) {
	let newState     = state
	//newState.clicksearchEntry = true
	return newState
}

function searchEntry (state, action) {
	let newState = state
	//newState.clicksearchEntry = true
	return newState
}


function contentEntry(state, action) {
	let newState   = state
	//const clickeditTitle = state.find(clickeditTitle)
	const clickeditTitle = true
	newState = update(newState, {$set: clickeditTitle})
	return newState
}


function editContentEntry(state, action) {
	let newState  = state
	//newState.titleResource = action.titleResource
	return newState
}


const bodyReducer = makeReducer([], {
  [SEARCH_ENTRY]: searchEntry,
  [CONTENT_ENTRY]: contentEntry,
  [EDIT_CONTENT_ENTRY]: editContentEntry,
  [CLICK_SEARCH_ENTRY]: clickSearchEntry
})


export default bodyReducer