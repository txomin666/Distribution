import {bootstrap} from '#/main/app/bootstrap'
import {reducer} from '#/plugin/audio-react/resources/audio/reducer'

import {AudioReactPlayerResource} from '#/plugin/audio-react/resources/audio/components/resource'


// mount the react application
bootstrap(
  // app DOM container (also holds initial app data as data attributes)
  '.audio-react-player-container',

  // app main component (accepts either a `routedApp` or a `ReactComponent`)
  AudioReactPlayerResource,

  // app store configuration
  reducer
)