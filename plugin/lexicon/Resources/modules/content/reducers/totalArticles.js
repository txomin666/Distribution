import {makeReducer} from '#/main/core/utilities/redux'
import {update} from './../utils'

import {
	TOTAL_ARTICLES_CHANGE
} from './../actions/totalArticles'



function changeTotalArticles (state, action) {
	console.log(action)
	let newState   = state
	newState = update(newState, {clickeditTitle: {$set: true}})
	return newState
}


const totalArticlesReducer = makeReducer([], {
  [TOTAL_ARTICLES_CHANGE]: changeTotalArticles
})


export default totalArticlesReducer