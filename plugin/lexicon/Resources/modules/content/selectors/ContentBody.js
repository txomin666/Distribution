import {createSelector} from 'reselect'
import size from 'lodash/size'


const getTotalEntries  = (state) => state.totalEntries
const getAllEntries    = (state) => state.dataEntries
const getCurrentUser   = (state) => state.currentUser
const getTypeResource  = (state) => state.typeResource
const getClicksearchEntry  = (state) => state.clicksearchEntry
const getClickeditContent  = (state) => state.clickeditContent


const getEntrySearch = createSelector(
  [getAllEntries],
  (dataEntries) => dataEntries.toString()
)

const getCountEntries = createSelector(
  [getAllEntries],
  (dataEntries) => size(dataEntries)
)


export const select = {
	getEntrySearch,
	getTotalEntries,
	getAllEntries,
	getCurrentUser,
	getCountEntries,
	getTypeResource,
	getClickeditContent,
	getClicksearchEntry
}

console.log(select)