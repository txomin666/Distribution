import React from 'react'
import {actions} from '#/plugin/audio-react/resources/audio/actions'
import {connect} from 'react-redux'
import WaveSurfer from 'react-wavesurfer'
window.WaveSurfer = require('wavesurfer.js')
let Regions = require("react-wavesurfer/src/plugins/regions").default
//let Minimap = require("react-wavesurfer/lib/plugins/minimap").default;

/**
 * Simple example of a React component with a Wavesurfer
 */
class WavePlayer extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      audioFile: this.props.audioFile,
      playing: false,
      pos: 0,
      volume: 0.5,
      audioRate: 1,
      activeRegion: 'One',
      regions: {
        One: {
          id: 'One',
          start: 0,
          end: 3
        },
        Two: {
          id: 'Two',
          start: 4,
          end: 5.25
        },
        Three: {
          id: 'Three',
          start: 4.75,
          end: 6.2
        }
      }

    }
    this.handleTogglePlay = this.handleTogglePlay.bind(this)
    this.handlePosChange = this.handlePosChange.bind(this)
    this.handleReady = this.handleReady.bind(this)
    this.handleVolumeChange = this.handleVolumeChange.bind(this)
    this.handleAudioRateChange = this.handleAudioRateChange.bind(this)
    this.addRegionToPlayer= this.addRegionToPlayer.bind(this)
    this.handleRegionClick = this.handleRegionClick.bind(this)
    this.handleSingleRegionUpdate = this.handleSingleRegionUpdate.bind(this)
    this.handleRegionChange = this.handleRegionChange.bind(this)
  }

  

  
  addRegionToPlayer(region=null){
    this.props.addRegion({id:'One',start:0,end:5})
  }
  handleAudioRateChange(e) {
    this.setState({
      audioRate: +e.target.value
    })
  }

  handleTogglePlay() {
    this.setState({
      playing: !this.state.playing
    })
  }

  handlePosChange(e) {
    
    this.setState({
      pos: e.originalArgs ? e.originalArgs[0] : +e.target.value
    })
  }

  handleReady() {
    this.setState({
      pos: 5
    })
  }

  handleVolumeChange(e) {
    this.setState({
      volume: +e.target.value
    })
  }

  handleSingleRegionUpdate(e) {
    const newState = Object.assign({}, this.state, {
      regions: {
        [e.region.id]: e.region
      }
    })
    this.setState(newState)
  }

  handleRegionChange(e) {
    const newState = Object.assign({}, this.state, {
      regions: {
        [this.state.activeRegion]: {
          [e.target.name]: Number(e.target.value)
        }
      }
    })

    this.setState(newState)
  }

  handleRegionClick(e) {
    
    this.setState({
      activeRegion: e.originalArgs[0].id
    })
  }

  render() {
    const waveOptions = {
      scrollParent: false,
      height: 340,
      progressColor: 'blue',
      waveColor: '#00000',
      normalize: true,
      barWidth: 1,
      audioRate: this.state.audioRate,
      hideScrollbar:true
    }
    return (
      <div>
        <div className="row player-react ">
          <div className="col-xs-1"> 
            <button className={`fa big ${this.state.playing ? 'fa-pause' : 'fa-play'}`} onClick={this.handleTogglePlay}  ></button>
          </div>
          <div className="col-xs-11">
            <WaveSurfer
              volume={this.state.volume}
              pos={this.state.pos}
              options={waveOptions}
              onPosChange={this.handlePosChange}
              audioFile={this.state.audioFile}
              playing={this.state.playing}
              onReady={this.handleReady}
            >
              <Regions
                onSingleRegionUpdate={this.handleSingleRegionUpdate}
                onRegionClick={this.handleRegionClick}
                regions={this.state.regions}
              />
            </WaveSurfer>
          </div>
            
        </div>
        <div className="row ">
          <div className="col-xs-4 col-md-offset-4 player-react-control">
            <button className="btn btn-primary"> <span className="fa fa-play"></span></button>
          </div>
        </div>

      </div>     
    )
  }
}

export default connect(
  state=>({
    url: state.url
  }), 
  (dispatch)=>({
    addRegion :(region)=>dispatch(actions.addRegionToPlayer(region))
  }))(WavePlayer)

