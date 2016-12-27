import React, { PropTypes as T } from 'react'

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
