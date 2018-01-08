import {bootstrap} from '#/main/core/scaffolding/bootstrap'

import {reducer} from '#/plugin/music-book/resource/types/song/reducer'
import {Resource} from '#/plugin/music-book/resource/types/song/components/resource.jsx'

// mount the react application
bootstrap(
  // app DOM container (also holds initial app data as data attributes)
  '.song-container',

  // app main component (accepts either a `routedApp` or a `ReactComponent`)
  Resource,

  // app store configuration
  reducer
)
