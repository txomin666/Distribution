import GuitarEditor from './components/editor'
import GuitarPlayer from './components/player'
import GuitarTuner from './components/tuner'

const GUITAR_TYPE = 'guitar'

export default {
  type: GUITAR_TYPE,
  icon: '.svg',
  editor: GuitarEditor,
  player: GuitarPlayer,
  tuner: GuitarTuner
}
