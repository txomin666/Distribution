import {makeActionCreator} from '#/main/core/utilities/redux'

import {REQUEST_SEND} from './../api/actions'

export const LEXICONS_SHARE  = 'LEXICONS_SHARE'
export const LEXICONS_SET    = 'LEXICONS_SET'
export const LEXICONS_REMOVE = 'LEXICONS_REMOVE'

export const actions = {}

actions.setLexicons    = makeActionCreator(LEXICONS_SET, 'questions')
actions.removeLexicons = makeActionCreator(LEXICONS_REMOVE, 'questions')
actions.share          = makeActionCreator(LEXICONS_SHARE, 'questions', 'users', 'adminRights')

actions.shareQuestions = (questions, users, adminRights) => ({
  [REQUEST_SEND]: {
    route: ['questions_share'],
    request: {
      method: 'POST',
      body: JSON.stringify({
        adminRights,
        questions,
        users: users.map(user => user.id)
      })
    },
    success: () => actions.share(questions, users, adminRights)
  }
})

actions.deleteQuestions = questions => ({
  [REQUEST_SEND]: {
    route: ['questions_delete'],
    request: {
      method: 'DELETE',
      body: JSON.stringify(questions)
    },
    success: () => actions.removeLexicons(questions)
  }
})
