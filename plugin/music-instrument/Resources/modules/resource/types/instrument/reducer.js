import {makeFormReducer} from '#/main/core/data/form/reducer'
import {makeResourceReducer} from '#/main/core/resource/reducer'

/*import {
 TUNING_SELECT
 } from './actions'*/

const reducer = makeResourceReducer({}, {
  instrument: makeFormReducer('instrument')
})

export {
  reducer
}
