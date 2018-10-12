import React from 'react'
import {PropTypes as T} from 'prop-types'
import {connect} from 'react-redux'

import {trans} from '#/main/core/translation'

import {FormSections, FormSection} from '#/main/app/content/form/components/sections'
import {FormData} from '#/main/app/content/form/containers/data'
import {ListData} from '#/main/app/content/list/containers/data'
import {selectors as formSelect} from '#/main/app/content/form/store/selectors'
import {actions as modalActions} from '#/main/app/overlay/modal/store'
import {MODAL_DATA_LIST} from '#/main/app/modals/list'
import {CALLBACK_BUTTON, LINK_BUTTON} from '#/main/app/buttons'
import {actions} from '#/main/core/administration/user/location/actions'
import {OrganizationList} from '#/main/core/administration/user/organization/components/organization-list'
import {UserList} from '#/main/core/administration/user/user/components/user-list'
import {GroupList} from '#/main/core/administration/user/group/components/group-list'

import {locationTypes} from '#/main/core/administration/user/location/constants'

const LocationForm = props =>
  <FormData
    level={3}
    name="locations.current"
    buttons={true}
    target={(location, isNew) => isNew ?
      ['apiv2_location_create'] :
      ['apiv2_location_update', {id: location.id}]
    }
    cancel={{
      type: LINK_BUTTON,
      target: '/locations',
      exact: true
    }}
    sections={[
      {
        title: trans('general'),
        primary: true,
        fields: [
          {name: 'name', type: 'string', label: trans('name'), required: true},
          {name: 'meta.type', type: 'choice', label: trans('type'), options: {condensed: true, choices: locationTypes}}
        ]
      }, {
        title: trans('contact'),
        icon: 'fa fa-fw fa-address-card',
        fields: [
          {name: 'phone', type: 'text', label: trans('phone')},
          {name: 'street', type: 'string', label: trans('street'), required: true},
          {name: 'boxNumber', type: 'string', label: trans('box_number')},
          {name: 'streetNumber', type: 'string', label: trans('street_number'), required: true},
          {name: 'zipCode', type: 'string', label: trans('postal_code'), required: true},
          {name: 'town', type: 'string', label: trans('town'), required: true},
          {name: 'country', type: 'string', label: trans('country'), required: true}
        ]
      }, {
        title: trans('geolocation'),
        icon: 'fa fa-fw fa-map-marker',
        fields: [
          {name: 'gps.latitude', type: 'number', label: trans('latitude')}, // todo make a field
          {name: 'gps.longitude', type: 'number', label: trans('longitude')}
        ]
      }
    ]}
  >
    <FormSections
      level={3}
    >
      <FormSection
        className="embedded-list-section"
        icon="fa fa-fw fa-user"
        title={trans('users')}
        disabled={props.new}
        actions={[
          {
            type: CALLBACK_BUTTON,
            icon: 'fa fa-fw fa-plus',
            label: trans('add_user'),
            callback: () => props.pickUsers(props.location.id)
          }
        ]}
      >
        <ListData
          name="locations.current.users"
          fetch={{
            url: ['apiv2_location_list_users', {id: props.location.id}],
            autoload: props.location.id && !props.new
          }}
          primaryAction={UserList.open}
          delete={{
            url: ['apiv2_location_remove_users', {id: props.location.id}]
          }}
          definition={UserList.definition}
          card={UserList.card}
        />
      </FormSection>

      <FormSection
        className="embedded-list-section"
        icon="fa fa-fw fa-users"
        title={trans('groups')}
        disabled={props.new}
        actions={[
          {
            type: CALLBACK_BUTTON,
            icon: 'fa fa-fw fa-plus',
            label: trans('add_group'),
            callback: () => props.pickGroups(props.location.id)
          }
        ]}
      >
        <ListData
          name="locations.current.groups"
          fetch={{
            url: ['apiv2_location_list_groups', {id: props.location.id}],
            autoload: props.location.id && !props.new
          }}
          primaryAction={GroupList.open}
          delete={{
            url: ['apiv2_location_remove_groups', {id: props.location.id}]
          }}
          definition={GroupList.definition}
          card={GroupList.card}
        />
      </FormSection>

      <FormSection
        className="embedded-list-section"
        icon="fa fa-fw fa-building"
        title={trans('organizations')}
        disabled={props.new}
        actions={[
          {
            type: CALLBACK_BUTTON,
            icon: 'fa fa-fw fa-plus',
            label: trans('add_organizations'),
            callback: () => props.pickOrganizations(props.location.id)
          }
        ]}
      >
        <ListData
          name="locations.current.organizations"
          fetch={{
            url: ['apiv2_location_list_organizations', {id: props.location.id}],
            autoload: props.location.id && !props.new
          }}
          primaryAction={OrganizationList.open}
          delete={{
            url: ['apiv2_location_remove_organizations', {id: props.location.id}]
          }}
          definition={OrganizationList.definition}
          card={OrganizationList.card}
        />
      </FormSection>
    </FormSections>
  </FormData>

LocationForm.propTypes = {
  new: T.bool.isRequired,
  location: T.shape({
    id: T.string
  }).isRequired,
  pickUsers: T.func.isRequired,
  pickGroups: T.func.isRequired,
  pickOrganizations: T.func.isRequired
}

const Location = connect(
  state => ({
    new: formSelect.isNew(formSelect.form(state, 'locations.current')),
    location: formSelect.data(formSelect.form(state, 'locations.current'))
  }),
  dispatch =>({
    pickUsers(locationId) {
      dispatch(modalActions.showModal(MODAL_DATA_LIST, {
        icon: 'fa fa-fw fa-user',
        title: trans('add_users'),
        confirmText: trans('add'),
        name: 'users.picker',
        definition: UserList.definition,
        card: UserList.card,
        fetch: {
          url: ['apiv2_user_list'],
          autoload: true
        },
        handleSelect: (selected) => dispatch(actions.addUsers(locationId, selected))
      }))
    },
    pickGroups(locationId) {
      dispatch(modalActions.showModal(MODAL_DATA_LIST, {
        icon: 'fa fa-fw fa-users',
        title: trans('add_groups'),
        confirmText: trans('add'),
        name: 'groups.picker',
        definition: GroupList.definition,
        card: GroupList.card,
        fetch: {
          url: ['apiv2_group_list'],
          autoload: true
        },
        handleSelect: (selected) => dispatch(actions.addGroups(locationId, selected))
      }))
    },
    pickOrganizations(locationId) {
      dispatch(modalActions.showModal(MODAL_DATA_LIST, {
        icon: 'fa fa-fw fa-buildings',
        title: trans('add_organizations'),
        confirmText: trans('add'),
        name: 'organizations.picker',
        definition: OrganizationList.definition,
        card: OrganizationList.card,
        fetch: {
          url: ['apiv2_organization_list'],
          autoload: true
        },
        handleSelect: (selected) => dispatch(actions.addOrganizations(locationId, selected))
      }))
    }
  })
)(LocationForm)

export {
  Location
}
