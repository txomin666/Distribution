import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {createStore} from '#/main/core/utilities/redux'
import tunerReducer from './reducers'
import Tuner from './components/tuner.jsx'

const store = createStore(tunerReducer, {
  tuning: null,
  tunings: []
})

ReactDOM.render(
  React.createElement(
    Provider,
    {store},
    React.createElement(Tuner)
  ),
  document.getElementById('instrument-tuner')
)
