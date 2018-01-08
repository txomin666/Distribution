import {makeReducer} from '#/main/core/scaffolding/reducer'

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
