import React from 'react'
import {PropTypes as T} from 'prop-types'
import {connect} from 'react-redux'

import {Routes} from '#/main/app/router'
import {trans} from '#/main/core/translation'
import {PageActions, PageAction} from '#/main/core/layout/page/components/page-actions'

import {Badges} from '#/plugin/badge/editor/components/badges'
import {Badge} from '#/plugin/badge/editor/components/badge'
import {actions} from '#/plugin/badge/editor/store'

const ListTabActions = () =>
  <PageActions>
    <PageAction
      type="link"
      icon="fa fa-plus"
      label={trans('add_badge', {}, 'icap_badge')}
      target="/list/form"
      primary={true}
    />
  </PageActions>

const ListTabComponent = props =>
  <Routes
    routes={[
      {
        path: '/list',
        exact: true,
        component: Badges
      }, {
        path: '/list/form/:id?',
        component: Badge,
        onEnter: (params) => props.openForm('current', params.id || null)
      }
    ]}
  />

ListTabComponent.propTypes = {
  openForm: T.func.isRequired
}

const ListTab = connect(
  null,
  dispatch => ({
    openForm(formName, id = null) {
      dispatch(actions.open(formName, id))
    }
  })
)(ListTabComponent)

export {
  ListTabActions,
  ListTab
}