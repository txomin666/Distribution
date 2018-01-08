import {bootstrap} from '#/main/core/scaffolding/bootstrap'

import {reducer} from '#/plugin/music-theory/resource/types/chord-grid/reducer'

import {Resource} from '#/plugin/music-theory/resource/types/chord-grid/components/resource.jsx'

// mount the react application
bootstrap(
  // app DOM container (also holds initial app data as data attributes)
  '.chord-grid-container',

  // app main component (accepts either a `routedApp` or a `ReactComponent`)
  Resource,

  // app store configuration
  reducer
)
