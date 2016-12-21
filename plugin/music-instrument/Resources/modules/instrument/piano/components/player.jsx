import React, { PropTypes as T } from 'react'
import classes from 'classnames'

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
]

const PianoKey = props =>
  <button
    className={
      classes(
        'key',
        props.note.accidental ? 'black-key' : 'white-key',
        props.pressed ? 'active' : null
      )
    }
    onMouseDown={props.onPress}
    onMouseUp={props.onRelease}
  >
    <span className={classes('note-name', !props.showNote ? 'sr-only' : null)}>
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

    {notes.map((note, index) => (
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

function testMidi() {
  MIDI.loadPlugin({
    soundfontUrl: './soundfont/',
    onprogress: function(state, progress) {
      /*MIDI.loader.setValue(progress * 100);*/
    },
    onsuccess: function() {
      /// this sets up the MIDI.Player and gets things going...
      let player = MIDI.Player;
      player.timeWarp = 1; // speed the song is played back
      player.loadFile(song[songid++ % song.length], player.start);

      player.addListener(function(data) {
        var pianoKey = data.note - 21;
        var d = colorElements[pianoKey];
        if (d) {
          if (data.message === 144) {
            var map = colorMap[data.note - 27];
            if (map) d.style.background = map.hex;
            d.style.color = "#fff";
          } else {
            d.style.background = "";
            d.style.color = "";
          }
        }
      });
      ///
      MIDIPlayerPercentage(player);
    }
  });
}

/**
 * Renders a playable piano visualization.
 */
const PianoPlayer = props =>
  <div>
    <div className="panel piano-keyboard">
      <PianoOctave number={0} />
      <PianoOctave number={1} />
      <PianoOctave number={2} />
      <PianoOctave number={3} />
      <PianoOctave number={4} />
      <PianoOctave number={5} />
      <PianoOctave number={6} />
    </div>

    <div className="">
    </div>
  </div>

PianoPlayer.propTypes = {
  instrument: T.object.isRequired
}

export {PianoPlayer}
