import {makeReducer} from '#/main/core/utilities/redux'
import {update} from './../utils'

import {CLICK_EDIT_ARTICLE} from './../actions/clicks'
import {CLICK_SEARCH_ARTICLE} from './../actions/clicks'


function clickEditArticles(state, action) {
  return action.articleEditable
}

function clickSearchArticles(state, action) {
  return action.searchable
}


const clicksReducer = makeReducer([], {
  [CLICK_EDIT_ARTICLE]: clickEditArticles,
  [CLICK_SEARCH_ARTICLE]: clickSearchArticles
})


export default clicksReducer