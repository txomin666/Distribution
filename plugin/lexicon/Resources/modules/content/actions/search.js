import {makeActionCreator} from '#/main/core/utilities/redux'

import {REQUEST_SEND} from './actionsApi'

export const SEARCH_ARTICLE  = 'SEARCH_ARTICLE'


export const actions = {}

actions.searchArticle  = makeActionCreator(SEARCH_ARTICLE, 'valueSearch')


console.log(actions)