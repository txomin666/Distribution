import {bootstrap} from '#/main/app/bootstrap'

import {App} from '#/plugin/badge/editor/index'

// generate application
const BadgeApp = new App()

// mount the react application
bootstrap('.badge-editor-container', BadgeApp.component, BadgeApp.store, BadgeApp.initialData)