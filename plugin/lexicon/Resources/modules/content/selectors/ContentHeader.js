import {createSelector} from 'reselect'
//import {size} from 'lodash/size'


const ResourceTitle  = (state) => state.titleResource
const clickeditTitle = (state) => state.clickeditTitle

const getResourceTitle = createSelector(
  [ResourceTitle],
  (titleResource) => titleResource
)

export const select = {     
	getResourceTitle, 
	clickeditTitle,
	ResourceTitle
}
       