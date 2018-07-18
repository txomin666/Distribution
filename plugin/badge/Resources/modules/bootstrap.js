import {bootstrap} from '#/main/app/bootstrap'

import {App} from '#/plugin/badge/'

// generate application
const BadgeApp = new App()

// mount the react application
bootstrap('.badge-container', BadgeApp.component, BadgeApp.store, BadgeApp.initialData)