import React, { Component } from 'react'
import { connect } from 'react-redux'

import { tex } from '#/main/core/translation/index'
import ResourceHeader from '#/main/core/layout/resource/components/resource-header.jsx'
import { actions } from './../actions'

const T = React.PropTypes

const node = {
  name: 'My awesome piano',
  actions: [
    {
      icon: 'fa fa-fw fa-pencil',
      label: 'Edit',
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

class Instrument extends Component {
  render() {
    return (
      <div>
        <ResourceHeader resourceNode={node} />
      </div>
    )
  }
}

Instrument.propTypes = {
  instrument: T.object.isRequired
}

Instrument.defaultProps = {

}

function mapStateToProps(state) {
  return {
    instrument: state.instrument
  }
}

export default connect(mapStateToProps, actions)(Instrument)
