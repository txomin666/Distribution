import React, { Component } from 'react'

const T = React.PropTypes

export default class InstrumentPreview extends Component {
  render() {
    return (
      <div className="instrument-preview">

      </div>
    )
  }
}

InstrumentPreview.propTypes = {
  instrument: T.object.isRequired
}
