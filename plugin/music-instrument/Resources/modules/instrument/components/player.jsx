import React, { Component } from 'react'

const T = React.PropTypes

/**
 * Renders a playable instrument visualization.
 */
export default class InstrumentPlayer extends Component {
  render() {
    return (
      <div className="instrument-player">

      </div>
    )
  }
}

InstrumentPlayer.propTypes = {
  instrument: T.object.isRequired
}
