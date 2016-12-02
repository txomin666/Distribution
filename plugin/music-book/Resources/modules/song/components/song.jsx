import React, { Component } from 'react'
import { connect } from 'react-redux'

import { tex } from '#/main/core/translation/index'
import ResourceHeader from '#/main/core/layout/resource/components/resource-header.jsx'
import { actions } from './../actions/index'

const node = {
  name: "My song title",
  actions: [
    {
      icon: 'fa fa-fw fa-pencil',
      label: 'Edit song',
      handleAction: () => true,
      primary: true
    },
    {
      icon: 'fa fa-fw fa-download',
      label: 'Import QTI questions',
      handleAction: () => true,
      primary: false
    },
    {
      icon: 'fa fa-fw fa-file',
      label: 'Manage medias',
      handleAction: () => true,
      primary: false
    }
  ]
}

class Song extends Component {
  render() {
    return (
      <div>
        <ResourceHeader
          resourceNode={node}
        />

        <div className="row">
          <div className="col-md-3">
            <div className="song-cover">
            </div>
          </div>
          <div className="col-md-9">
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    song: state.song
  }
}

export default connect(mapStateToProps, actions)(Song)
