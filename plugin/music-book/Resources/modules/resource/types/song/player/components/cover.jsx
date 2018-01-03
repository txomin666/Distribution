import React from 'react'
import {PropTypes as T} from 'prop-types'

const Cover = props =>
  <img className="song-cover img-responsive" src={props.img} />

Cover.propTypes = {
  img: T.string.isRequired
}

export {Cover}
