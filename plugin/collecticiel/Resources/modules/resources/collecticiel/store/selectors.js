import {createSelector} from 'reselect'

const STORE_NAME = 'resource'

const resource = (state) => state[STORE_NAME]

const dropzone = createSelector(
  [resource],
  (resource) => resource.dropzone
)

export const selectors = {
  STORE_NAME,
  resource,
  dropzone
}
