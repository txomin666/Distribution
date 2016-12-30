import React, { PropTypes as T } from 'react'

const Editor = props =>
  <div className="keyboard-editor">
    <div className="panel panel-default">
      <div className="panel-body">
        <div className="form-group">
          <label htmlFor="keys">Number of keys</label>
          <input type="number" id="keys" className="form-control" value="" />
        </div>
      </div>
    </div>
  </div>

Editor.propTypes = {

}

export { Editor }