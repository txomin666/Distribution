import {makeReducer} from '#/main/core/utilities/redux'

import {
  TUNING_SELECT
} from './actions'

const reducer = {
  selectedTuning: makeReducer(null, {
    [TUNING_SELECT]: (state, action) => action.tuning
  }),
  tunings: makeReducer([], {

  })
}

export {
  reducer
}
