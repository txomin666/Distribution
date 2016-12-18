import React, { Component } from 'react'

import {WhiteKey, BlackKey} from './keys.jsx'

const T = React.PropTypes

const notes = [
  // C
  {sharp_name: 'C', flat_name: 'C', accidental: false, color: '#006cb7'},
  // C♯ / D♭
  {sharp_name: 'C♯', flat_name: 'D♭', accidental: true, color: '#008e83'},
  // D
  {sharp_name: 'D', flat_name: 'D', accidental: false, color: '#00854a'},
  // D♯ / E♭
  {sharp_name: 'D♯', flat_name: 'E♭', accidental: true, color: '#7fb439'},
  // E
  {sharp_name: 'E', flat_name: 'E', accidental: false, color: '#fdb813'},
  // F
  {sharp_name: 'F', flat_name: 'F', accidental: false, color: '#584742'},
  // F♯ / G♭
  {sharp_name: 'F♯', flat_name: 'G♭', accidental: true, color: '#c15e20'},
  // G
  {sharp_name: 'G', flat_name: 'G', accidental: false, color: '#f58220'},
  // G♯ / A♭
  {sharp_name: 'G♯', flat_name: 'A♭', accidental: true, color: '#f04e46'},
  // A
  {sharp_name: 'A', flat_name: 'A', accidental: false, color: '#8f0000'},
  // A♯ / B♭
  {sharp_name: 'A♯', flat_name: 'B♭', accidental: true, color: '#a23e97'},
  // B
  {sharp_name: 'B', flat_name: 'B', accidental: false, color: '#6a489d'}
];

/**
 * Renders a playable piano visualization.
 */
export default class PianoPlayer extends Component {
  renderOctave(number, showOctave = false) {
    return (
      <div className="octave">
        {showOctave ? <span className="octave-name">{number + 1}</span> : null}
        {notes.map((note, index) => {
          if (note.accidental) {
            return <BlackKey key={index * (number + 1)} note={note} showNote={true} />
          } else {
            return <WhiteKey key={index * (number + 1)} note={note} showNote={true} />
          }
        })}
      </div>
    )
  }

  render() {
    return (
      <div className="panel piano-player">
        {this.renderOctave(0, true)}
        {this.renderOctave(1, true)}
        {this.renderOctave(2, true)}
        {this.renderOctave(3, true)}
        {this.renderOctave(4, true)}
        {this.renderOctave(5, true)}
        {this.renderOctave(6, true)}
      </div>
    )
  }
}

PianoPlayer.propTypes = {
  instrument: T.object.isRequired
}
