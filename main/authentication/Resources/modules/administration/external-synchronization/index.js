import {ExternalSyncConfiguration} from '#/main/authentication/administration/external-synchronization/containers/configuration'
import {reducer} from '#/main/authentication/administration/external-synchronization/store'

/**
 * Path resource application.
 *
 * @constructor
 */
export const App = () => ({
  component: ExternalSyncConfiguration,
  store: reducer,
  initialData: (initialData) => Object.assign({}, initialData)
})
