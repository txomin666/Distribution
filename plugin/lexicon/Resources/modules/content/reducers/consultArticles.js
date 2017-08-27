import {makeReducer} from '#/main/core/utilities/redux'
import {update} from './../utils'
import axios from 'axios'

import {
  CONSULT_ARTICLE
} from './../actions/articles'



function consultArticle(state, action) {
	console.log(action)
	const title     = action.title
	const lang      = action.lang
	const handle    =  action.handle
	const urljibiki = 'http://totoro.imag.fr/lexinnova/api/'+title+'/'+lang+'/handle/'+handle
	let newState    = state

	axios.get(urljibiki)
		.then( (response) => {
			const axiosData = response.data
			console.log('axiosData', action)
			const Data = JSON.stringify(axiosData)
			console.log('Data', Data)
			const parseData = JSON.parse(Data)
			console.log('parseData', parseData)
			const currentContentArticle = parseData
			update(newState, {$set: currentContentArticle})
			
		})
	
//	return newState
}



const currentArticlesReducer = makeReducer([], {
  [CONSULT_ARTICLE]: consultArticle
})


export default currentArticlesReducer