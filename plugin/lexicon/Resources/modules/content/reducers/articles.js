import {makeReducer} from '#/main/core/utilities/redux'
import {update} from './../utils'

import {
  ARTICLES_SET,
  SAVE_EDIT_ARTICLE,
  DELETE_ARTICLE,
  SHARE_ARTICLE,
  CONSULT_ARTICLE,
  ADD_NEW_ARTICLE
} from './../actions/articles'


function setArticles(state, action) {
  return action.articles
}


function saveEditArticle (state, action) {
	let newState = state
	return newState
}


function deleteArticle(state, action) {
	console.log(action)
	let newState   = state
	//newState = update(newState, {clickeditTitle: {$set: true}})
	return newState
}


function consultArticle(state, action) {
	//const newTitle = action.titleResource
	let newState   = state
	/*newState = update(newState, {
		clickeditTitle: {$set: false},
		titleResource: {$set: newTitle}
	})*/
	return newState
}

function shareArticle(state, action) {
	console.log(action)
	let newState   = state
	//newState = update(newState, {clickeditTitle: {$set: true}})
	return newState
}

function addNewArticle(state, action) {
	console.log(action)
	let newState   = state
	//newState = update(newState, {clickeditTitle: {$set: true}})
	return newState
}

const articlesReducer = makeReducer([], {
  [ARTICLES_SET]: setArticles,
  [SAVE_EDIT_ARTICLE]: saveEditArticle,
  [DELETE_ARTICLE]: deleteArticle,
  [SHARE_ARTICLE]: shareArticle,
  [CONSULT_ARTICLE]: consultArticle,
  [ADD_NEW_ARTICLE]: addNewArticle
})


export default articlesReducer