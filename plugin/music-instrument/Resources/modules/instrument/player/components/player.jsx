import React, { PropTypes as T } from 'react'
import { connect } from 'react-redux'

import { tex } from '#/main/core/translation/index'
import { Midi } from '#/plugin/music-book/audio/midi'

import { getDefinition } from './../../../instrument-type'

import { Placeholder } from './../../../components/placeholder.jsx'

const Player = props =>
  <div className="instrument-player">
    <Placeholder
      icon="fa fa-fw fa-sign-in"
      title="select an input"
      help="Lorem ipsum dolor sit amet"
    />

    {React.createElement(
      getDefinition(props.instrument.type).player, {
        instrument: props.instrument
      }
    )}

    <Placeholder
      icon="fa fa-fw fa-sign-out"
      title="select an output"
      help="Lorem ipsum dolor sit amet"
    />
  </div>

Player.propTypes = {
  instrument: T.object.isRequired
}

function mapStateToProps(state) {
  return {
    instrument: state.instrument
  }
}

const ConnectedPlayer = connect(mapStateToProps)(Player)

export {ConnectedPlayer as Player}
