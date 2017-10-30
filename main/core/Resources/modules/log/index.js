import merge from 'lodash/merge'

import {bootstrap} from '#/main/core/utilities/app/bootstrap'
import {generateUrl} from '#/main/core/fos-js-router'

// reducers
import {reducer as apiReducer} from '#/main/core/api/reducer'
import {reducer} from '#/main/core/log/reducer'
import {Logs} from '#/main/core/log/components/logs.jsx'

// mount the react application
bootstrap(
  // app DOM container (also holds initial app data as data attributes)
  '.logs-container',

  // app main component (accepts either a `routedApp` or a `ReactComponent`)
  Logs,

  // app store configuration
  {
    // app reducers
    logs: reducer,
    // generic reducers
    currentRequests: apiReducer
  },

  // remap data-attributes set on the app DOM container
  (initialData) => ({
    logs: merge({}, initialData.logs, {
      fetchUrl: generateUrl('apiv2_log_list')
    })
  })
)
