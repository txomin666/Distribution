import React, { Component } from 'react'
import {makeActionCreator} from '#/main/core/utilities/redux'

import {REQUEST_SEND} from './actionsApi'

export const SEARCH_ENTRY        = 'SEARCH_ENTRY'
export const CONTENT_ENTRY       = 'CONTENT_ENTRY'
export const EDIT_CONTENT_ENTRY  = 'EDIT_CONTENT_ENTRY'
export const CLICK_SEARCH_ENTRY  = 'CLICK_SEARCH_ENTRY'

export const actions = {}

actions.searchEntry      = makeActionCreator(SEARCH_ENTRY, 'entryToSearch')
actions.goSearchEntry    = makeActionCreator(CLICK_SEARCH_ENTRY, 'clickToSearch')
actions.contentEntry     = makeActionCreator(CONTENT_ENTRY, 'handle')
actions.editContentEntry = makeActionCreator(EDIT_CONTENT_ENTRY, 'entryId', 'entry', 'category', 'definition', 'example')


actions.search = (entryToSearch) => ({
  [REQUEST_SEND]: {
    route: ['search_entry'],
    request: {
      method: 'POST',
      body: JSON.stringify({
        adminRights,
      })
    },
    success: () => actions.searchEntry(entryToSearch)
  }
})

actions.viewEntry = (handle) => ({
  [REQUEST_SEND]: {
    route: ['add_new_entry'],
    request: {
      method: 'POST',
      body: JSON.stringify(questions)
    },
    success: () => actions.contentEntry(handle)
  }
})


actions.editContent = (handle) => ({
  [REQUEST_SEND]: {
    route: ['edit_content_entry'],
    request: {
      method: 'POST',
      body: JSON.stringify(questions)
    },
    success: () => actions.editContentEntry(handle)
  }
})