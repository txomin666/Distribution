import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import songReducer from './reducers'
import {createStore} from '#/main/core/utilities/redux'
import Song from './components/song.jsx'

const store = createStore(songReducer, {
  song: {
    name: "this is my song",
    artists: [
      {
        "id": "123",
        "name": "Anaal Nathrakh"
      },
      {
        "id": "1234",
        "name": "Belphegor"
      }
    ]
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
