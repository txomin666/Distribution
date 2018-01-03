import React from 'react'
import {PropTypes as T} from 'prop-types'
import { connect } from 'react-redux'

import {EmptyPlaceholder} from '#/main/core/layout/components/placeholder.jsx'

import {select} from '#/main/core/data/form/selectors'
import {getDefinition} from '#/plugin/music-instrument/instruments'
import {InstrumentType as InstrumentTypeTypes} from '#/plugin/music-instrument/instruments/prop-types'

const PlayerComponent = props =>
  <div className="instrument-player">
    <EmptyPlaceholder
      size="lg"
      icon="fa fa-fw fa-sign-in"
      title="select an input"
      help="Lorem ipsum dolor sit amet"
    />

    {React.createElement(
      getDefinition(props.instrument.type.name).player,
      props.instrument
    )}

    <EmptyPlaceholder
      size="lg"
      icon="fa fa-fw fa-sign-out"
      title="select an output"
      help="Lorem ipsum dolor sit amet"
    />
  </div>

PlayerComponent.propTypes = {
  instrument: T.shape({
    type: T.shape(
      InstrumentTypeTypes.propTypes
    ).isRequired
  }).isRequired
}

const Player = connect(
  state => ({
    instrument: select.originalData(select.form(state, 'instrument'))
  })
)(PlayerComponent)

export {
  Player
}
