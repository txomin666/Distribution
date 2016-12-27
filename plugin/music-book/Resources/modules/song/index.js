import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'

import {reducers} from './reducers'
import {createStore} from '#/main/core/utilities/redux'
import {Song} from './components/song.jsx'

const store = createStore(reducers, {
  viewMode: 'player',
  node: {
    name: 'Pandemonic Hyperblast',
    actions: [
      {
        icon: 'fa fa-fw fa-pencil',
        label: 'Edit',
        handleAction: () => true,
        primary: true
      },
      {
        icon: 'fa fa-fw fa-trash-o',
        label: 'Delete',
        handleAction: () => true,
        primary: false
      }
    ]
  },
  song: {
    tempo: 120,
    audio: '/04 - Pandemonic Hyperblast.mp3',
    cover: '/CodexNecro.jpg',
    releaseDate: 2009,
    artists: [
      { id: '123', name: 'Anaal Nathrakh' },
      { id: '234', name: 'Belphegor' }
    ],
    tracks: [
      {
        id: '1',
        name: 'Vocals',
        instrument: null
      },
      {
        id: '2',
        name: 'Lead guitar',
        instrument: null
      },
      {
        id: '3',
        name: 'Rhythm guitar',
        instrument: null
      },
      {
        id: '4',
        name: 'Bass',
        instrument: null
      },
      {
        id: '5',
        name: 'Drums',
        instrument: null
      }
    ],
    tags: ['black metal', 'grindcore']
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
