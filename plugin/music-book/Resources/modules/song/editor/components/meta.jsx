import React, { PropTypes as T } from 'react'

import { tex } from '#/main/core/translation/index'

const Meta = props =>
  <div className="meta panel panel-default">
    <div className="panel-body">
      <div className="form-group">
        <label htmlFor="releaseDate">{tex('song_release_date', 'resource')}</label>
        <input
          id="releaseDate"
          type="text"
          className="form-control"
          value={props.releaseDate}
          onChange={e => props.onChange('releaseDate', e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="tempo">{tex('song_tempo', 'resource')}</label>
        <input
          id="tempo"
          type="number"
          className="form-control"
          value={props.tempo}
          onChange={e => props.onChange('tempo', e.target.value*1)}
        />
      </div>
    </div>
  </div>

Meta.propTypes = {
  releaseDate: T.string,
  tempo: T.number,
  onChange: T.func.isRequired
}

Meta.defaultProps = {
  releaseDate: null,
  tempo: null
}

export {Meta}
