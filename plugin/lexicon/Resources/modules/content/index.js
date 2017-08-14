import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import {lexiconStore as store} from './store';
import LexiconContent  from './components/lexicon-Content.jsx';


console.log(store)

ReactDOM.render(
  <Provider store={store}>
    <LexiconContent />
  </Provider>,
  document.getElementById("lexicon_content")
);
