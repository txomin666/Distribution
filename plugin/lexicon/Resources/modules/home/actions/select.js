/**
 * This file was copied and update from QuestionBank bundle
 */


import {makeActionCreator} from '#/main/core/utilities/redux'

export const SELECT_TOGGLE = 'SELECT_TOGGLE'

export const actions = {}

actions.toggleSelect = makeActionCreator(SELECT_TOGGLE, 'itemId')
