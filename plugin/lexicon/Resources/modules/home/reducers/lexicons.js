/**
 * This file was copied and update from QuestionBank bundle
 */



import {makeReducer} from '#/main/core/utilities/redux'
import {update} from './../utils/utils'

import {
  LEXICONS_SET,
  LEXICONS_SHARE
} from './../actions/lexicons'

function setLexicons(state, action) {
  return action.lexiconsResources
}


function shareResource(state, action) {
  let newState = state

  action.lexiconsResources.map((questionId, questionIndex) => {
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
  [LEXICONS_SHARE]: shareResource
})

export default lexiconsReducer
