import {createSelector} from 'reselect'

const STORE_NAME = 'resource'

const resource = (state) => state[STORE_NAME]

const bbb = createSelector(
  [resource],
  (resource) => resource.bbb
)

const message = createSelector(
  [resource],
  (resource) => resource.message
)

export const selectors =  {
  STORE_NAME,
  resource,
  bbb,
  message
}
