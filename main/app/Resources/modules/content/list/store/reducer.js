import cloneDeep from 'lodash/cloneDeep'
import difference from 'lodash/difference'
import intersection from 'lodash/intersection'
import merge from 'lodash/merge'

import {makeInstanceReducer, reduceReducers, combineReducers} from '#/main/app/store/reducer'

import {constants as paginationConst} from '#/main/app/content/pagination/constants'
import {
  LIST_FILTER_ADD,
  LIST_FILTER_REMOVE,
  LIST_SORT_UPDATE,
  LIST_SORT_DIRECTION_UPDATE,
  LIST_RESET_SELECT,
  LIST_TOGGLE_SELECT,
  LIST_TOGGLE_SELECT_ALL,
  LIST_DATA_INVALIDATE,
  LIST_DATA_LOAD,
  LIST_DATA_DELETE,
  LIST_PAGE_CHANGE,
  LIST_PAGE_SIZE_UPDATE
} from '#/main/app/content/list/store/actions'

const defaultState = {
  loaded: false,
  invalidated: false,
  data: [],
  totalResults: 0,
  filters: [],
  sortBy: {
    property: null,
    direction: 0
  },
  selected: [],
  page: 0,
  // fixme : this should be -1, otherwise it will break if paginated=false
  // but if I change it know, it will make -1 the default for all list in app
  pageSize: paginationConst.DEFAULT_PAGE_SIZE
}

/**
 * Reducers list data invalidated state.
 * A list is invalidated when its data need to be refreshed.
 */
const invalidatedReducer = makeInstanceReducer(defaultState.invalidated, {
  [LIST_DATA_INVALIDATE]: () => true,
  [LIST_DATA_LOAD]: () => false
})

const loadedReducer = makeInstanceReducer(defaultState.invalidated, {
  [LIST_DATA_LOAD]: () => true
})

/**
 * Reduces list data items.
 */
const dataReducer = makeInstanceReducer(defaultState.data, {
  [LIST_DATA_LOAD]: (state, action) => action.data,
  [LIST_DATA_DELETE]: (state, action) => {
    const items = cloneDeep(state)

    action.items.forEach(toRemove => {
      const itemIndex = items.findIndex(item => item.id === toRemove.id)
      items.splice(itemIndex, 1)
    })

    return items
  }
})

/**
 * Reduces list total results.
 */
const totalResultsReducer = makeInstanceReducer(defaultState.totalResults, {
  [LIST_DATA_LOAD]: (state, action) => action.total,
  [LIST_DATA_DELETE]: (state, action) => state - action.items.length
})

/**
 * Reduces list filters.
 */
const filtersReducer = makeInstanceReducer(defaultState.filters, {
  [LIST_FILTER_ADD]: (state, action) => {
    const newFilters = cloneDeep(state)

    const existingFilter = newFilters.find(filter => filter.property === action.property)
    if (existingFilter) {
      existingFilter.value = action.value
    } else {
      newFilters.push({
        property: action.property,
        value: action.value,
        locked: action.locked
      })
    }

    return newFilters
  },

  [LIST_FILTER_REMOVE]: (state, action) => {
    const newFilters = state.slice(0)
    const pos = state.indexOf(action.filter)
    if (-1 !== pos) {
      newFilters.splice(pos, 1)
    }

    return newFilters
  }
})

/**
 * Reduces list sort.
 */
const sortByReducer = makeInstanceReducer(defaultState.sortBy, {
  [LIST_SORT_UPDATE]: (state, action) => {
    let direction = 1
    if (state && state.property === action.property) {
      if (1 === state.direction) {
        direction = -1
      } else if (-1 === state.direction) {
        direction = 0
      }
      else {
        direction = 1
      }
    }

    return {
      property: action.property,
      direction: direction
    }
  },
  [LIST_SORT_DIRECTION_UPDATE]: (state, action) => ({
    property: state.property,
    direction: action.direction
  })
})

/**
 * Reduces data selection.
 *
 * ATTENTION: we assume all data rows have an unique prop `id`.
 */
const selectedReducer = makeInstanceReducer(defaultState.selected, {
  [LIST_RESET_SELECT]: () => [],

  [LIST_TOGGLE_SELECT]: (state, action) => {
    const selected = state.slice(0)

    const itemPos = state.indexOf(action.row.id)
    if (-1 === itemPos) {
      // Item not selected
      selected.push(action.row.id)
    } else {
      // Item selected
      selected.splice(itemPos, 1)
    }

    return selected
  },

  [LIST_DATA_LOAD]: (state, action) => intersection(state, action.data.map(item => item.id)),

  [LIST_DATA_DELETE]: (state, action) => {
    const items = cloneDeep(state)

    action.items.forEach(toRemove => {
      const itemIndex = items.findIndex(item => item.id === toRemove.id)
      items.splice(itemIndex, 1)
    })

    return items
  },

  [LIST_TOGGLE_SELECT_ALL]: (state, action) => {
    return 0 < state.length ? [] : [].concat(state, action.rows.map(row => row.id))
  }
})

/**
 * Reduces list current page.
 */
const pageReducer = makeInstanceReducer(defaultState.page, {
  /**
   * Changes the current page.
   *
   * @param {Object} state
   * @param {Object} action
   *
   * @returns {Object}
   */
  [LIST_PAGE_CHANGE]: (state, action) => action.page,

  /**
   * Resets current page on page size changes.
   *
   * @todo find a better way to handle this
   *
   * @returns {Object}
   */
  [LIST_PAGE_SIZE_UPDATE]: () => 0,

  /**
   * Resets current page on filter add.
   *
   * @todo find a better way to handle this
   *
   * @returns {Object}
   */
  [LIST_FILTER_ADD]: () => 0
})

/**
 * Reduces list page size.
 */
const pageSizeReducer = makeInstanceReducer(defaultState.pageSize, {
  /**
   * Changes the page size.
   *
   * @param {Object} state
   * @param {Object} action
   *
   * @returns {Object}
   */
  [LIST_PAGE_SIZE_UPDATE]: (state, action) => action.pageSize
})

const baseReducer = {
  loaded: loadedReducer,
  invalidated: invalidatedReducer,
  data: dataReducer,
  totalResults: totalResultsReducer,
  filters: filtersReducer,
  sortBy: sortByReducer,
  selected: selectedReducer,
  page: pageReducer,
  pageSize: pageSizeReducer
}

/**
 * Creates reducers for lists.
 *
 * The `customReducers` param permits to pass reducers for specific list actions.
 * `customReducers` are applied after the list ones.
 *
 * Example to add a custom reducer to `data`:
 *   customReducers = {
 *      data: makeReducer(initialState, handlers)
 *   }
 *
 * @param {string} listName      - the name of the list.
 * @param {object} initialState  - the initial state of the list instance (useful to add default filters in autoloading lists).
 * @param {object} customReducer - an object containing custom reducer.
 *
 * @returns {function}
 */
function makeListReducer(listName, initialState = {}, customReducer = {}) {
  //const reducer = {}

  const listState = merge({}, defaultState, initialState)

  // generates the list store by merging base reducers and app ones
  const reducer = Object
    .keys(baseReducer)
    .reduce((finalReducer, current) => {
      if (customReducer[current]) {
        // apply base and custom reducer to the store key
        finalReducer[current] = reduceReducers(baseReducer[current](listName, listState[current]), customReducer[current])
      } else {
        // we just need to add the standard reducer
        finalReducer[current] = baseReducer[current](listName, listState[current])
      }

      return finalReducer
    }, {})

  // get custom keys
  const rest = difference(Object.keys(customReducer), Object.keys(baseReducer))
  rest.map(reducerName =>
    reducer[reducerName] = customReducer[reducerName]
  )

  return combineReducers(reducer)
}

export {
  makeListReducer
}
