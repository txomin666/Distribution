import React, { PropTypes as T } from 'react'
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'

import { tex } from '#/main/core/translation/index'
import { ResourceHeader } from '#/main/core/layout/resource/components/resource-header.jsx'
import { Midi } from '#/plugin/music-book/audio/midi'

/*const midiInterface = new Midi()

midiInterface.getAccess().then(() => {
  const input = midiInterface.getInputs()[0]
  midiInterface.onInputMessage(input, (event) => {
    console.log(event.data)
  })
})*/

const playerActions = [
  {
    icon: 'fa fa-fw fa-pencil',
    label: 'Edit',
    handleAction: () => hashHistory.push('/edit'),
    primary: true
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
  }
]

const Instrument = props =>
  <div className="resource">
    <ResourceHeader
      resourceNode={props.node}
      subtitle={'/edit' === props.location.pathname ? 'edit' : null}
      actions={'/edit' === props.location.pathname ? editorActions : playerActions}
    />

    {props.children}
  </div>

Instrument.propTypes = {
  node: T.object.isRequired,
  children: T.node.isRequired,
  location: T.shape({
    pathname: T.string
  }).isRequired
}

function mapStateToProps(state) {
  return {
    node: state.node
  }
}

const ConnectedInstrument = connect(mapStateToProps)(Instrument)

export {ConnectedInstrument as Instrument}
