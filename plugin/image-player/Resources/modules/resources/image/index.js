import {bootstrap} from '#/main/core/utilities/app/bootstrap'

// reducers
import {makeResourceReducer} from '#/main/core/layout/resource/reducer'

import {Image} from './components/image.jsx'

// mount the react application
bootstrap(
  // app DOM container (also holds initial app data as data attributes)
  '.image-container',

  // app main component (accepts either a `routedApp` or a `ReactComponent`)
  Image,

  // app store configuration
  makeResourceReducer({}, {
    // there is no editor for now, so we just init a static store
    image: (state = {}) => state
  })
)
