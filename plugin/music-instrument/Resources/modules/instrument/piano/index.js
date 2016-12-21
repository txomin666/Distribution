import PianoEditor from './components/editor.jsx'
import {PianoPlayer} from './components/player.jsx'

const PIANO_TYPE = 'piano'

export default {
  type: PIANO_TYPE,
  icon: '.svg',
  editor: PianoEditor,
  player: PianoPlayer
}
