import React from 'react'
import {PropTypes as T} from 'prop-types'
import {connect} from 'react-redux'

import {trans} from '#/main/core/translation'
import {TabbedPageContainer} from '#/main/core/layout/tabs'

import {ListTab, ListTabActions} from '#/plugin/badge/editor/components/list-tab'
import {UsersTab} from '#/plugin/badge/editor/components/users-tab'
import {StatsTab} from '#/plugin/badge/editor/components/stats-tab'


const Tool = props =>
  <TabbedPageContainer
    title={trans(props.inWorkspace ? 'workspace_manage_badges' : 'badges_management', {}, 'icap_badge')}
    redirect={[
      {from: '/', exact: true, to: '/list'}
    ]}
    tabs={[
      {
        icon: 'fa fa-list-ul',
        title: trans('show_all_badges', {}, 'icap_badge'),
        path: '/list',
        displayed: true,
        content: ListTab,
        actions: ListTabActions
      },
      {
        icon: 'fa fa-users',
        title: trans('list_by_user', {}, 'icap_badge'),
        path: '/by_user',
        displayed: true,
        content: UsersTab
      },
      {
        icon: 'fa fa-bar-chart',
        title: trans(props.inWorkspace ? 'workspace_badges_statistics' : 'badges_platform_statistics', {}, 'icap_badge'),
        path: '/stats',
        displayed: props.inWorkspace,
        content: StatsTab
      }
    ]}
  />

Tool.propTypes = {
  inWorkspace: T.bool.isRequired
}

const Editor = connect(
  state => ({
    inWorkspace: state.inWorkspace
  })
)(Tool)

export {
  Editor
}