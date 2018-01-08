import React from 'react'

import {Routes, navigate} from '#/main/core/router'
import {ResourceContainer} from '#/main/core/resource/containers/resource.jsx'

import {Editor} from '#/plugin/music-book/resource/types/song/editor/components/editor.jsx'
import {Player} from '#/plugin/music-book/resource/types/song/player/components/player.jsx'

const Resource = props =>
  <ResourceContainer
    formContainer={{
      name: 'song',
      path: '/edit',
      action: (song) => ['api_song_update', {id: song.id}],
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
