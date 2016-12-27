import React, { PropTypes as T } from 'react'

const Cover = props =>
  <img className="song-cover img-responsive" src={props.img} />

Cover.propTypes = {
  img: T.string.isRequired
}

export {Cover}
