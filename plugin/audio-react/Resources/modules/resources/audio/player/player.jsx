import React from 'react'
import {connect} from 'react-redux'
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
          audioFile={'http://localhost/test.mp3'}
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
