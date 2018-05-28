import React from 'react'

import Wavesurfer from 'react-wavesurfer'

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
      audioRate: 1
    }
    this.handleTogglePlay = this.handleTogglePlay.bind(this)
    this.handlePosChange = this.handlePosChange.bind(this)
    this.handleReady = this.handleReady.bind(this)
    this.handleVolumeChange = this.handleVolumeChange.bind(this)
    this.handleAudioRateChange = this.handleAudioRateChange.bind(this)
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

  render() {
    const waveOptions = {
      scrollParent: false,
      height: 340,
      progressColor: '#6c718c',
      waveColor: '#9DCF56',
      normalize: true,
      barWidth: 1,
      audioRate: this.state.audioRate,
      hideScrollbar:true
    }
    return (
      <div className="row player-react ">
        <div className="col-xs-1"> 
          <button className={`fa big ${this.state.playing ? 'fa-pause' : 'fa-play'}`} onClick={this.handleTogglePlay} ></button>
        </div>
        <div className="col-xs-11">
          <Wavesurfer
            volume={this.state.volume}
            pos={this.state.pos}
            options={waveOptions}
            onPosChange={this.handlePosChange}
            audioFile={this.state.audioFile}
            playing={this.state.playing}
            onReady={this.handleReady}
          />
        </div>
      </div>
    )
  }
}

export default WavePlayer