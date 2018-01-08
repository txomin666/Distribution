import React from 'react'

import {Routes, navigate} from '#/main/core/router'
import {ResourceContainer} from '#/main/core/resource/containers/resource.jsx'

import {Editor} from '#/plugin/music-instrument/resource/types/instrument/editor/components/editor.jsx'
import {Player} from '#/plugin/music-instrument/resource/types/instrument/player/components/player.jsx'

const Resource = props =>
  <ResourceContainer
    formContainer={{
      name: 'instrument',
      path: '/edit',
      action: (instrument) => ['api_instrument_update', {id: instrument.id}],
      cancel: {
        action: () => navigate('/')
      }
    }}
  >
    <Routes routes={[
      {
        path: '/',
        exact: true,
        component: Player
      }, {
        path: '/edit',
        component: Editor
      }
    ]} />
  </ResourceContainer>

export {
  Resource
}
