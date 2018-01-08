import React from 'react'
import {PropTypes as T} from 'prop-types'
import classes from 'classnames'
import times from 'lodash/times'

import {constants as theoryConstants} from '#/plugin/music-theory/constants'
import {addSemitones} from '#/plugin/music-theory/utils'
import {Note as NoteTypes} from '#/plugin/music-theory/prop-types'
import {Tuning as TuningTypes} from '#/plugin/music-instrument/tuning/prop-types'

import {constants} from '#/plugin/music-instrument/instruments/guitar/constants'
import {fretPosition} from '#/plugin/music-instrument/instruments/guitar/utils'

const Note = props =>
  <span className={classes('note', !props.showNote && 'sr-only', props.note.accidental && 'accidental')}>
    {props.note.sharp_name}
  </span>

Note.propTypes = {
  note: T.shape(
    NoteTypes.propTypes
  ).isRequired,
  showNote: T.bool
}

const FretContainer = props => {
  const previousPos = fretPosition(props.number - 1, 100)
  const currentPos  = fretPosition(props.number, 100)

  return (
    <div
      className={props.className}
      style={{
        flex: '1 0 ' + (currentPos - previousPos + '%')
      }}
    >
      {props.children}
    </div>
  )
}

FretContainer.propTypes = {
  number: T.number.isRequired,
  className: T.string,
  children: T.node
}

const GuitarString = props =>
  <div
    className={classes('string', 'string-'+props.number, {
      active: props.played
    })}
  />

GuitarString.propTypes = {
  number: T.number,
  played: T.bool,
  onAttack: T.func,
  onRelease: T.func
}

GuitarString.defaultProps = {
  played: false,
  onAttack: () => true,
  onRelease: () => true
}

const GuitarMarker = props =>
  <FretContainer
    className={classes('marker', 'marker-'+props.number, {
      'dot':        -1 !== constants.MARKER_POSITIONS.indexOf(props.number),
      'double-dot': -1 !== constants.MARKER_POSITIONS.indexOf(props.number) && 0 === props.number % 12
    })}
    number={props.number}
  />

GuitarMarker.propTypes = {
  number: T.number
}

const GuitarFret = props =>
  <FretContainer
    className={classes('fret', 'fret-'+props.number)}
    number={props.number}
  >
    {-1 !== constants.MARKER_POSITIONS.indexOf(props.number) &&
      <div className={classes(
        'fret-marker',
        'fret-marker-'+props.marker,
        0 === props.number % 12 && 'fret-marker-double'
      )} />
    }

    {props.notes.map((note, index) =>
      <Note
        key={index}
        note={addSemitones(note, props.number)}
        showNote={true}
      />
    )}
  </FretContainer>

GuitarFret.propTypes = {
  number: T.number,
  marker: T.oneOf(
    Object.keys(constants.MARKER_TYPES)
  )
}

GuitarFret.defaultProps = {
  marker: 'dot'
}

/**
 * Renders a playable guitar
 */
const Player = props =>
  <div className="instrument-visualisation guitar-fretboard">
    <div className="frets">
      {times(props.frets, (i) =>
        <GuitarFret
          key={i}
          number={i+1}
          notes={props.tuning.notes}
        />
      )}
    </div>

    {times(props.strings, (i) =>
      <GuitarString
        key={i}
        number={props.strings - i}
        note={props.tuning.notes[props.strings - (i+1)]}
      />
    )}

    <div className="markers">
      {times(props.frets, (i) =>
        <GuitarMarker
          key={i}
          number={i+1}
        />
      )}
    </div>
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
