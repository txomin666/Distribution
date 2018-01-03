import React from 'react'
import {PropTypes as T} from 'prop-types'

import {EmptyPlaceholder} from '#/main/core/layout/components/placeholder.jsx'

import InstrumentItem from './item.jsx'
import InstrumentModal from './modal.jsx'

const InstrumentMenu = props =>
  <div>
    <button
      type="button"
      className="instrument-select btn btn-block"
      onClick={() => props.handleSelect()}
    >
      {null === props.selected ?
        <EmptyPlaceholder
          size="lg"
          title="no instrument selected"
          help="click here to select one and start the tuner."
        /> :
        <InstrumentItem
          instrument={props.selected}
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

export {
  InstrumentMenu
}
