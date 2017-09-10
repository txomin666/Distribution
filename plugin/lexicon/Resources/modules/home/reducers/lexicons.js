import {makeReducer} from '#/main/core/utilities/redux'
import {update} from './../utils/utils'

import {
  LEXICONS_SET,
  LEXICONS_REMOVE,
  LEXICONS_SHARE
} from './../actions/lexicons'

function setLexicons(state, action) {
  return action.questions
}

function removeLexicons(state, action) {
  let newState = state
  action.questions.map((questionId) => {
    const pos = newState.findIndex(questionId)
    if (-1 !== pos) {
      newState = update(newState, {$splice: [[pos, 1]]})
    }
  })

  return newState
}

function shareLexicons(state, action) {
  let newState = state

  action.questions.map((questionId, questionIndex) => {
    const question = state.find(question => questionId === question.id)
    action.users.map((user) => {
      let newShare = {
        user: user,
        adminRights: action.adminRights
      }

      // Check if the question is already shared with the user
      let alreadyShared = false
      for (let i = 0; i < question.meta.sharedWith.length;i++) {
        let shared = question.meta.sharedWith[i]
        if (shared.user.id === user.id) {
          newState = update(newState, {
            [questionIndex]: {
              meta: {
                sharedWith: {[i]: {$set: newShare}}
              }
            }
          })
          alreadyShared = true
          break
        }

        if (!alreadyShared) {
          newState = update(newState, {
            [questionIndex]: {
              meta: {
                sharedWith: {$push: [newShare]}
              }
            }
          })
        }
      }
    })
  })

  return newState
}

const lexiconsReducer = makeReducer([], {
  [LEXICONS_SET]: setLexicons,
  [LEXICONS_REMOVE]: removeLexicons,
  [LEXICONS_SHARE]: shareLexicons
})

export default lexiconsReducer
