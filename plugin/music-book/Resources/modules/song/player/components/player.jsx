import React, { PropTypes as T } from 'react'

import {Layout} from './../../components/layout.jsx'

const Player = props =>
  <Layout
    className="song-player"
    cover={}
    audio={}
    meta={}
    artists={}
    tags={}
    tracks={}
  />

Player.propTypes = {
  song: T.shape({
    audio: T.string,
    tracks: T.array,
    artists: T.array,
  }).isRequired
}

Player.defaultProps = {

}

export {Player}
