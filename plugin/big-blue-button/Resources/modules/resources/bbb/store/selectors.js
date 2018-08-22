import {createSelector} from 'reselect'

const STORE_NAME = 'resource'

const resource = (state) => state[STORE_NAME]

const bbb = createSelector(
  [resource],
  (resource) => resource.bbb
)

export {
  bbb
}
