import React from 'react'
import axios from 'axios'
import {makeReducer} from '#/main/core/utilities/redux'

//import xml2json from 'xml2json'
//const listResources = JSON.parse(document.getElementById('lexicon_content').dataset.resources)




/*
axios.defaults.baseURL = 'http://totoro.imag.fr/lexinnova/api';
axios.defaults.headers.common['Authorization'] = 'levis0045';
axios.defaults.headers.get['Content-Type'] = 'application/xml';

// http://totoro.imag.fr/lexinnova/api/Lexinnova/esp/handle/1014504
axios.get('http://totoro.imag.fr/lexinnova/api/Lexinnova/esp/cdm-headword/a/?strategy=GREATER_THAN OR EQUAL')
  .then(function(response){
  	//const parseData = JSON.parse(response.data);
    //console.log(parseData); // ex.: { user: 'Your User'}
    console.log(response.status); // ex.: 200
}); 
*/

export default (state = {}, action) => {
	switch(action.type) {
		case 'CREATE_ENTRY' :
			
			return console.log('createEntry')
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