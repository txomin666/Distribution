import React from 'react'
import {PropTypes as T} from 'prop-types'
import {connect} from 'react-redux'

import {trans} from '#/main/core/translation'

import {actions as modalActions} from '#/main/app/overlay/modal/store'
import {MODAL_DATA_LIST} from '#/main/app/modals/list'
import {FormData} from '#/main/app/content/form/containers/data'
import {FormSections, FormSection} from '#/main/app/content/form/components/sections'
import {selectors as formSelect} from '#/main/app/content/form/store/selectors'
import {ListData} from '#/main/app/content/list/containers/data'
import {CALLBACK_BUTTON, LINK_BUTTON} from '#/main/app/buttons'

import {actions} from '#/main/core/administration/user/group/actions'

import {OrganizationList} from '#/main/core/administration/user/organization/components/organization-list'
import {RoleList} from '#/main/core/administration/user/role/components/role-list'
import {UserList} from '#/main/core/administration/user/user/components/user-list'

const GroupForm = props =>
  <FormData
    level={3}
    name="groups.current"
    buttons={true}
    target={(group, isNew) => isNew ?
      ['apiv2_group_create'] :
      ['apiv2_group_update', {id: group.id}]
    }
    cancel={{
      type: LINK_BUTTON,
      target: '/groups',
      exact: true
    }}
    sections={[
      {
        title: trans('general'),
        primary: true,
        fields: [
          {
            name: 'name',
            type: 'string',
            label: trans('name'),
            required: true
          }
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
            label: trans('add_users'),
            callback: () => props.pickUsers(props.group.id)
          }
        ]}
      >
        <ListData
          name="groups.current.users"
          fetch={{
            url: ['apiv2_group_list_users', {id: props.group.id}],
            autoload: props.group.id && !props.new
          }}
          primaryAction={UserList.open}
          delete={{
            url: ['apiv2_group_remove_users', {id: props.group.id}]
          }}
          definition={UserList.definition}
          card={UserList.card}
        />
      </FormSection>

      <FormSection
        className="embedded-list-section"
        icon="fa fa-fw fa-id-badge"
        title={trans('roles')}
        disabled={props.new}
        actions={[
          {
            type: CALLBACK_BUTTON,
            icon: 'fa fa-fw fa-plus',
            label: trans('add_roles'),
            callback: () => props.pickRoles(props.group.id)
          }
        ]}
      >
        <ListData
          name="groups.current.roles"
          fetch={{
            url: ['apiv2_group_list_roles', {id: props.group.id}],
            autoload: props.group.id && !props.new
          }}
          primaryAction={RoleList.open}
          delete={{
            url: ['apiv2_group_remove_roles', {id: props.group.id}]
          }}
          definition={RoleList.definition}
          card={RoleList.card}
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
            callback: () => props.pickOrganizations(props.group.id)
          }
        ]}
      >
        <ListData
          name="groups.current.organizations"
          fetch={{
            url: ['apiv2_group_list_organizations', {id: props.group.id}],
            autoload: props.group.id && !props.new
          }}
          primaryAction={OrganizationList.open}
          delete={{
            url: ['apiv2_group_remove_organizations', {id: props.group.id}]
          }}
          definition={OrganizationList.definition}
          card={OrganizationList.card}
        />
      </FormSection>
    </FormSections>
  </FormData>

GroupForm.propTypes = {
  new: T.bool.isRequired,
  group: T.shape({
    id: T.string
  }).isRequired,
  pickUsers: T.func.isRequired,
  pickRoles: T.func.isRequired,
  pickOrganizations: T.func.isRequired
}

const Group = connect(
  state => ({
    new: formSelect.isNew(formSelect.form(state, 'groups.current')),
    group: formSelect.data(formSelect.form(state, 'groups.current'))
  }),
  dispatch =>({
    pickUsers(groupId) {
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
        handleSelect: (selected) => dispatch(actions.addUsers(groupId, selected))
      }))
    },
    pickRoles(groupId) {
      dispatch(modalActions.showModal(MODAL_DATA_LIST, {
        icon: 'fa fa-fw fa-id-badge',
        title: trans('add_roles'),
        confirmText: trans('add'),
        name: 'roles.picker',
        definition: RoleList.definition,
        card: RoleList.card,
        fetch: {
          url: ['apiv2_role_platform_grantable_list'],
          autoload: true
        },
        handleSelect: (selected) => dispatch(actions.addRoles(groupId, selected))
      }))
    },
    pickOrganizations(groupId) {
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
        handleSelect: (selected) => dispatch(actions.addOrganizations(groupId, selected))
      }))
    }
  })
)(GroupForm)

export {
  Group
}
