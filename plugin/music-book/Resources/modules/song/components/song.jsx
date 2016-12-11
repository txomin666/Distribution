import React, { Component } from 'react'
import { connect } from 'react-redux'

import { tex } from '#/main/core/translation/index'
import ResourceHeader from '#/main/core/layout/resource/components/resource-header.jsx'
import { actions } from './../actions/index'
import AudioPlayer from '../../audio/components/audio-player.jsx'

const T = React.PropTypes

const node = {
  name: "Pandemonic Hyperblast",
  actions: [
    {
      icon: 'fa fa-fw fa-pencil',
      label: 'Edit',
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
            <div className="panel panel-default">
                <img className="img-responsive" src="/CodexNecro.jpg" />
                <div className="panel-body">
                  <Artists
                    artists={this.props.song.artists}
                  />
                  <div className="text-muted">
                    2009
                  </div>
                  <div className="label label-default">
                    black metal
                  </div>
                </div>
            </div>
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
