import {makeReducer} from '#/main/core/utilities/redux'
import {update} from './../utils'

import {
  ARTICLES_SET,
  SAVE_EDIT_ARTICLE,
  DELETE_ARTICLE,
  SHARE_ARTICLE,
  ADD_NEW_ARTICLE
} from './../actions/articles'


function setArticles(state, action) {
	let newState   = state
	newState = update(newState, {$set: action.articles})
	return newState
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
  [ADD_NEW_ARTICLE]: addNewArticle
})


export default articlesReducer