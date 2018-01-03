import {trans} from '#/main/core/translation'

import {constants} from './constants'

import {Player} from './components/player.jsx'
import {Tuner} from './components/tuner.jsx'

const GUITAR_TYPE = 'guitar'

const Guitar = {
  type: GUITAR_TYPE,
  player: Player,
  tuner: Tuner,
  editor: [
    {
      name: 'strings',
      type: 'number',
      label: trans('guitar_strings', {}, 'resource'),
      required: true,
      options: {
        min: 4,
        max: 12
      }
    }, {
      name: 'frets',
      type: 'number',
      label: trans('frets', {}, 'resource'),
      required: true,
      options: {
        min: 1
      }
    }, {
      name: 'fretless',
      type: 'boolean',
      label: trans('fretless', {}, 'resource')
    }, {
      name: 'leftHanded',
      type: 'boolean',
      label: trans('left_handed', {}, 'resource')
    }, {
      name: 'markers',
      type: 'enum',
      label: trans('guitar_markers', {}, 'resource'),
      options: {
        choices: constants.MARKER_TYPES
      }
    }, {
      name: 'headstock',
      type: 'enum',
      label: trans('guitar_headstock', {}, 'resource'),
      options: {
        choices: constants.HEADSTOCK_TYPES
      }
    }, {
      name: 'body',
      type: 'enum',
      label: trans('guitar_body', {}, 'resource'),
      options: {
        choices: constants.BODY_TYPES
      }
    }, {
      name: 'amplification',
      type: 'enum',
      label: trans('guitar_amplification', {}, 'resource'),
      options: {
        choices: constants.AMPLIFICATION_TYPES
      }
    }
  ]
}

export {
  GUITAR_TYPE,
  Guitar
}
