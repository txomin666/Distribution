import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, hashHistory } from 'react-router'

import { reducers } from './reducers'
import { createStore } from '#/main/core/utilities/redux'
import { Song } from './components/song.jsx'
import { Player } from './player/components/player.jsx'
import { Editor } from './editor/components/editor.jsx'

const store = createStore(reducers, {
  node: {
    name: 'Pandemonic Hyperblast'
  },
  song: {
    tempo: 120,
    audio: '/04 - Pandemonic Hyperblast.mp3',
    cover: '/CodexNecro.jpg',
    releaseDate: '2009',
    artists: [
      { id: '123', name: 'Anaal Nathrakh' },
      { id: '234', name: 'Belphegor' }
    ],
    tracks: [
      {
        id: '1',
        name: 'Vocals',
        instrument: null,
        sheetMusic: [

        ]
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
    tags: [
      'black metal',
      'grindcore'
    ]
  }
})

render((
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={Song}>
        <IndexRoute component={Player} />
        <Route path="/edit" component={Editor} />
      </Route>
    </Router>
  </Provider>
  ),
  document.getElementById('song')
)
