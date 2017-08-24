import {makeReducer} from '#/main/core/utilities/redux'
import {update} from './../utils'

import {
  SEARCH_ARTICLE,
} from './../actions/search'


function searchArticle (state, action) {
	let newState = state
	//newState.clicksearchEntry = true
	return newState
}



const searchReducer = makeReducer([], {
  [SEARCH_ARTICLE]: searchArticle,
})


export default searchReducer