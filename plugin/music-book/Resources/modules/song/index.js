import { createElement } from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, hashHistory } from 'react-router'

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
        type: {
          name: 'vocals'
        }
      },
      {
        id: '2',
        name: 'Lead guitar',
        type: {
          name: 'guitar'
        }
      },
      {
        id: '3',
        name: 'Rhythm guitar',
        type: {
          name: 'guitar'
        }
      },
      {
        id: '4',
        name: 'Bass',
        type: {
          name: 'bass'
        }
      },
      {
        id: '5',
        name: 'Drums',
        type: {
          name: 'drums'
        }
      }
    ],
    tags: [
      'black metal',
      'grindcore'
    ]
  }
})

const routes = {
  path: '/',
  component: Song,
  indexRoute: { component: Player },
  childRoutes: [
    { path: 'edit', component: Editor }
  ]
}

render(
  createElement(
    Provider, {
      store: store
    },
    createElement(
      Router, {
        routes: routes,
        history: hashHistory
      }
    )
  ),
  document.getElementById('song')
)
