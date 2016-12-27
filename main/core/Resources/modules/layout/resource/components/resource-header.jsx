import React, { PropTypes as T } from 'react'

import PageHeader from '#/main/core/layout/page/components/page-header.jsx'
import PageActions from '#/main/core/layout/page/components/page-actions.jsx'

const ResourceHeader = props =>
  <PageHeader
    title={props.resourceNode.name}
  >
    <PageActions
      actions={props.resourceNode.actions}
    />
  </PageHeader>

ResourceHeader.propTypes = {
  resourceNode: T.object.isRequired
}

export {ResourceHeader}
