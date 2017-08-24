import {makeActionCreator} from '#/main/core/utilities/redux'

import {REQUEST_SEND} from './actionsApi'

export const SAVE_EDIT_ARTICLE  = 'EDIT_ARTICLE'
export const DELETE_ARTICLE     = 'DELETE_ARTICLE'
export const SHARE_ARTICLE      = 'SHARE_ARTICLE'
export const CONSULT_ARTICLE    = 'CONSULT_ARTICLE'
export const ADD_NEW_ARTICLE    = 'ADD_NEW_ARTICLE'
export const ARTICLES_SET       = 'ARTICLES_SET'

export const actions = {}

actions.setArticles     = makeActionCreator(ARTICLES_SET, 'articles')
actions.saveEditArticle = makeActionCreator(SAVE_EDIT_ARTICLE, 'handle','articles')
actions.deleteArticle   = makeActionCreator(DELETE_ARTICLE, 'handle')
actions.shareArticle    = makeActionCreator(SHARE_ARTICLE, 'handle')
actions.consultArticle  = makeActionCreator(CONSULT_ARTICLE, 'handle')
actions.addNewArticle   = makeActionCreator(ADD_NEW_ARTICLE, 'articles')


console.log(actions)