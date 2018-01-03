import React from 'react'
import {PropTypes as T} from 'prop-types'

const Tags = props =>
  <div className="tags">
    {props.tags.map((tag, index) => (
      <span key={index} className="label label-default">{tag}</span>
    ))}
  </div>

Tags.propTypes = {
  tags: T.array.isRequired
}

export {Tags}
