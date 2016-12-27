import React, { PropTypes as T } from 'react'

import {Layout} from './../../components/layout.jsx'

const Editor = props =>
  <Layout
    className="song-editor"

  />

Editor.propTypes = {
  song: T.shape({
    audio: T.string,
    tracks: T.array,
    artists: T.array,
  }).isRequired
}

Editor.defaultProps = {

}

export {Editor}
