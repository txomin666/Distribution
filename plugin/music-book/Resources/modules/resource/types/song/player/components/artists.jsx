import React from 'react'
import {PropTypes as T} from 'prop-types'

const Artists = props =>
  <div className="list-group">
    {props.artists.map(artist => (
      <a key={artist.id} href="" className="list-group-item">
        {artist.name}
      </a>
    ))}
  </div>

Artists.propTypes = {
  artists: T.arrayOf(T.shape({
    id: T.string.isRequired,
    name: T.string.isRequired
  })).isRequired
}

export {Artists}
