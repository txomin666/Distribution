import {bootstrap} from '#/main/core/scaffolding/bootstrap'

import {reducer} from '#/plugin/music-theory/desktop/references/reducer'

import {Tool} from '#/plugin/music-theory/desktop/references/components/tool.jsx'

// mount the react application
bootstrap(
  // app DOM container (also holds initial app data as data attributes)
  '.references-container',

  // app main component (accepts either a `routedApp` or a `ReactComponent`)
  Tool,

  // app store configuration
  reducer
)
