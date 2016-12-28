import React, { PropTypes as T } from 'react'

import PageHeader from '#/main/core/layout/page/components/page-header.jsx'
import PageActions from '#/main/core/layout/page/components/page-actions.jsx'

const ResourceHeader = props =>
  <PageHeader
    title={props.resourceNode.name}
    subtitle={props.subtitle}
  >
    <PageActions
      actions={props.actions}
    />
  </PageHeader>

ResourceHeader.propTypes = {
  resourceNode: T.object.isRequired,
  subtitle: T.string,
  actions: T.array
}

ResourceHeader.defaultProps = {
  subtitle: null,
  actions: []
}

export {ResourceHeader}
