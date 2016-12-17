import GuitarEditor from './components/editor'
import GuitarPlayer from './components/player'
import GuitarTuner from './components/tuner'

export default {
  type: 'guitar',
  icon: '.svg',
  editor: GuitarEditor,
  player: GuitarPlayer,
  tuner: GuitarTuner
}
