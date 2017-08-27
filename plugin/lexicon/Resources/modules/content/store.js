import React from 'react'
import {createStore} from '#/main/core/utilities/redux'
import axios from 'axios'
import {lexiconApp} from './reducers/index'
import {makeId} from './utils'


const container   = document.getElementById('lexicon_content')
const currentUser = JSON.parse(container.dataset['user'])
const currenturl  = window.location;
const newurl      = currenturl.pathname.split('/content/')[1];
const dicttype    = newurl.split('/')[0];
const dictname    = newurl.split('/')[1];
const dictlang    = newurl.split('/')[2];
const dictauthor  = newurl.split('/')[3];

const urljibiki   = 'http://totoro.imag.fr/lexinnova/api/'+dictname+'/'+dictlang+'/cdm-headword/a/?strategy=GREATER_THAN&sortBy=asc';


function setAllArticles(articles) {
  return {
    type: 'ARTICLES_SET',
    articles
  }
}

const stateData = {}
stateData.metaResource       = {}
stateData.metaResource.id    = makeId()
stateData.metaResource.title = dictname
stateData.metaResource.type  = dicttype
stateData.metaResource.author    = dictauthor
stateData.metaResource.lang      = dictlang
stateData.metaResource.editable         = false
stateData.metaResource.searchable       = false
stateData.metaResource.articleEditable  = false
stateData.search              = {}
stateData.search.value        = ''
stateData.modal               = {}
stateData.modal.type          = 'addArticle'
stateData.modal.open          = false
stateData.currentUser         = currentUser
stateData.articles            = []
stateData.currentContentArticle   = ""


let lexiconStore = createStore(
      lexiconApp, 
      Object.assign({}, stateData, {currentUser})
)

axios.get(urljibiki)
  .then( (response) => {
    const axiosData = response.data
    const Data = JSON.stringify(axiosData, {'d:entry-list':'d-entry-list', 'd:entry':'d-entry'})
    const re  = /d:/gi
    const re2  = /dentry-list/gi
    const newData = Data.replace(re, 'd')
    const newData2 = newData.replace(re2, 'dentrylist')
    const parseData = JSON.parse(newData2)
    generateInitialData(parseData)
  })

function generateInitialData(parseData) {
    const getTitle    = parseData.dentrylist
    const total       = parseData.dentrylist.dentry.length
    let articles = []
    getTitle.dentry.map( (entry) => { 
       const nameDict = entry.ddictionary
       const langDict = entry.dlang
       const entryhandle   = entry.dhandle
       const nameEntry     = entry.dcriteria.content
       const entryCriteria = entry.dcriteria
       const buildEntries  = {'entry':nameEntry, 'handle':entryhandle, 'editable':false, 'meta':entryCriteria}
       articles.push(buildEntries)
    })
    lexiconStore.dispatch(setAllArticles(articles))
}


export {lexiconStore}



//http://127.0.0.1:8000/app_dev.php/lexicon/content/Lexinnova/Lexinnova/esp/Lexinnova
//http://127.0.0.1:8000/app_dev.php/lexicon/content/Glossaire/Glossaire/fra/mangeot