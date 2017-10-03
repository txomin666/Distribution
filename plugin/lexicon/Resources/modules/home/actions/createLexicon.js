/**
 * This file was copied and update from QuestionBank bundle
 */


import {makeActionCreator} from '#/main/core/utilities/redux'

import {actions as modalActions} from '#/main/core/layout/modal/actions'
import {actions as lexiconActions} from './lexicons'
import {actions as totalResultsActions} from './total-results'
import axios from 'axios'

import {metaDicobilingue, volumeDicobilingue} from './../../../templates/dicobilingueTemplate'
import {metaGlossaire, volumeGlossaire} from './../../../templates/glossaryTemplate'
import {postMetadata, postVolume} from './../api/axiosApi'

export const SEARCH_CLEAR_FILTERS  = 'SEARCH_CLEAR_FILTERS'
export const ADD_NEW_RESOURCE      = 'ADD_NEW_RESOURCE'
  
export const actions = {}

const currentUser   = JSON.parse(document.getElementById('lexicon').dataset.user)

console.log(currentUser.password)

function postNewResource(lexiconsResources, pagination, sortBy)
{
    const baseUrlResource = 'http://totoro.imag.fr/lexinnova/api/'
    console.log(lexiconsResources)
    let lang, sourcelang
    const rexg = /[:]/g
    if(lexiconsResources.lang.search(rexg) == 0) {lang = lexiconsResources.lang.split(':')}else{sourcelang = lexiconsResources.lang}

    let metadataDico, metadataVolDico, metadataGloss, metadataVolGloss
    if(Array.isArray(lang)){
        if(lexiconsResources.forme == 'dictionnaire'){
            metadataDico     = metaDicobilingue(lexiconsResources.name, currentUser, lexiconsResources.type, lexiconsResources.category,
                                      lexiconsResources.fullname, lang[0], lang[1])
            metadataVolDico  = volumeDicobilingue(lexiconsResources.name, currentUser, lang[0], lang[1], lexiconsResources.fullname, 
                                      lexiconsResources.category, lexiconsResources.type, lexiconsResources.comment)
        }else if(lexiconsResources.forme == 'glossaire'){
            metadataGloss    = metaGlossaire(lexiconsResources.name, currentUser, lexiconsResources.type, lexiconsResources.category,
                                      lexiconsResources.fullname, sourcelang)
            metadataVolGloss = volumeGlossaire(lexiconsResources.name, currentUser, sourcelang, lexiconsResources.fullname, 
                                      lexiconsResources.category, lexiconsResources.type, lexiconsResources.comment)
        }
    }else{
        metadataGloss    = metaGlossaire(lexiconsResources.name, currentUser, lexiconsResources.type, lexiconsResources.category,
                                      lexiconsResources.fullname, sourcelang)
        metadataVolGloss = volumeGlossaire(lexiconsResources.name, currentUser, sourcelang, lexiconsResources.fullname, 
                                      lexiconsResources.category, lexiconsResources.type, lexiconsResources.comment)
    }

    let instAxios = axios.create({
      baseURL: baseUrlResource,
      headers: {'Accept':'application/xml', 'Content-Type':'application/xml'}
    })

    //console.log(metadataVolDico)

    if(metadataGloss){
        axios.all(
          [
            postMetadata(instAxios, currentUser.username, currentUser.password, metadataGloss, lexiconsResources.name),
            postVolume(instAxios, currentUser.username, currentUser.password, metadataVolGloss, lexiconsResources.name, sourcelang)
          ]
        )
        .then(axios.spread(function (metadata, volume) {
            const resultsMetadata = metadata.data
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
    }else if (metadataDico) {
        axios.all(
          [
            postMetadata(instAxios, currentUser.username, currentUser.password, metadataDico, lexiconsResources.name),
            postVolume(instAxios, currentUser.username, currentUser.password, metadataVolDico, lexiconsResources.name, lang[0])
          ]
        )
        .then(axios.spread(function (metadata, volume) {
            const resultsMetadata = metadata.data
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
    
}


actions.fetchLexicons = (lexiconsResources, pagination = {}, sortBy = {}) => (postNewResource(lexiconsResources, pagination, sortBy))

actions.addNewResource = makeActionCreator(ADD_NEW_RESOURCE, 'lexiconsResources')

actions.createLexicon = (lexiconsResources, pagination = {}, sortBy = {}) => {
  return (dispatch) => {
    // Close search modal
    dispatch(modalActions.fadeModal())

    // Fetch new resource list
    return dispatch(actions.fetchLexicons(lexiconsResources, pagination, sortBy))
  }
}

actions.saveResource = (pagination = {}, sortBy = {}) => {
  return (dispatch) => {
    // Close search modal
    dispatch(modalActions.fadeModal())

    // Fetch new resource list
    return dispatch(actions.fetchLexicons({}, pagination, sortBy))
  }
}
