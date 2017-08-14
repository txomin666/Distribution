import React from 'react';
import {createStore} from '#/main/core/utilities/redux'
import {Provider} from 'react-redux'

import lexiconReducer from './reducers/index';
import { AxiosProvider, Request, Get, Delete, Head, Post, Put, Patch, withAxios } from 'react-axios'

//http://totoro.imag.fr/lexinnova/api/Lexinnova/esp/cdm-headword/a/?strategy=GREATER_THAN OR EQUAL'

const initialState = {
	id : '2g36dfarj',
	titleResource : 'Dictionnaire espagnol L2',
	dataItems  : [
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



let lexiconStore = createStore(lexiconReducer, initialState)

export {lexiconStore}
