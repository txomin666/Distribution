import React, { PropTypes as T } from 'react'
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'

import { ResourceHeader } from '#/main/core/layout/resource/components/resource-header.jsx'

const playerActions = [
  {
    icon: 'fa fa-fw fa-pencil',
    label: 'Edit',
    handleAction: () => hashHistory.push('/edit'),
    primary: true
  },
  {
    icon: 'fa fa-fw fa-trash-o',
    label: 'Delete',
    handleAction: () => true,
    primary: false
  }
]

const editorActions = [
  {
    icon: 'fa fa-fw fa-save',
    label: 'Save',
    handleAction: () => hashHistory.push('/'),
    primary: true
  },
  {
    icon: 'fa fa-fw fa-ban',
    label: 'Cancel',
    handleAction: () => hashHistory.push('/'),
    primary: true
  },
  {
    icon: 'fa fa-fw fa-trash-o',
    label: 'Delete',
    handleAction: () => true,
    primary: false
  }
]

const Song = props => {
  return (
    <div className="resource">
      <ResourceHeader
        resourceNode={props.node}
        subtitle={'/edit' === props.location.pathname ? 'edit' : null}
        actions={'/edit' === props.location.pathname ? editorActions : playerActions}
      />

      {props.children}
    </div>
  )
}


function mapStateToProps(state) {
  return {
    node: state.node
  }
}

Song.propTypes = {
  node: T.object.isRequired,
  children: T.node.isRequired,
  location: T.shape({
    pathname: T.string
  }).isRequired
}

const ConnectedSong = connect(mapStateToProps)(Song)

export {ConnectedSong as Song}
