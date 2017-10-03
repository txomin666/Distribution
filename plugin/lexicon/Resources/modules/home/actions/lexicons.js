/**
 * This file was copied and update from QuestionBank bundle
 */


import {makeActionCreator} from '#/main/core/utilities/redux'
import axios from 'axios'
import {deleteRessourceJibiki, deleteVolumeResourceJibiki} from './../api/axiosApi'

import {REQUEST_SEND} from './../api/actions'

export const LEXICONS_SHARE  = 'LEXICONS_SHARE'
export const LEXICONS_SET    = 'LEXICONS_SET'
export const LEXICONS_REMOVE = 'LEXICONS_REMOVE'

export const actions = {}

actions.setLexicons    = makeActionCreator(LEXICONS_SET, 'lexiconsResources')
actions.deleteResource = makeActionCreator(LEXICONS_REMOVE, 'lexiconsResources')
actions.shareResource  = makeActionCreator(LEXICONS_SHARE, 'lexiconsResources', 'users', 'adminRights')

actions.sharelexiconsResources = (lexiconsResources, users, adminRights) => ({
  [REQUEST_SEND]: {
    route: ['questions_share'],
    request: {
      method: 'POST',
      body: JSON.stringify({
        adminRights,
        lexiconsResources,
        users: users.map(user => user.id)
      })
    },
    success: () => actions.shareResource(lexiconsResources, users, adminRights)
  }
})

function deleteLexiconResource(lexiconsResources){
    const currentUser   = JSON.parse(document.getElementById('lexicon').dataset.user)
    console.log(lexiconsResources)

    
    axios.all(
      [
        deleteRessourceJibiki(currentUser.username, currentUser.password, lexiconsResources[0]),
        deleteVolumeResourceJibiki(currentUser.username, currentUser.password, lexiconsResources[0], lexiconsResources[1][0])
      ]
    )
    .then(axios.spread(function (resource, volume) {
        const resultsMetadata = resource.data
        const resultsVolume   = volume.data
        console.log(resultsMetadata, resultsVolume)
        
        // Update resource list and total results
        document.location.reload(true)
    }))
    .catch(
      function(error){
        return console.log('An error occur, please correct it : ', error)
      }
    )
    
}


actions.deleteResource = lexiconsResources => (deleteLexiconResource(lexiconsResources))