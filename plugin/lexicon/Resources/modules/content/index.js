import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import {createStore } from 'redux';
import lexiconReducer from './reducers';
import LexiconContent  from './components/lexicon-Content.jsx';  
//import lexico from './js/lexicon.js'

let store = createStore(lexiconReducer)


ReactDOM.render(
  <LexiconContent store={store} />, 
  document.getElementById("lexicon_content")
);
