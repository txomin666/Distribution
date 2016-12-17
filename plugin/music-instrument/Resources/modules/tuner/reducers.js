import {makeReducer} from '#/main/core/utilities/redux'

import {
  TUNING_SELECT
} from './actions'

function selectTuning(tuningState, action = {}) {
  return action.tuning
}

const tunerReducer = makeReducer({}, {
  [TUNING_SELECT]: selectTuning
})

export default tunerReducer
