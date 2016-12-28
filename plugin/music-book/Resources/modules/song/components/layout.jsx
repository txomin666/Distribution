import React, { PropTypes as T } from 'react'
import classes from 'classnames'
import { tex } from '#/main/core/translation/index'

const Layout = props =>
  <div className={classes('row song-container', props.className)}>
    <div className="col-md-3 col-sm-12">
      <div className="row">
        <div className="col-md-12 col-sm-5">
          {props.cover}
        </div>

        <div className="col-md-12 col-sm-7">
          <h2 className="sr-only">{tex('song_artists', 'resource')}</h2>
          {props.artists}

          <h2 className="sr-only">{tex('song_meta', 'resource')}</h2>
          {props.meta}

          <h2 className="sr-only">{tex('song_tags', 'resource')}</h2>
          {props.tags}
        </div>
      </div>
    </div>

    <div className="col-md-9 col-sm-12">
      {props.audio}

      <h2 className="h3">
        <span className="fa fa-fw fa-list"></span>
        {tex('song_tracks', 'resource')}
      </h2>
      {props.tracks}
    </div>
  </div>

Layout.propTypes = {
  className: T.string,
  cover: T.node.isRequired,
  audio: T.node.isRequired,
  meta: T.node.isRequired,
  artists: T.node.isRequired,
  tags: T.node.isRequired,
  tracks: T.node.isRequired
}

Layout.defaultTypes = {
  className: null
}

export {Layout}
