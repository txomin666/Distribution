import GuitarEditor from './components/editor.jsx'
import GuitarPlayer from './components/player.jsx'
import GuitarTuner from './components/tuner.jsx'

const GUITAR_TYPE = 'guitar'

export default {
  type: GUITAR_TYPE,
  icon: '.svg',
  editor: GuitarEditor,
  player: GuitarPlayer,
  tuner: GuitarTuner
}
