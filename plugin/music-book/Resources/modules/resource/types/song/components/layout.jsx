import React from 'react'
import {PropTypes as T} from 'prop-types'
import classes from 'classnames'

import {trans} from '#/main/core/translation'

const Layout = props =>
  <div className={classes('row', props.className)}>
    <div className="col-md-3 col-sm-12">
      <div className="row">
        <div className="col-md-12 col-sm-5">
          {props.cover}
        </div>

        <div className="col-md-12 col-sm-7">
          <h2 className="sr-only">{trans('song_artists', {}, 'resource')}</h2>
          {props.artists}

          <h2 className="sr-only">{trans('song_meta', {}, 'resource')}</h2>
          {props.meta}

          <h2 className="sr-only">{trans('song_tags', {}, 'resource')}</h2>
          {props.tags}
        </div>
      </div>
    </div>

    <div className="col-md-9 col-sm-12">
      {props.audio}

      <h2>
        <span className="fa fa-fw fa-list icon-with-text-right" />
        {trans('song_tracks', {}, 'resource')}
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
