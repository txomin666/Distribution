import {trans} from '#/main/core/translation'

import {Player} from './components/player.jsx'

const KEYBOARD_TYPE = 'keyboard'

const Keyboard = {
  type: KEYBOARD_TYPE,
  player: Player,
  editor: [
    {
      name: 'keys',
      type: 'number',
      label: trans('keyboard_keys', {}, 'resource'),
      required: true
    }
  ]
}

export {
  KEYBOARD_TYPE,
  Keyboard
}
