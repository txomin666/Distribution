import { combineReducers } from 'redux'

import {reducer as modalReducer} from '#/main/core/layout/modal/reducer'
import {reducers as apiReducers} from './../api/reducers'
import lexiconsReducer    from './lexicons'
import selectReducer       from './select'
import sortByReducer       from './sort-by'
import paginationReducer   from './pagination'
import searchReducer       from './search'
import totalResultsReducer from './total-results'

export const lexiconApp = combineReducers({
  modal: modalReducer,
  currentRequests: apiReducers.currentRequests,
  questions: lexiconsReducer,
  selected: selectReducer,
  sortBy: sortByReducer,
  pagination: paginationReducer,
  search: searchReducer,
  totalResults: totalResultsReducer,
  currentUser: (state = null) => state
})
