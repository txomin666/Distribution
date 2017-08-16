import React from 'react';
import ReactDOM from 'react-dom'
import {createStore} from '#/main/core/utilities/redux'
import {Provider} from 'react-redux'
import axios from 'axios'
import {lexiconApp} from './reducers/index';
import {makeId} from './utils'

const container   = document.getElementById('lexicon_content')
const currentUser = JSON.parse(container.dataset['user'])
const currenturl  = window.location;
const newurl      = currenturl.pathname.split('/content/')[1];
const dictlang    = newurl.split('/')[1];
const dictname    = newurl.split('/')[0];

const urljibiki = 'http://totoro.imag.fr/lexinnova/api/'+dictname+'/'+dictlang+'/cdm-headword/a/?strategy=GREATER_THAN&sortBy=asc';

let stateData = {}
stateData.id = makeId()
stateData.titleResource = dictname
stateData.typeResource = ''
stateData.author = ''
stateData.clickeditTitle   = false
stateData.clicksearchEntry = false
stateData.clickeditContent = false
stateData.currentUser  = currentUser
stateData.dataEntries  = []


axios.get(urljibiki)
  .then( (response) => {
      const axiosData = response.data;
      const Data = JSON.stringify(axiosData, {'d:entry-list':'d-entry-list', 'd:entry':'d-entry'});
      const re  = /d:/gi;
      const re2  = /dentry-list/gi;
      const newData = Data.replace(re, 'd');
      const newData2 = newData.replace(re2, 'dentrylist');
      const parseData = JSON.parse(newData2);
      generateInitialData(parseData, stateData);
}); 


function generateInitialData(parseData, stateData) {
     const getTitle = parseData.dentrylist;
     const countEntry = parseData.dentrylist.dentry.length;
     stateData.totalEntries = countEntry;
     getTitle.dentry.map( (entry) => { 
           const nameDict = entry.ddictionary;
           const langDict = entry.dlang;
           const entryhandle = entry.dhandle;
           const nameEntry = entry.dcriteria.content;
           const entryCriteria = entry.dcriteria;
           const buildEntries = [nameEntry, entryhandle, nameDict, langDict, entryCriteria]
           stateData.dataEntries.push(buildEntries);
      });
}


const initialData = stateData

//console.log(initialData);


let lexiconStore = createStore(
      lexiconApp, 
      Object.assign({}, initialData, {currentUser})
)

export {lexiconStore}
