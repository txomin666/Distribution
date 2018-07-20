import React from 'react'
import {PropTypes as T} from 'prop-types'
import {connect} from 'react-redux'

import {trans} from '#/main/core/translation'
import {PageContent} from '#/main/core/layout/page/index'



const Tool = props =>
  <PageContent>
    <h1>{trans(props.inWorkspace ? 'my_workspace_badges' : 'badges_platform_list', {}, 'icap_badge')}</h1>
  </PageContent>

Tool.propTypes = {
  inWorkspace: T.bool.isRequired
}

const Player = connect(
  state => ({
    inWorkspace: state.inWorkspace
  })
)(Tool)

export {
  Player
}