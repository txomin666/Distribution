import {bootstrap} from '#/main/app/bootstrap'

import {App} from '#/plugin/badge/player/index'

// generate application
const BadgeApp = new App()

// mount the react application
bootstrap('.badge-player-container', BadgeApp.component, BadgeApp.store, BadgeApp.initialData)