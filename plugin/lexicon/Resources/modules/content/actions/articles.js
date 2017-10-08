import {makeActionCreator} from '#/main/core/utilities/redux'
import axios from 'axios'

import {articleGlossaire} from './../../../templates/glossaryTemplate'
import {createEntryJibiki} from './../../home/api/axiosApi'
import {articleDicobilingue} from './../../../templates/dicobilingueTemplate'

export const DELETE_ARTICLE     = 'DELETE_ARTICLE'
export const SHARE_ARTICLE      = 'SHARE_ARTICLE'
export const CONSULT_ARTICLE    = 'CONSULT_ARTICLE'
export const ADD_NEW_ARTICLE    = 'ADD_NEW_ARTICLE'
export const ARTICLES_SET       = 'ARTICLES_SET'

export const actions = {}

actions.setArticles       = makeActionCreator(ARTICLES_SET, 'articles')
actions.deleteArticle     = makeActionCreator(DELETE_ARTICLE, 'handle')
actions.shareArticle      = makeActionCreator(SHARE_ARTICLE, 'handle')
actions.consultArticle    = makeActionCreator(CONSULT_ARTICLE, 'entry', 'content')
actions.addNewArticle     = makeActionCreator(ADD_NEW_ARTICLE, 'articles')


const currentUser  = JSON.parse(document.getElementById('lexicon_content').dataset.user)


function postNewArticle(entryResource){
	const rand      =  Math.random() * (20000000 - 1000) + 1000
	const entryid   =  entryResource.lang+'.'+entryResource.entry+'.'+rand.toString().split('.')[1]+'.b'

	const baseUrlResource = 'http://totoro.imag.fr/lexinnova/api/'
    let lang, sourcelang
    const rexg = /[:]/g

    let instAxios = axios.create({
      baseURL: baseUrlResource,
      headers: {'Accept':'application/xml', 'Content-Type':'application/xml'}
    })

    if(currentUser.username == entryResource.author) {
	    if(entryResource.forme == 'glossaire'){
	    	const dataEntry =  articleGlossaire(entryResource.entry, entryResource.definition, entryResource.lang, entryid, entryResource.name)
	 
	    	axios.all(
		      [
		        createEntryJibiki(instAxios, currentUser.username, currentUser.password, entryResource.name, dataEntry, entryResource.lang, entryid)
		      ]
		    )
		    .then(axios.spread(function (metadata) {
		        const resultsMetadata = metadata.data
		        console.log(resultsMetadata)

		        // Update resource list and total results
		        document.location.reload(true)
		    }))
		    .catch(
		      function(error){
		        return console.log('An error occur glossaire, please correct it : ', error)
		      }
		    )
		    
		}else if(entryResource.forme == 'dictionnaire'){
			const dataEntry =  articleDicobilingue(entryResource.entry, entryResource.category, entryResource.definition, 
													'trad', 'tradcat', entryResource.example, entryResource.lang, 'cible', entryid, entryResource.name)
	    	axios.all(
		      [
		        createEntryJibiki(instAxios, currentUser.username, currentUser.password, entryResource.name, dataEntry, entryResource.lang, entryid)
		      ]
		    )
		    .then(axios.spread(function (metadata) {
		        const resultsMetadata = metadata.data
		        console.log(resultsMetadata)

		        // Update resource list and total results
		        document.location.reload(true)
		    }))
		    .catch(
		      function(error){
		        return console.log('An error occur dictionnaire, please correct it : ', error)
		      }
		    )
		}
    }else {
    	console.log('contribution !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
    	if(entryResource.forme == 'glossaire'){
	    	const dataEntry =  articleGlossaire(entryResource.entry, entryResource.definition, entryResource.lang, entryid, entryResource.name)
	 
	    	axios.all(
		      [
		        createEntryJibiki(instAxios, currentUser.username, currentUser.password, entryResource.name, dataEntry, entryResource.lang, entryid)
		      ]
		    )
		    .then(axios.spread(function (metadata) {
		        const resultsMetadata = metadata.data
		        console.log(resultsMetadata)

		        // Update resource list and total results
		        document.location.reload(true)
		    }))
		    .catch(
		      function(error){
		        return console.log('An error occur glossaire, please correct it : ', error)
		      }
		    )
		    
		}else if(entryResource.forme == 'dictionnaire'){
			const dataEntry =  articleDicobilingue(entryResource.entry, entryResource.category, entryResource.definition, 
													'trad', 'tradcat', entryResource.example, entryResource.lang, 'cible', entryid, entryResource.name)
	    	axios.all(
		      [
		        createEntryJibiki(instAxios, currentUser.username, currentUser.password, entryResource.name, dataEntry, entryResource.lang, entryid)
		      ]
		    )
		    .then(axios.spread(function (metadata) {
		        const resultsMetadata = metadata.data
		        console.log(resultsMetadata)

		        // Update resource list and total results
		        document.location.reload(true)
		    }))
		    .catch(
		      function(error){
		        return console.log('An error occur dictionnaire, please correct it : ', error)
		      }
		    )
		}
    }
}

actions.createArticle = (entryResource) => (postNewArticle(entryResource))


