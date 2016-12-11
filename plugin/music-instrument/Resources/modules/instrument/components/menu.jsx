import React, { Component } from 'react'

import Placeholder from './../../components/placeholder.jsx'
import InstrumentPreview from './preview.jsx'

const T = React.PropTypes

export default class InstrumentMenu extends Component {
  renderPlaceholder() {
    return (
      <Placeholder
        title="no instrument selected"
        help="click here to select one and start the tuner."
      />
    )
  }

  renderPreview() {
    return (
      <InstrumentPreview />
    )
  }

  render() {
    return (
      <button
        type="button"
        className="instrument-select btn btn-block"
        onClick={() => this.props.handleSelect()}
      >
        {null === this.props.selected ? this.renderPlaceholder() : this.renderPreview()}
      </button>
    )
  }
}

InstrumentMenu.propTypes = {
  selected: T.object,
  handleSelect: T.func.isRequired
}

InstrumentMenu.defaultProps = {
  selected: null
}
