import React, { Component } from 'react'

const T = React.PropTypes

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
