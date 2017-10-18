/**
 * This file was copied and update from QuestionBank bundle
 */



import {makeReducer} from '#/main/core/utilities/redux'
import {update} from './../utils/utils'

import {
  LEXICONS_SET,
  LEXICONS_SHARE,
  LEXICONS_TOGGLE_VIEW_OFF
} from './../actions/lexicons'


function setLexicons(state, action) {
  let newState = action.lexiconsResources
  action.lexiconsResources.map((questionId, questionIndex) => {
    const question = state.find(question => questionId === question.id)
   
    newState = update(newState, {
      [questionIndex]: {
        meta: {
          sharedWith: {[0]: {adminRights: {$set: True}}}
        }
      }
    })
    
    return newState
  })

}


function toggleViewOff(state, action) {
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
  [LEXICONS_SHARE]: shareResource,
  [LEXICONS_TOGGLE_VIEW_OFF] : toggleViewOff
})

export default lexiconsReducer
