import {createSelector} from 'reselect'
//import {size} from 'lodash/size'


const ResourceTitle  = (state) => state.titleResource
const getClickeditTitle = (state) => state.clickeditTitle
const getAuthor      = (state) => state.author

const getResourceTitle = createSelector(
  [ResourceTitle],
  (titleResource) => titleResource
)

export const select = {     
	getResourceTitle, 
	getClickeditTitle,
	getAuthor
}
       

console.log(select)