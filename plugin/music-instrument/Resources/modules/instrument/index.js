import { createElement } from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, hashHistory } from 'react-router'

import { createStore } from '#/main/core/utilities/redux'

import { reducers } from './reducers'
import { registerDefaultInstrumentTypes } from './../instrument-type'

import { Instrument } from './components/instrument.jsx'
import { Player } from './player/components/player.jsx'
import { Editor } from './editor/components/editor.jsx'

// Initialize instrument app
registerDefaultInstrumentTypes()
const store = createStore(reducers, {
  node: {
    name: 'My awesome keyboard'
  },
  instrument: {
    id: '123',
    type: 'keyboard',
    keys: 88
  }
})

const routes = {
  path: '/',
  component: Instrument,
  indexRoute: { component: Player },
  childRoutes: [
    {
      path: 'edit',
      component: Editor,
      childRoutes: [
        { path: '', component: '' }
      ]
    }
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
  document.getElementById('instrument')
)
