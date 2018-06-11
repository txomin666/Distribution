import React from 'react'
import {connect} from 'react-redux'
//import {actions} from '#/plugin/audio-react/resources/audio/actions'
import WavePlayer from '#/plugin/audio-react/resources/audio/player/waveplayer'

const PlayerComponent = props => {
  return (
    <div>
      <div className="panel panel-primary">
        <div className="panel-heading">
          ##Ecoute Enrichies -- Option##
        </div>
        <div className="panel-body">
          <WavePlayer src={'http://claroline.local/test.mp3'} edit={false} />
        </div>
      </div>
    </div>
  )
}

const Player = connect(state => ({
  resource: state.resourceNode,
  url: state.url,
  canEdit: true,
  canDownload: true,
  editable: state.tracks.editor,
}))(PlayerComponent)

export {Player}
