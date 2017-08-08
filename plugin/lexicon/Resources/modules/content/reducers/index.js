import React from 'react'
import axios from 'axios'

//const listResources = JSON.parse(document.getElementById('lexicon_content').dataset.resources)



const initialState = {
	id : '2g36dfarj',
	titleResource : 'Dictionnaire espagnol L2',
	dataItems  : [
      ['abjurar', {}],
      ['botarate', {}],
      ['Bretaña', {}],
      ['brutalizar', {}],
      ['desvelar', {}],
      ['diámetro', {}],
      ['fotólisis', {}],
      ['fresón', {}],
      ['golpiza', {}],
      ['grandilocuente', {}],
      ['mongolismo', {}]
	]
}


axios.defaults.baseURL = 'http://totoro.imag.fr/lexinnova/api';
axios.defaults.headers.common['Authorization'] = 'levis0045';
axios.defaults.headers.get['Content-Type'] = 'application/json';

// http://totoro.imag.fr/lexinnova/api/Lexinnova/esp/handle/1014504
axios.get('http://totoro.imag.fr/lexinnova/api/Lexinnova/esp/cdm-headword/a/?strategy=GREATER_THAN OR EQUAL')
  .then(function(response){
    console.log(JSON.stringify(response.data)); // ex.: { user: 'Your User'}
    console.log(response.status); // ex.: 200
}); 


export default (state= initialState, action, item=['Nouveau', {}]) => {
	switch(action.type) {
		case 'CREATE_ENTRY' :
			let newState = state.dataItems;
			const istate = Object.assign({}, state, {
				dataItems : newState.push(item)
			})
			return istate
		case 'SEARCH_ENTRY' :
			const newtate = state.dataItems.slice();
			return Object.assign({}, state, {
				dataItems : newtate.push(action)
			})
		case 'EDIT_ENTRY' :
			return Object.assign({}, state, {
				titleResource : state.titleResource
			})
		case 'CONSULT_ENTRY' :
			return Object.assign({}, state, {
				titleResource : state.titleResource
			})
		case 'EDIT_TITLE' :
			console.log('edit title ok')
			return Object.assign({}, state, {
				titleResource : state.titleResource
			})
		case 'SCROLL_ENTRIES' :
			return Object.assign({}, state, {
				titleResource : state.titleResource
			})
		default :
			return state
	}
}