import React, {Component} from 'react'
import {connect} from 'react-redux'
import {PropTypes as T} from 'prop-types'
import classes from 'classnames'
import moment from 'moment'

import {registry} from '#/main/app/modals/registry'
import {Modal} from '#/main/app/overlay/modal/components/modal'

import {Textarea} from '#/main/core/layout/form/components/field/textarea'
import {trans} from '#/main/core/translation'
import {Date} from '#/main/core/layout/form/components/field/date'

import {actions} from '../actions'

export const MODAL_EVENT_FORM = 'MODAL_EVENT_FORM'

class EventFormModal  extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hasError: false,
      nameError: null,
      startDateError: null,
      endDateError: null,
      registrationTypeError: null,
      name: props.event.name ? props.event.name : undefined,
      description: props.event.description ? props.event.description : undefined,
      registrationType: props.event.registrationType ? props.event.registrationType : undefined,
      maxUsers: props.event.maxUsers ? props.event.maxUsers : undefined,
      startDate: props.event.startDate,
      endDate: props.event.endDate,
      location: props.event.location ? props.event.location.id : undefined,
      locationExtra: props.event.locationExtra ? props.event.locationExtra : undefined,
      teachers: props.event.tutors ? props.event.tutors.map(t => t.id) : [],
      isAgendaEvent: props.event.type === 1,
      eventSet: props.event.eventSet ? props.event.eventSet.name : undefined
    }
  }

  updateEventProps(property, value) {
    const data = []

    switch (property) {
      case 'name':
        this.setState({name: value})
        break
      case 'description':
        this.setState({description: value})
        break
      case 'registrationType':
        this.setState({registrationType: parseInt(value)})
        break
      case 'maxUsers':
        this.setState({maxUsers: value})
        break
      case 'startDate':
        this.setState({startDate: value})
        break
      case 'endDate':
        this.setState({endDate: value})
        break
      case 'location':
        this.setState({location: value})
        break
      case 'locationExtra':
        this.setState({locationExtra: value})
        break
      case 'teachers':
        for (let i = 0; i < value.length; ++i) {
          if (value[i]['selected']) {
            data.push(value[i]['value'])
          }
        }
        this.setState({teachers: data})
        break
      case 'isAgendaEvent':
        this.setState({isAgendaEvent: value})
        break
      case 'eventSet':
        this.setState({eventSet: value})
        break
    }
  }

  registerSessionEvent() {
    if (!this.state['hasError']) {
      if (this.props.mode === 'creation') {
        this.props.confirmAction(this.props.session.id, this.state)
      } else if (this.props.mode === 'edition') {
        this.props.confirmAction(this.props.event.id, this.state)
      }
      this.props.fadeModal()
    }
  }

  validateSessionEvent() {
    const validation = {
      hasError: false,
      nameError: null,
      startDateError: null,
      endDateError: null,
      maxUsersError: null,
      registrationTypeError: null
    }

    if (!this.state['name']) {
      validation['nameError'] = trans('form_not_blank_error', {}, 'cursus')
      validation['hasError'] = true
    }
    if (!moment(this.state['startDate']).isValid()) {
      validation['startDateError'] = trans('form_not_valid_error', {}, 'cursus')
      validation['hasError'] = true
    }
    if (!moment(this.state['endDate']).isValid()) {
      validation['endDateError'] = trans('form_not_valid_error', {}, 'cursus')
      validation['hasError'] = true
    }
    if (this.state['maxUsers'] !== undefined && this.state['maxUsers'] !== null && this.state['maxUsers'] !== '' &&
      (isNaN(parseInt(this.state['maxUsers'])) || parseInt(this.state['maxUsers']) < 0)
    ) {
      validation['maxUsersError'] = trans('form_number_superior_error', {value: 0}, 'cursus')
      validation['hasError'] = true
    }
    if (parseInt(this.state['registrationType']) === 2 && !this.props.session.publicRegistration) {
      validation['registrationTypeError'] = trans('form_public_session_event_error', {}, 'cursus')
      validation['hasError'] = true
    }
    this.setState(validation, this.registerSessionEvent)
  }

  componentDidMount() {
    this.props.loadLocations()
    this.props.loadTeachers()
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
                onChange={e => this.updateEventProps('name', e.target.value)}
              />
              {this.state.nameError &&
                <div className="help-block field-error">
                  {this.state.nameError}
                </div>
              }
            </div>
          </div>

          <div className="form-group row">
            <div className="control-label col-md-3">
              <label>{trans('description')}</label>
            </div>
            <div className="col-md-9">
              <Textarea
                id="event-form-description"
                value={this.state.description}
                onChange={text => this.updateEventProps('description', text)}
              />
            </div>
          </div>

          <div className={classes('form-group row', {'has-error': this.state.startDateError})}>
            <div className="control-label col-md-3">
              <label htmlFor="startDate">{trans('start_date')}</label>
            </div>
            <div className="col-md-9">
              <Date
                id="startDate"
                value={this.state.startDate}
                onChange={date => this.updateEventProps('startDate', date)}
                time={true}
              />
              {this.state.startDateError &&
                <div className="help-block field-error">
                  {this.state.startDateError}
                </div>
              }
            </div>
          </div>

          <div className={classes('form-group row', {'has-error': this.state.endDateError})}>
            <div className="control-label col-md-3">
              <label htmlFor="endDate">{trans('end_date')}</label>
            </div>
            <div className="col-md-9">
              <Date
                id="endDate"
                defaultValue={this.state.endDate}
                onChange={date => this.updateEventProps('endDate', date)}
                time={true}
              />

              {this.state.endDateError &&
                <div className="help-block field-error">
                  {this.state.endDateError}
                </div>
              }
            </div>
          </div>

          <div className={classes('form-group row', {'has-error': this.state.registrationTypeError})}>
            <div className="control-label col-md-3">
              <label>{trans('session_event_registration', {}, 'cursus')}</label>
            </div>
            <div className="col-md-9">
              <select
                className="form-control"
                value={this.state.registrationType}
                onChange={e => this.updateEventProps('registrationType', e.target.value)}
              >
                <option value="0">{trans('event_registration_automatic', {}, 'cursus')}</option>
                <option value="1">{trans('event_registration_manual', {}, 'cursus')}</option>
                <option className={classes({'text-muted': !this.props.session.publicRegistration})} value="2">
                  {trans('event_registration_public', {}, 'cursus')}
                </option>
              </select>
              {this.state.registrationTypeError &&
                <div className="help-block field-error">
                  {this.state.registrationTypeError}
                </div>
              }
            </div>
          </div>

          <div className={classes('form-group row', {'has-error': this.state.maxUsersError})}>
            <div className="control-label col-md-3">
              <label>{trans('max_users', {}, 'cursus')}</label>
            </div>
            <div className="col-md-9">
              <input
                type="number"
                className="form-control"
                value={this.state.maxUsers}
                min="0"
                onChange={e => this.updateEventProps('maxUsers', e.target.value)}
              />
              {this.state.maxUsersError &&
                <div className="help-block field-error">
                  {this.state.maxUsersError}
                </div>
              }
            </div>
          </div>

          <div className="form-group row">
            <div className="control-label col-md-3">
              <label>{trans('location')}</label>
            </div>
            <div className="col-md-9">
              <select
                className="form-control"
                value={this.state.location}
                onChange={e => this.updateEventProps('location', e.target.value)}
              >
                <option value="0"></option>
                {this.props.locations.map((l, idx) =>
                  <option key={idx} value={l.id}>{l.name}</option>
                )}
              </select>
            </div>
          </div>

          <div className="form-group row">
            <div className="control-label col-md-3">
              <label>{trans('location_extra', {}, 'cursus')}</label>
            </div>
            <div className="col-md-9">
              <Textarea
                id="event-form-location-extra"
                value={this.state.locationExtra}
                onChange={text => this.updateEventProps('locationExtra', text)}
              />
            </div>
          </div>

          <div className="form-group row">
            <div className="control-label col-md-3">
              <label>{trans('tutors', {}, 'cursus')}</label>
            </div>
            <div className="col-md-9">
              <select
                className="form-control"
                value={this.state.teachers}
                onChange={e => this.updateEventProps('teachers', e.target.options)}
                multiple
              >
                <option value="0"></option>
                {this.props.teachers.map((t, idx) =>
                  <option key={idx} value={t.id}>{t.firstName} {t.lastName}</option>
                )}
              </select>
            </div>
          </div>

          {this.state.registrationType === 2 &&
            <div className="form-group row">
              <label className="control-label col-md-3">
                {trans('group')}
              </label>
              <div className="col-md-9">
                <input
                  type="text"
                  className="form-control"
                  value={this.state.eventSet}
                  onChange={e => this.updateEventProps('eventSet', e.target.value)}
                />
              </div>
            </div>
          }
          <div className="form-group row">
            <label className="control-label col-md-3">
              {trans('show_in_agenda', {}, 'cursus')}
            </label>
            <div className="col-md-9">
              <input
                type="checkbox"
                checked={this.state.isAgendaEvent}
                onChange={e => this.updateEventProps('isAgendaEvent', e.target.checked)}
              />
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-default" onClick={this.props.fadeModal}>
            {trans('cancel')}
          </button>
          <button className="btn btn-primary" onClick={() => this.validateSessionEvent()}>
            {trans('ok')}
          </button>
        </div>
      </Modal>
    )
  }
}

EventFormModal.propTypes = {
  event: T.shape({
    id: T.number,
    name: T.string,
    description: T.string,
    startDate: T.string,
    endDate: T.string,
    registrationType: T.number.isRequired,
    maxUsers: T.number,
    location: T.object,
    locationExtra: T.string,
    tutors: T.array,
    type: T.number,
    eventSet: T.object
  }).isRequired,
  mode: T.string.isRequired,
  session: T.object,
  locations: T.array,
  teachers: T.array,
  fadeModal: T.func.isRequired,
  hideModal: T.func.isRequired,
  confirmAction: T.func.isRequired,
  loadLocations: T.func,
  loadTeachers: T.func
}

function mapStateToProps(state) {
  return {
    locations: state.locations,
    teachers: state.teachers
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadLocations: () => dispatch(actions.getAllLocations()),
    loadTeachers: () => dispatch(actions.getSessionTeachers())
  }
}

const ConnectedEventFormModal = connect(mapStateToProps, mapDispatchToProps)(EventFormModal)

registry.add(MODAL_EVENT_FORM, ConnectedEventFormModal)

export {ConnectedEventFormModal as EventFormModal}
