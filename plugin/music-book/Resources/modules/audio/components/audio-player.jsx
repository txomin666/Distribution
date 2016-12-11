import React, { Component } from 'react'
import debounce from 'lodash/debounce'

const T = React.PropTypes

export default class AudioPlayer extends Component {
  constructor() {
    super()
    this.waveform = null
  }

  componentDidMount() {
    this.waveform = WaveSurfer.create({
      container: '#waveform',
      barWidth: 2,
      cursorColor: 'transparent',
      progressColor: '#337AB7',
      hideScrollbar: true,
      height: 50,
      waveColor: '#CCCCCC'
    });

    this.waveform.load('/04 - Pandemonic Hyperblast.mp3');

    window.addEventListener('resize', debounce(() => {
      this.waveform.empty();
      this.waveform.drawBuffer();
    }, 150));
  }

  componentWillUnmount() {
    /*window.removeEventListener("resize", this.updateDimensions);*/
  }

  render() {
    return (
      <div className="song-player">
        <div className="song-buttons">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => this.waveform.playPause()}
          >
            <span className="fa fa-play"></span>
          </button>
        </div>
        <div className="song-waveform">
          <div id="waveform"></div>
        </div>
      </div>
    )
  }
}

AudioPlayer.propTypes = {
  audio: T.object
}
