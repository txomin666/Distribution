import {connect} from 'react-redux'
import React, {Component} from 'react'
import {PropTypes as T} from 'prop-types'
import classes from 'classnames'

import {registry} from '#/main/app/modals/registry'
import {Modal} from '#/main/app/overlay/modal/components/modal'
import {trans} from '#/main/core/translation'

import {actions} from '../actions'

export const MODAL_EVENT_SET_FORM = 'MODAL_EVENT_SET_FORM'

class EventSetFormModal  extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hasError: false,
      nameError: null,
      limitError: null,
      name: props.eventSet.name,
      limit: props.eventSet.limit
    }
  }

  updateEventSetProps(property, value) {
    switch (property) {
      case 'name':
        this.setState({name: value})
        break
      case 'limit':
        this.setState({limit: value})
        break
    }
  }

  registerEventSet() {
    if (!this.state['hasError']) {
      this.props.editEventSet(this.props.eventSet.id, this.state)
      this.props.fadeModal()
    }
  }

  validateEventSet() {
    const validation = {
      hasError: false,
      nameError: null,
      limitError: null
    }

    if (!this.state['name']) {
      validation['nameError'] = trans('form_not_blank_error', {}, 'cursus')
      validation['hasError'] = true
    }
    if (!this.state['limit']) {
      validation['limitError'] = trans('form_not_blank_error', {}, 'cursus')
      validation['hasError'] = true
    } else if (isNaN(parseInt(this.state['limit'])) || parseInt(this.state['limit']) < 1) {
      validation['limitError'] = trans('form_number_superior_error', {value: 1}, 'cursus')
      validation['hasError'] = true
    }
    this.setState(validation, this.registerEventSet)
  }

  deleteEventSet() {
    this.props.deleteEventSet(this.props.eventSet['id'])
    this.props.fadeModal()
  }

  render() {
    return (
      <Modal {...this.props}>
        <div className="modal-body">
          <div className={classes('form-group row', {'has-error': this.state.nameError})}>
            <label className="control-label col-md-3">
              {trans('name')}
            </label>
            <div className="col-md-9">
              <input
                type="text"
                className="form-control"
                value={this.state.name}
                onChange={e => this.updateEventSetProps('name', e.target.value)}
              />
              {this.state.nameError &&
                <div className="help-block field-error">
                  {this.state.nameError}
                </div>
              }
            </div>
          </div>

          <div className={classes('form-group row', {'has-error': this.state.limitError})}>
            <div className="control-label col-md-3">
              <label>{trans('limit')}</label>
            </div>
            <div className="col-md-9">
              <input
                type="number"
                className="form-control"
                value={this.state.limit}
                min="1"
                onChange={e => this.updateEventSetProps('limit', e.target.value)}
              />
              {this.state.limitError &&
                <div className="help-block field-error">
                  {this.state.limitError}
                </div>
              }
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-danger pull-left" onClick={() => this.deleteEventSet()}>
            {trans('delete')}
          </button>
          <button className="btn btn-default" onClick={this.props.fadeModal}>
            {trans('cancel')}
          </button>
          <button className="btn btn-primary" onClick={() => this.validateEventSet()}>
            {trans('ok')}
          </button>
        </div>
      </Modal>
    )
  }
}

EventSetFormModal.propTypes = {
  eventSet: T.shape({
    id: T.number,
    name: T.string,
    limit: T.number
  }).isRequired,
  editEventSet: T.func.isRequired,
  deleteEventSet: T.func.isRequired,
  fadeModal: T.func.isRequired,
  hideModal: T.func.isRequired
}

function mapStateToProps() {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {
    editEventSet: (eventSetId, eventSetData) => dispatch(actions.editEventSet(eventSetId, eventSetData)),
    deleteEventSet: (eventSetId) => dispatch(actions.deleteEventSet(eventSetId))
  }
}

const ConnectedEventSetFormModal = connect(mapStateToProps, mapDispatchToProps)(EventSetFormModal)

registry.add(MODAL_EVENT_SET_FORM, ConnectedEventSetFormModal)

export {ConnectedEventSetFormModal as EventSetFormModal}
