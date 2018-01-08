import {constants} from '#/plugin/music-theory/constants'

function addSemitones(baseNote, semitones) {
  const pos = constants.notes.findIndex(note => note.sharp_name === baseNote.sharp_name)

  let newPos = pos + semitones
  if (12 <= newPos) {
    newPos = newPos % 12
  }

  return constants.notes[newPos]
}

export {
  addSemitones
}
