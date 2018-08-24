import {createSelector} from 'reselect'

const STORE_NAME = 'resource'

const resource = (state) => state[STORE_NAME]

const result = createSelector(
  [resource],
  (resource) => resource.result
)

export const selectors = {
  STORE_NAME,
  resource,
  result
}
