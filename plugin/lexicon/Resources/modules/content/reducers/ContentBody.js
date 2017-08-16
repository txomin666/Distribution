import {makeReducer} from '#/main/core/utilities/redux'
import {update} from './../utils'

import {
  SEARCH_ENTRY,
  CONTENT_ENTRY,
  EDIT_CONTENT_ENTRY
} from './../actions/actionBody'


function searchEntry (state, action) {
	let newState = state
	return newState
}


function contentEntry(state, action) {
	let newState   = state
	clickeditTitle = state.find(clickeditTitle)
	clickeditTitle = true
	newState = update(newState, {$set: clickeditTitle})
	return newState
}


function editContentEntry(state, action) {
	return action.titleResource
}


const bodyReducer = makeReducer([], {
  [SEARCH_ENTRY]: searchEntry,
  [CONTENT_ENTRY]: contentEntry,
  [EDIT_CONTENT_ENTRY]: editContentEntry
})

export default bodyReducer