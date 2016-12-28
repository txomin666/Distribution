import React, { PropTypes as T } from 'react'

import { tex } from '#/main/core/translation/index'

const Meta = props =>
  <div className="meta panel panel-default">
    <div className="panel-body">
      <div className="form-group">
        <label>{tex('song_release_date', 'resource')}</label>
        <div className="text-muted pull-right">{props.releaseDate}</div>
      </div>

      <div className="form-group">
        <label>{tex('song_tempo', 'resource')}</label>
        <div className="text-muted pull-right">{props.tempo}</div>
      </div>
    </div>
  </div>

Meta.propTypes = {
  releaseDate: T.string,
  tempo: T.number
}

export {Meta}
