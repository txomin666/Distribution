import {createSelector} from 'reselect'

const logs = state => state.logs

const data = createSelector(
  [logs],
  (logs) => logs.data
)

const totalResults = createSelector(
  [logs],
  (logs) => logs.totalResults
)

export const select = {
  logs,
  data,
  totalResults
}
