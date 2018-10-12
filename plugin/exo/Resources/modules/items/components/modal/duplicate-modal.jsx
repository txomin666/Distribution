import React, {Component} from 'react'
import {PropTypes as T} from 'prop-types'
import omit from 'lodash/omit'

import {trans, tex} from '#/main/core/translation'
import {registry} from '#/main/app/modals/registry'
import {Modal} from '#/main/app/overlay/modal/components/modal'
import {FormGroup} from '#/main/core/layout/form/components/group/form-group'

export const MODAL_DUPLICATE_ITEM = 'MODAL_DUPLICATE_ITEM'

class DuplicateItemModal extends Component {
  constructor(props) {
    super(props)

    this.state = {value: 1}
  }

  handleChange(value) {
    this.setState({value})
  }

  duplicate() {
    this.props.handleSubmit(this.state.value)
    this.props.fadeModal()
  }

  render() {
    return (
      <Modal
        {...omit(this.props, 'handleSubmit')}
      >
        <div className="modal-body">
          <FormGroup
            id="item-duplicate-amount"
            label={tex('amount')}
          >
            <input
              id="item-duplicate-amount"
              type="number"
              min={1}
              autoFocus={true}
              className="form-control"
              value={this.state.value}
              onChange={e => this.handleChange(parseInt(e.target.value))}
            />
          </FormGroup>
        </div>

        <button
          className="modal-btn btn btn-primary"
          onClick={() => this.duplicate()}
          type="submit"
        >
          {trans('duplicate')}
        </button>
      </Modal>
    )
  }
}

DuplicateItemModal.propTypes = {
  handleSubmit: T.func.isRequired,
  fadeModal: T.func.isRequired
}

registry.add(MODAL_DUPLICATE_ITEM, DuplicateItemModal)

export {
  DuplicateItemModal
}
