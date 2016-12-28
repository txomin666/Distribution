import React, { PropTypes as T } from 'react'
import { connect } from 'react-redux'

import {actions} from './../../actions'

import { Layout } from './../../components/layout.jsx'
import { AudioPlayer } from './../../../audio/components/audio-player.jsx'
import { Cover } from './../../player/components/cover.jsx'
import { Tracks } from './../../player/components/tracks.jsx'
import { Tags } from './../../player/components/tags.jsx'
import { Artists } from './../../player/components/artists.jsx'
import { Meta } from './meta.jsx'

const Editor = props =>
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
      <Meta
        releaseDate={props.song.releaseDate}
        tempo={props.song.tempo}
        onChange={props.updateMeta}
      />
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

Editor.propTypes = {
  song: T.shape({
    releaseDate: T.string,
    tempo: T.number,
    audio: T.string,
    tracks: T.array,
    artists: T.array
  }).isRequired,
  updateMeta: T.func.isRequired
}

function mapStateToProps(state) {
  return {
    song: state.song
  }
}

const ConnectedEditor = connect(mapStateToProps, actions)(Editor)

export {ConnectedEditor as Editor}
