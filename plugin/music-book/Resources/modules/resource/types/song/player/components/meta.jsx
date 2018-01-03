import React from 'react'
import {PropTypes as T} from 'prop-types'

import {trans} from '#/main/core/translation'

const Meta = props =>
  <div className="panel panel-default">
    <ul className="list-group list-group-values">
      <li className="list-group-item">
        {trans('song_release_date', {}, 'resource')}
        <span className="value">{props.releaseDate}</span>
      </li>

      <li className="list-group-item">
        {trans('song_tempo', {}, 'resource')}
        <span className="value">{props.tempo}</span>
      </li>
    </ul>
  </div>

Meta.propTypes = {
  releaseDate: T.string,
  tempo: T.number
}

export {
  Meta
}
