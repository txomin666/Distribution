import {bootstrap} from '#/main/app/bootstrap'

import {App} from '#/main/authentication/administration/external-synchronization'

// generate application
const ExternalSyncApp = new App()

// mount the react application
bootstrap('.external-sync-container', ExternalSyncApp.component, ExternalSyncApp.store, ExternalSyncApp.initialData)