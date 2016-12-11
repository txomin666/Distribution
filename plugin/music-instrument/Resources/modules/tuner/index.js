import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {createStore} from './store'
import Tuner from './components/tuner.jsx'

const store = createStore({
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
