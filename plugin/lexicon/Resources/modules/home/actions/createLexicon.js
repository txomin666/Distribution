import {makeActionCreator} from '#/main/core/utilities/redux'

//import {REQUEST_SEND} from './../api/actions'
import {actions as modalActions} from '#/main/core/layout/modal/actions'
import {actions as lexiconActions} from './lexicons'
import {actions as totalResultsActions} from './total-results'
import axios from 'axios'

export const SEARCH_CLEAR_FILTERS  = 'SEARCH_CLEAR_FILTERS'
export const ADD_NEW_RESOURCE      = 'ADD_NEW_RESOURCE'

export const actions = {}

function postNewResource(questions, pagination, sortBy)
{
    const urlResource = 'http://totoro.imag.fr/lexinnova/api/testResource'

    const metadata = 
          '<?xml version="1.0" encoding="UTF-8"?>\
              <dictionary-metadata-files>\
                <dictionary-metadata\
                   xmlns="http://www-clips.imag.fr/geta/services/dml"\
                   xmlns:d="http://www-clips.imag.fr/geta/services/dml"\
                   xmlns:xlink="http://www.w3.org/1999/xlink"\
                   xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\
                   category="bilingual"\
                   creation-date="2015-05-14T07:44:55+02:00"\
                   fullname="Dictionnaire japonais-français par Gustave Cesselin"\
                   installation-date="2015-05-14T07:44:55+02:00"\
                   last-modification-date="2015-05-14T07:45:53+02:00"\
                   name="Cesselin"\
                   owner="mangeot"\
                   type="monodirectional"\
                   xsi:schemaLocation="http://www-clips.imag.fr/geta/services/dml http://www-clips.imag.fr/geta/services/dml/dml.xsd">\
                </dictionary-metadata>\
                <xsl:stylesheet> </xsl:stylesheet>\
              </dictionary-metadata-files>'

    //const data   = new Blob(metadata, {type: 'application/xml'})
    //const reader = new FileReader(metadata)

    //console.log(reader, data)

    axios.post(urlResource, {metadata})
      .then( (response, dispatch) => {
        const questionsResults = response.data
        console.log(questionsResults)
        // Update total results
        dispatch(totalResultsActions.changeTotalResults(questionsResults.totalResults))
        // Update resource list
        dispatch(lexiconActions.setQuestions(questionsResults.questions))
  
    })
}


actions.fetchLexicons = (questions, pagination = {}, sortBy = {}) => (postNewResource(questions, pagination, sortBy))


actions.addNewResource = makeActionCreator(ADD_NEW_RESOURCE, 'questions')

actions.createLexicon = (questions, pagination = {}, sortBy = {}) => {
  return (dispatch) => {
    // Close search modal
    dispatch(modalActions.fadeModal())

    // Update filters
    dispatch(actions.addNewResource(questions))

    // Fetch new resource list
    return dispatch(actions.fetchLexicons(questions, pagination, sortBy))
  }
}

actions.saveResource = (pagination = {}, sortBy = {}) => {
  return (dispatch) => {
    // Close search modal
    dispatch(modalActions.fadeModal())

    // Update filters
    dispatch(actions.addNewResource({}))

    // Fetch new resource list
    return dispatch(actions.fetchLexicons({}, pagination, sortBy))
  }
}
