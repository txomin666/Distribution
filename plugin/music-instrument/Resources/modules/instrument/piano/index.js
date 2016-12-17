import PianoEditor from './components/editor'
import PianoPlayer from './components/player'

const PIANO_TYPE = 'piano'

export default {
  type: PIANO_TYPE,
  icon: '.svg',
  editor: PianoEditor,
  player: PianoPlayer
}
