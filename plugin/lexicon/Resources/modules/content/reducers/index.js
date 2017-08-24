import { combineReducers } from 'redux'


import searchReducer         from './search'
import metaResourceReducer   from './metaResource'
import articlesReducer       from './articles'
import modalReducer          from './modal'
import totalArticlesReducer  from './totalArticles'
import clicksReducer         from './clicks'


export const lexiconApp = combineReducers({
  metaResource: metaResourceReducer,
  articles:  articlesReducer,
  modal: modalReducer,
  search: searchReducer,
  totalArticles: totalArticlesReducer,
  articleEditable: clicksReducer,
  currentUser: (state = null) => state
})



//console.log(lexiconApp)