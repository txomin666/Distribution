import React from 'react'
import {PropTypes as T} from 'prop-types'

import {toKey} from '#/main/core/scaffolding/text/utils'

const ContentHelp = props => Array.isArray(props.help) ?
  <ul className="help-block-list">
    {props.help.map(help =>
      <li key={toKey(help)} className="help-block">
        <span className="help-icon fa fa-fw fa-info-circle" />
        {help}
      </li>
    )}
  </ul>
  :
  <span className="help-block">
    <span className="help-icon fa fa-fw fa-info-circle" />
    {props.help}
  </span>

ContentHelp.propTypes = {
  help: T.oneOfType([
    T.string,           // a single help message
    T.arrayOf(T.string) // a list of help messages
  ]).isRequired
}

export {
  ContentHelp
}
