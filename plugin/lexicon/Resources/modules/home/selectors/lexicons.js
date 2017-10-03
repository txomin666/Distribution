/**
 * This file was copied and update from QuestionBank bundle
 */



import {createSelector} from 'reselect'

import {trans} from '#/main/core/translation'
import {getDefinition} from './../components/item-types'

const getLexicons   = (state) => state.lexiconsResources
const getPagination = (state) => state.pagination
const getSortBy     = (state) => state.sortBy

const sortMethods = {
  type: (a, b) => {
    // We need to order on translations, not on tech type, for better user exp
    const aName = trans(getDefinition(a.type).name, {}, 'question_types')
    const bName = trans(getDefinition(b.type).name, {}, 'question_types')
    if (aName > bName) {
      return 1
    } else if (aName < bName) {
      return -1
    }

    return 0
  },
  category: (a, b) => {
    const aName = a.meta.category && a.meta.category.name ? a.meta.category.name : ''
    const bName = b.meta.category && b.meta.category.name ? b.meta.category.name : ''
    if (aName > bName) {
      return 1
    } else if (aName < bName) {
      return -1
    }

    return 0
  },
  content: (a, b) => {
    const aValue = a.title ? a.title : a.content
    const bValue = b.title ? b.title : b.content

    if (aValue > bValue) {
      return 1
    } else if (aValue < bValue) {
      return  -1
    }

    return 0
  },
  updated: (a, b) => {
    if (a.meta.updated > b.meta.updated) {
      return 1
    } else if (a.meta.updated < b.meta.updated) {
      return -1
    }

    return 0
  },
  author: () => {

  }
}

export const getVisibleLexicons =  createSelector(
  [getLexicons, getPagination, getSortBy],
  (lexiconsResources, pagination, sortBy) => {
    // Apply pagination
    let visibleLexicons
    if (-1 !== pagination.pageSize) {
      const offset = (pagination.current) * pagination.pageSize
      visibleLexicons = lexiconsResources.slice(offset, offset + pagination.pageSize)
    } else {
      visibleLexicons = lexiconsResources.slice(0)
    }

    if (sortBy.property && sortMethods[sortBy.property]) {
      // Sort results
      return visibleLexicons.sort((a, b) => sortBy.direction * sortMethods[sortBy.property](a, b))
    } else {
      return visibleLexicons
    }
  }
)