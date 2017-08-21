import React, { Component } from 'react'
import {makeActionCreator} from '#/main/core/utilities/redux'
import {REQUEST_SEND} from './actionsApi'


export const SAVE_TITLE_EDIT = 'SAVE_TITLE_EDIT'
export const TITLE_EDIT      = 'TITLE_EDIT'
export const ADD_NEW_ENTRY   = 'ADD_NEW_ENTRY'

export const actions = {}

actions.saveEditTitle = makeActionCreator(SAVE_TITLE_EDIT, 'titleResource')
actions.addEntry      = makeActionCreator(ADD_NEW_ENTRY, 'entryId', 'entry', 'category', 'definition', 'example')
actions.editTitle     = makeActionCreator(TITLE_EDIT, 'clickeditTitle')

actions.saveTitleResource = (titleResource) => ({
  [REQUEST_SEND]: {
    route: ['edit_entry'],
    request: {
      method: 'PUT',
      body: JSON.stringify({
        adminRights,
        questions,
        users: users.map(user => user.id)
      })
    },
    success: () => actions.saveEditTitle(titleResource)
  }
})

actions.addNewEntry = (entryId, entry, category, definition, example) => ({
  [REQUEST_SEND]: {
    route: ['add_new_entry'],
    request: {
      method: 'POST',
      body: JSON.stringify(questions)
    },
    success: () => actions.addEntry(entryId, entry, category, definition, example)
  }
})