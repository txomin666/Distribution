import { Editor } from './components/editor.jsx'
import { Player } from './components/player.jsx'
import { Tuner } from './components/tuner.jsx'

export const GUITAR_TYPE = 'guitar'

export const Guitar = {
  type: GUITAR_TYPE,
  editor: Editor,
  player: Player,
  tuner: Tuner
}
