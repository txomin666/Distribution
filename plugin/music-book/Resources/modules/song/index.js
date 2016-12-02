import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {createStore} from './store'
import Song from './components/song.jsx'

const store = createStore({
  song: {
    name: "this is my song",
    artist: "an Artist definition"
  }
})

ReactDOM.render(
  React.createElement(
    Provider,
    {store},
    React.createElement(Song)
  ),
  document.getElementById('song')
)
