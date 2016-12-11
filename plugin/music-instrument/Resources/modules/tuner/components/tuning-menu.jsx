import React, { Component } from 'react'
import { DropdownButton, MenuItem } from 'react-bootstrap'

const T = React.PropTypes

export default class TuningMenu extends Component {
  render() {
    return (
      <DropdownButton
        id="dropdown-select-tuning"
        title={null !== this.props.selected ? `${this.props.selected.name}` : '-- no tuning selected --'}
        bsStyle="default"
      >
        {this.props.tunings.map((tuning) => (
          <MenuItem
            key={tuning.id}
            onSelect={() => this.props.handleSelect(tuning) }
            active={null !== this.props.selected && this.props.selected.id === tuning.id}
          >
            {tuning.name}
          </MenuItem>
        ))}
      </DropdownButton>
    )
  }
}

TuningMenu.propTypes = {
  selected: T.object,
  tunings: T.array.isRequired,
  handleSelect: T.func.isRequired
}

TuningMenu.defaultProps = {
  selected: null
}
