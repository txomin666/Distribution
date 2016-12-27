import React, { PropTypes as T } from 'react'
import { connect } from 'react-redux'

import { tex } from '#/main/core/translation/index'
import { actions } from './../actions'

import { ResourceHeader } from '#/main/core/layout/resource/components/resource-header.jsx'
import { AudioPlayer } from './../../audio/components/audio-player.jsx'
import { Cover } from './../player/components/cover.jsx'
import { Tracks } from './../player/components/tracks.jsx'
import { Tags } from './../player/components/tags.jsx'
import { Artists } from './../player/components/artists.jsx'

const Song = props =>
  <div className="resource">
    <ResourceHeader resourceNode={props.node} />

    <div className="row">
      <div className="col-md-3 col-sm-12">
        <div className="row">
          <div className="col-md-12 col-sm-5">
            <Cover img={props.song.cover} />
          </div>

          <div className="col-md-12 col-sm-7">
            <h2 className="sr-only">Artists</h2>
            <div className="panel panel-default">
              <Artists artists={props.song.artists} />
            </div>

            <h2 className="sr-only">Info</h2>
            <div className="meta panel panel-default">
              <div className="panel-body">
                <div className="form-group">
                  <label>Release date</label>
                  <div className="text-muted pull-right">{props.song.releaseDate}</div>
                </div>

                <div className="form-group">
                  <label>Tempo</label>
                  <div className="text-muted pull-right">{props.song.tempo}</div>
                </div>
              </div>
            </div>

            <h2 className="sr-only">Tags</h2>
            <Tags tags={props.song.tags} />
          </div>
        </div>
      </div>
      <div className="col-md-9 col-sm-12">
        <div className="panel panel-default">
          <AudioPlayer audioFile={props.song.audio} />
        </div>

        <h2 className="h3">
          <span className="fa fa-fw fa-list"></span> Pistes
        </h2>
        <Tracks tracks={props.song.tracks} />
      </div>
    </div>
  </div>

function mapStateToProps(state) {
  return {
    node: state.node,
    song: state.song
  }
}

Song.propTypes = {
  node: T.object.isRequired,
  song: T.object.isRequired
}

const ConnectedSong = connect(mapStateToProps, actions)(Song)

export {ConnectedSong as Song}
