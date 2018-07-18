import {Player} from '#/plugin/badge/player/components/player'
import {reducer} from '#/plugin/badge/store'

/**
 * Badge application.
 *
 * @constructor
 */
export const App = () => ({
  component: Player,
  store: reducer,
  styles: 'claroline-distribution-plugin-badge',
  initialData: initialData => Object.assign({}, initialData, {
    exportPdfEnabled: initialData.exportPdfEnabled
  })
})