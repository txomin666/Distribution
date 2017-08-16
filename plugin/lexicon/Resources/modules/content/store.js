import React from 'react';
import ReactDOM from 'react-dom'
import {createStore} from '#/main/core/utilities/redux'
import {Provider} from 'react-redux'
import {lexiconApp} from './reducers/index';
import { AxiosProvider, Request, Get, Delete, Head, Post, Put, Patch, withAxios } from 'react-axios'

//http://totoro.imag.fr/lexinnova/api/Lexinnova/esp/cdm-headword/a/?strategy=GREATER_THAN OR EQUAL'

const container   = document.getElementById('lexicon_content')
const currentUser = JSON.parse(container.dataset['user'])


const initialData = {
	id : '2g36dfarj',
	titleResource : 'Dictionnaire espagnol L1',
      typeResource : 'Dictionnaire',
      author: 'Elvis MBONING',
	clickeditTitle: false,
      clicksearchEntry: false,
      clickeditContent: false,
      totalEntries: 11,
      currentUser:'',
	dataEntries  : [
            ['abjurar', {}],
            ['botarate', {}],
            ['Bretaña', {}],
            ['brutalizar', {}],
            ['desvelar', {}],
            ['diámetro', {}],
            ['fotólisis', {}],
            ['fresón', {}],
            ['golpiza', {}],
            ['grandilocuente', {}],
            ['mongolismo', {}]
	]
}



let lexiconStore = createStore(
      lexiconApp, 
      Object.assign({}, initialData, {currentUser})
)

export {lexiconStore}
