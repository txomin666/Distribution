import React, { PropTypes as T } from 'react'
import { connect } from 'react-redux'

import { Layout } from './../../components/layout.jsx'
import { AudioPlayer } from './../../../audio/components/audio-player.jsx'
import { Cover } from './cover.jsx'
import { Tracks } from './tracks.jsx'
import { Tags } from './tags.jsx'
import { Artists } from './artists.jsx'
import { Meta } from './meta.jsx'

const Player = props =>
  <Layout
    className="song-player"
    cover={
      <Cover img={props.song.cover} />
    }
    audio={
      <div className="panel panel-default">
        <AudioPlayer audioFile={props.song.audio} />
      </div>
    }
    meta={
      <Meta releaseDate={props.song.releaseDate} tempo={props.song.tempo} />
    }
    artists={
      <div className="panel panel-default">
        <Artists artists={props.song.artists} />
      </div>
    }
    tags={
      <Tags tags={props.song.tags} />
    }
    tracks={
      <Tracks tracks={props.song.tracks} />
    }
  />

Player.propTypes = {
  song: T.shape({
    audio: T.string,
    tracks: T.array,
    artists: T.array
  }).isRequired
}

function mapStateToProps(state) {
  return {
    song: state.song
  }
}

Player.propTypes = {
  song: T.object.isRequired
}

const ConnectedPlayer = connect(mapStateToProps)(Player)

export {ConnectedPlayer as Player}
