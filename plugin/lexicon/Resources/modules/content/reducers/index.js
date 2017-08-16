import { combineReducers } from 'redux'


import bodyReducer    from './ContentBody'
import headerReducer  from './ContentHeader'


export const lexiconApp = combineReducers({
  //modal: modalReducer,
  content: bodyReducer,
  header: headerReducer,
  currentUser: (state = null) => state
})


















/*

// http://totoro.imag.fr/lexinnova/api/Lexinnova/esp/handle/1014504
axios.get('http://totoro.imag.fr/lexinnova/api/Lexinnova/esp/cdm-headword/a/?strategy=GREATER_THAN OR EQUAL')
  .then(function(response){
  	//const parseData = JSON.parse(response.data);
    //console.log(parseData); // ex.: { user: 'Your User'}
    console.log(response.status); // ex.: 200
});
*/

