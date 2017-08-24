import { combineReducers } from 'redux'


import bodyReducer    from './ContentBody'
import headerReducer  from './ContentHeader'


export const lexiconApp = combineReducers({
  totalEntries: bodyReducer,
  dataEntries: bodyReducer,
  typeResource: bodyReducer,
  author: bodyReducer,
  titleResource: headerReducer,
  clickeditTitle: headerReducer,
  clickeditContent: bodyReducer,
  clicksearchEntry: bodyReducer,
  id: bodyReducer,
  lang: headerReducer,
  currentUser: (state = null) => state
})



