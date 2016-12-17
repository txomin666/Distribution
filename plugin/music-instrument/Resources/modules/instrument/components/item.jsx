import React, { Component } from 'react'

const T = React.PropTypes

/**
 * Renders a small representation of an instrument.
 */
export default class InstrumentItem extends Component {
  render() {
    return (
      <div className="instrument-item">

      </div>
    )
  }
}

InstrumentItem.propTypes = {
  instrument: T.object.isRequired
}
