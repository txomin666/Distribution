import React, { Component } from 'react'
import { connect } from 'react-redux'
import debounce from 'lodash/debounce'

import { tex } from '#/main/core/translation/index'
import ResourceHeader from '#/main/core/layout/resource/components/resource-header.jsx'
import { actions } from './../actions/index'

const T = React.PropTypes

const node = {
  name: "Pandemonic Hyperblast",
  actions: [
    {
      icon: 'fa fa-fw fa-pencil',
      label: 'Edit song',
      handleAction: () => true,
      primary: true
    },
    {
      icon: 'fa fa-fw fa-download',
      label: 'Import QTI questions',
      handleAction: () => true,
      primary: false
    },
    {
      icon: 'fa fa-fw fa-file',
      label: 'Manage medias',
      handleAction: () => true,
      primary: false
    }
  ]
}

class AudioPlayer extends Component {
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

class ArtistLink extends Component {
  render() {
    return (
      <a href="">{this.props.artist.name}</a>
    )
  }
}

ArtistLink.propTypes = {
  artist: T.object.isRequired
}

class Artists extends Component {
  /**
   * Creates a list of links to artist page separated by ",".
   *
   * @returns {XML}
   */
  render() {
    return (
      <div>
        {this.props.artists.map((artist, index) => (
          (index === this.props.artists.length - 1) ?
            <ArtistLink key={artist.id} artist={artist} /> : [<ArtistLink key={artist.id} artist={artist} />, ", "]
        ))}
      </div>
    )
  }
}

Artists.propTypes = {
  artists: T.array
}

Artists.defaultProps = {
  artists: []
}

class Cover extends Component {
  render() {
    return (
      <div className="song-cover">
        <span className="fa fa-ban"></span>
      </div>
    )
  }
}

class Song extends Component {
  render() {
    return (
      <div>
        <ResourceHeader
          resourceNode={node}
        />

        <div className="row">
          <div className="col-md-3 col-sm-3">
            <img className="img-responsive" src="/CodexNecro.jpg" />

            <ul className="list-group">
              <li className="list-group-item">
                <label>Artist</label>
                <Artists
                  artists={this.props.song.artists}
                />
              </li>
              <li className="list-group-item">
                <label>Release date</label>
                <span className="text-muted">
                  2009
                </span>
              </li>
              <li className="list-group-item">
                <label>Genre</label>
                <span className="label label-default">
                  black metal
                </span>
              </li>
            </ul>
          </div>
          <div className="col-md-9">
            <AudioPlayer />


          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    song: state.song
  }
}

export default connect(mapStateToProps, actions)(Song)
