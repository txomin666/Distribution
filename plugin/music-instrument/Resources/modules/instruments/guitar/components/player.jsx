import React from 'react'
import {PropTypes as T} from 'prop-types'
import times from 'lodash/times'

import {constants as theoryConstants} from '#/plugin/music-theory/constants'
import {constants} from '#/plugin/music-instrument/instruments/guitar/constants'
import {Note as NoteTypes} from '#/plugin/music-theory/prop-types'
import {Tuning as TuningTypes} from '#/plugin/music-instrument/tuning/prop-types'

const GuitarString = props =>
  <div className="string">
    string :
    {props.number}

    {props.note.sharp_name}
  </div>

GuitarString.propTypes = {
  number: T.number,
  note: T.shape(
    NoteTypes.propTypes
  ).isRequired
}

const GuitarFret = props =>
  <div className="fret">
  </div>

GuitarFret.propTypes = {
  marker: T.oneOf(
    Object.keys(constants.MARKER_TYPES)
  )
}

/**
 * Renders a playable guitar
 */
const Player = props =>
  <div className="instrument-visualisation guitar-fretboard">
    {times(props.strings, (i) =>
      <GuitarString
        key={i}
        number={props.strings - (i+1)}
        note={props.tuning.notes[props.strings - (i+1)]}
      />
    )}
  </div>

Player.propTypes = {
  strings: T.number.isRequired,
  frets: T.number.isRequired,
  markers: T.string,
  leftHanded: T.bool,
  tuning: T.shape(
    TuningTypes.propTypes
  ).isRequired
}

export {
  Player
}
