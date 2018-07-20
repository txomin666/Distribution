import {Player} from '#/plugin/badge/player/player'
import {reducer} from '#/plugin/badge/player/store'

/**
 * Badge player application.
 *
 * @constructor
 */
export const App = () => ({
  component: Player,
  store: reducer,
  styles: 'claroline-distribution-plugin-badge',
  initialData: initialData => Object.assign({}, initialData, {
    inWorkspace: initialData.inWorkspace
  })
})