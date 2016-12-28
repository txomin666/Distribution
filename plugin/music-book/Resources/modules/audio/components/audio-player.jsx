import React, { Component, PropTypes as T } from 'react'
import debounce from 'lodash/debounce'
import moment from 'moment'
import classes from 'classnames'
import ProgressBar from 'react-bootstrap/lib/ProgressBar'

const AudioProgress = props =>
  <ProgressBar now={((props.current * 100) / props.total)} />

AudioProgress.propTypes = {
  current: T.number,
  total: T.number.isRequired
}

AudioProgress.defaultType = {
  current: 0
}

const Time = props => {
  const format = props.showHours ? 'hh:mm:ss' : 'mm:ss'
  return (
    <small className={classes('audio-time text-muted', props.className)}>
      {moment({
        hours: Math.floor(props.seconds / 3600),
        minutes: Math.floor((props.seconds % 3600) / 60),
        seconds: (props.seconds % 3600) % 60,
        milliseconds: props.seconds % 1
      }).format(format)}
    </small>
  )
}

Time.propTypes = {
  seconds: T.number,
  showHours: T.bool,
  className: T.string
}

Time.defaultProps = {
  seconds: 0,
  showHours: true,
  className: null
}

const AudioTimes = props => {
  const showHours = 0 !== ((props.total - (props.total % 3600)) / 3600)

  return (
    <div className="audio-times">
      <Time seconds={props.current} showHours={showHours} />
      <Time seconds={props.total} showHours={showHours} className="pull-right" />
    </div>
  )
}

AudioTimes.propTypes = {
  current: T.number,
  total: T.number.isRequired
}

AudioTimes.defaultType = {
  current: 0
}

class AudioPlayer extends Component {
  constructor() {
    super()
    this.waveform = null
    this.redraw = debounce(() => {
      this.waveform.empty()
      this.waveform.drawBuffer()
    }, 150)

    this.state = {
      loading: true,
      playing: false,
      currentTime: 0,
      totalTime: 0
    }
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
    })

    this.waveform.load(this.props.audioFile);

    this.waveform.on('ready', () => {
      this.setState(() => ({
        loading: false,
        totalTime: this.waveform.getDuration()
      }))
    })

    this.waveform.on('audioprocess', this.updateCurrentTime.bind(this))

    window.addEventListener('resize', this.redraw.bind(this))
  }

  updateCurrentTime() {
    this.setState(() => ({
      currentTime: this.waveform.getCurrentTime()
    }))
  }

  playPause() {
    this.setState((prevState) => ({
      playing: !prevState.playing
    }))

    this.waveform.playPause()
  }

  renderProgress() {
    return (
      <div>
        <AudioTimes current={this.state.currentTime} total={this.state.totalTime} />
        <AudioProgress current={this.state.currentTime} total={this.state.totalTime} />
      </div>
    )
  }

  renderLoading() {
    return (
      <div>
        Loading audio file...
      </div>
    )
  }

  render() {
    return (
      <div className="audio-player">
        <div className="audio-buttons">
          <button
            type="button"
            className={classes('btn', !this.state.playing ? 'btn-primary' : 'btn-warning')}
            onClick={() => this.playPause()}
          >
            <span className={classes('fa fa-fw', !this.state.playing ? 'fa-play' : 'fa-pause')}></span>
          </button>
        </div>
        <div className="audio-waveform">
          <div id="waveform"></div>

          {this.state.loading ? this.renderLoading() : this.renderProgress()}
        </div>
      </div>
    )
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.redraw.bind(this))
    this.waveform.destroy()
  }
}

AudioPlayer.propTypes = {
  audioFile: T.string.isRequired
}

export {AudioPlayer}
