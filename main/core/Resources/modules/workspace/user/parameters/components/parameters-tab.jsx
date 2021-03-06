import React from 'react'
import {PropTypes as T} from 'prop-types'
import {connect} from 'react-redux'
import get from 'lodash/get'

import {url} from '#/main/app/api'
import {trans} from '#/main/core/translation'

import {FormData} from '#/main/app/content/form/containers/data'
import {actions as formActions} from '#/main/app/content/form/store/actions'
import {selectors as formSelect} from '#/main/app/content/form/store/selectors'

import {Workspace as WorkspaceTypes} from '#/main/core/workspace/prop-types'

/**
 * Manages Workspace parameters related to users.
 *
 * @todo: maybe rename form name: parameters is misleading
 *
 * @param props
 * @constructor
 */
const Parameters = props => {
  const roleEnum = {}
  props.workspace.roles.forEach(role => {
    roleEnum[role.id] = trans(role.translationKey)
  })

  return (
    <FormData
      level={3}
      name="parameters"
      buttons={true}
      target={['apiv2_workspace_update', {id: props.workspace.id}]}
      sections={[
        {
          icon: 'fa fa-fw fa-user-plus',
          title: trans('registration'),
          defaultOpened: true,
          fields: [
            {
              name: 'registration.url',
              type: 'url',
              label: trans('registration_url'),
              calculated: () => url(['claro_workspace_subscription_url_generate', {slug: props.workspace.meta.slug}, true]),
              required: true,
              disabled: true
            }, {
              name: 'registration.selfRegistration',
              type: 'boolean',
              label: trans('activate_self_registration'),
              help: trans('self_registration_workspace_help'),
              linked: [
                {
                  name: 'registration.validation',
                  type: 'boolean',
                  label: trans('validate_registration'),
                  help: trans('validate_registration_help'),
                  displayed: props.workspace.registration && props.workspace.registration.selfRegistration
                }
              ]
            }, {
              name: 'registration.selfUnregistration',
              type: 'boolean',
              label: trans('activate_self_unregistration'),
              help: trans('self_unregistration_workspace_help')
            },
            {
              name: 'registration.defaultRole',
              type: 'choice',
              label: trans('default_role'),
              options: {
                condensed: true,
                choices: roleEnum
              },
              onChange: (roleId) => props.updateProp(
                'registration.defaultRole',
                props.workspace.roles.find(role => role.id === roleId)
              ),
              calculated: () => get(props.workspace, 'registration.defaultRole.id', null)
            }
          ]
        }, {
          icon: 'fa fa-fw fa-key',
          title: trans('access_restrictions'),
          fields: [
            {
              name: 'access_max_users',
              type: 'boolean',
              label: trans('access_max_users'),
              calculated: () => props.workspace.restrictions && null !== props.workspace.restrictions.maxUsers && '' !== props.workspace.restrictions.maxUsers,
              onChange: checked => {
                if (checked) {
                  // initialize with the current nb of users with the role
                  props.updateProp('restrictions.maxUsers', 0)
                } else {
                  // reset max users field
                  props.updateProp('restrictions.maxUsers', null)
                }
              },
              linked: [
                {
                  name: 'restrictions.maxUsers',
                  type: 'number',
                  label: trans('maxUsers'),
                  displayed: props.workspace.restrictions && null !== props.workspace.restrictions.maxUsers && '' !== props.workspace.restrictions.maxUsers,
                  required: true,
                  options: {
                    min: 0
                  }
                }
              ]
            }
          ]
        }
      ]}
    />
  )
}

Parameters.propTypes = {
  workspace: T.shape(
    WorkspaceTypes.propTypes
  ).isRequired,
  updateProp: T.func.isRequired
}

const ParametersTab = connect(
  (state) => ({
    workspace: formSelect.data(formSelect.form(state, 'parameters'))
  }),
  (dispatch) => ({
    updateProp(propName, propValue) {
      dispatch(formActions.updateProp('parameters', propName, propValue))
    }
  })
)(Parameters)

export {
  ParametersTab
}
