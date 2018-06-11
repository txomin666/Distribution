import React from 'react'
import {connect} from 'react-redux'
<<<<<<< HEAD
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
=======
import Wavesurfer from 'react-wavesurfer'
//import {actions} from '#/plugin/audio-react/resources/audio/actions'
import WavePlayer from '#/plugin/audio-react/resources/audio/player/waveplayer'

const  PlayerComponent = props =>{
  
  if(props.editable)
    return(
      <div><h1>AudioReactPlayer Mode Edit</h1></div>
    )
      
  if(!props.editable)
    return(
      <div>
        <h1>AudioReactPlayer Mode Play</h1>
        <WavePlayer
          src={'http://localhost/test.mp3'}
        />
      </div>
    )   
}

const Player = connect(
  state => ({
    resource: state.resourceNode,
    url: state.url,
    canEdit:true,
    canDownload:true
  })
)(PlayerComponent)

export {
  Player
}
>>>>>>> 29f8b47be55c5e7e6931963a02715d88bbd3ac4d
