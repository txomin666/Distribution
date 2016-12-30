import React, { PropTypes as T } from 'react'

import { Placeholder } from './../../components/placeholder.jsx'
import InstrumentItem from './item.jsx'
import InstrumentModal from './modal.jsx'

const InstrumentMenu = props =>
  <div>
    <button
      type="button"
      className="instrument-select btn btn-block"
      onClick={() => this.props.handleSelect()}
    >
      {null === this.props.selected ?
        <Placeholder
          title="no instrument selected"
          help="click here to select one and start the tuner."
        /> :
        <InstrumentItem
          instrument={this.props.selected}
        />
      }
    </button>
    <InstrumentModal
      show={false}
      onSelect={() => true}
    />
  </div>

InstrumentMenu.propTypes = {
  selected: T.object,
  handleSelect: T.func.isRequired
}

InstrumentMenu.defaultProps = {
  selected: null
}

export default InstrumentMenu
