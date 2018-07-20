import {Editor} from '#/plugin/badge/editor/editor'
import {reducer} from '#/plugin/badge/editor/store'

/**
 * Badge editor application.
 *
 * @constructor
 */
export const App = () => ({
  component: Editor,
  store: reducer,
  styles: 'claroline-distribution-plugin-badge',
  initialData: initialData => Object.assign({}, initialData, {
    inWorkspace: initialData.inWorkspace
  })
})