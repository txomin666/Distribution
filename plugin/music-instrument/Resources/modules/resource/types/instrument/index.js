import {bootstrap} from '#/main/core/scaffolding/bootstrap'

import {registerInstrumentTypes} from '#/plugin/music-instrument/data'
import {registerDefaultInstrumentTypes} from '#/plugin/music-instrument/instruments'

import {reducer} from '#/plugin/music-instrument/resource/types/instrument/reducer'
import {Resource} from '#/plugin/music-instrument/resource/types/instrument/components/resource.jsx'

// register data types
registerInstrumentTypes()

// register configured instruments
registerDefaultInstrumentTypes()

// mount the react application
bootstrap(
  // app DOM container (also holds initial app data as data attributes)
  '.instrument-container',

  // app main component (accepts either a `routedApp` or a `ReactComponent`)
  Resource,

  // app store configuration
  reducer,

  initialData => ({
    resourceNode: initialData.resourceNode,
    instrument: {
      originalData: initialData.instrument,
      data: initialData.instrument
    }
  })
)
