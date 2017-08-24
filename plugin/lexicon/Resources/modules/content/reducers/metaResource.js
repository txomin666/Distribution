import {makeReducer} from '#/main/core/utilities/redux'
import {update} from './../utils'

import {
  CLICK_EDIT_TITLE,
  SAVE_EDIT_TITLE
} from './../actions/metaResource'



function clickEditTitle (state, action) {
	console.log(action)
	let newState   = state
	newState = update(newState, {clickeditTitle: {$set: true}})
	return newState
}


function saveEditTitle (state, action) {
	const newTitle = action.titleResource
	let newState   = state
	newState = update(newState, {
		clickeditTitle: {$set: false},
		titleResource: {$set: newTitle}
	})
	return newState
}


const metaResourceReducer = makeReducer([], {
  [CLICK_EDIT_TITLE]: clickEditTitle,
  [SAVE_EDIT_TITLE]: saveEditTitle
})


export default metaResourceReducer