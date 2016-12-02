import React, { Component } from 'react'

import PageHeader from '#/main/core/layout/page/components/page-header.jsx'
import PageActions from '#/main/core/layout/page/components/page-actions.jsx'

const T = React.PropTypes

export default class ResourceHeader extends Component {
  render() {
    return (
      <PageHeader
        title={this.props.resourceNode.name}
      >
        <PageActions
          actions={this.props.resourceNode.actions}
        />
      </PageHeader>
    )
  }
}

ResourceHeader.propTypes = {
  resourceNode: T.object.isRequired
}
