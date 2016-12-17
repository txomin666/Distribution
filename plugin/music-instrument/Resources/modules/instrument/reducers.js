import {makeReducer} from '#/main/core/utilities/redux'

/*import {
 TUNING_SELECT
 } from './actions'*/

function selectInstrument(instrumentState, action = {}) {
  return action.instrument
}

const instrumentReducer = makeReducer({}, {
  /*[SONG_SET]: setSong*/
})

export default instrumentReducer
