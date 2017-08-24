import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {lexiconStore as store} from './store'
import ConnectedLexiconResource from './components/lexicon-Content.jsx'


console.log(store.getState())


ReactDOM.render(
      <Provider store={store}>
        <ConnectedLexiconResource />
      </Provider>,
    document.getElementById("lexicon_content")
)


