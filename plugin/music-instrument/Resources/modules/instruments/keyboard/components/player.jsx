import React from 'react'
import {PropTypes as T} from 'prop-types'
import classes from 'classnames'

import {constants} from '#/plugin/music-theory/constants'

const PianoKey = props =>
  <button
    className={classes('key', {
      'active': props.pressed,
      'white-key': !props.note.accidental,
      'black-key': props.note.accidental,
    })}
    onMouseDown={props.onPress}
    onMouseUp={props.onRelease}
  >
    <span className={classes('note', !props.showNote && 'sr-only', props.note.accidental && 'accidental')}>
      {props.note.sharp_name}
    </span>
  </button>

PianoKey.propTypes = {
  note: T.object.isRequired,
  showNote: T.bool,
  pressed: T.bool,
  onPress: T.func,
  onRelease: T.func
}

PianoKey.defaultProp = {
  showNote: false,
  pressed: false,
  onPress: () => true,
  onRelease: () => true
}

const PianoOctave = props =>
  <div className="octave">
    {props.showName &&
      <span className="octave-name">{props.number + 1}</span>
    }

    {constants.notes.map((note, index) => (
      <PianoKey key={index * (props.number + 1)} note={note} showNote={true} />
    ))}
  </div>

PianoOctave.propTypes = {
  showName: T.bool,
  number: T.number
}

PianoOctave.defaultProps = {
  showName: true,
  number: 0
}

/**
 * Renders a playable keyboard.
 */
const Player = props =>
  <div className="instrument-visualisation piano-keyboard">
    <PianoOctave number={0} />
    <PianoOctave number={1} />
    <PianoOctave number={2} />
    <PianoOctave number={3} />
    <PianoOctave number={4} />
    <PianoOctave number={5} />
    <PianoOctave number={6} />
  </div>

Player.propTypes = {
  keys: T.number.isRequired
}

export {
  Player
}
