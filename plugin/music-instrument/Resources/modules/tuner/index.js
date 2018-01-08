import {bootstrap} from '#/main/core/scaffolding/bootstrap'

import {reducer} from '#/plugin/music-instrument/tuner/reducer'
import {Tool} from '#/plugin/music-instrument/tuner/components/tool.jsx'

// mount the react application
bootstrap(
  // app DOM container (also holds initial app data as data attributes)
  '.tuner-container',

  // app main component (accepts either a `routedApp` or a `ReactComponent`)
  Tool,

  // app store configuration
  reducer
)
