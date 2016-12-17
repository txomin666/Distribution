import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {createStore} from '#/main/core/utilities/redux'
import instrumentReducer from './reducers'
import Instrument from './components/instrument.jsx'

const store = createStore(instrumentReducer, {
  instrument: {
    id: '123',
    name: 'My awesome guitar',
    type: 'piano'
  }
})

ReactDOM.render(
  React.createElement(
    Provider,
    {store},
    React.createElement(Instrument)
  ),
  document.getElementById('instrument')
)
