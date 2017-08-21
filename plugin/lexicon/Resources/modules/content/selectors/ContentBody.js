import React, { Component } from 'react'
import {createSelector} from 'reselect'
import size from 'lodash/size'


const TotalEntries  = (state) => state.totalEntries
const AllEntries    = (state) => state.dataEntries
const currentUser   = (state) => state.currentUser
const typeResource  = (state) => state.typeResource
const author        = (state) => state.author
const titleResource = (state) => state.titleResource
const getClicksearchEntry  = (state) => state.clicksearchEntry
const getClickeditContent  = (state) => state.clickeditContent


const getCountEntries = createSelector(
  [AllEntries],
  (dataEntries) => size(dataEntries)
)


export const select = {
	TotalEntries,
	AllEntries,
	currentUser,
	getCountEntries,
	author,
	typeResource,
	titleResource,
	getClickeditContent,
	getClicksearchEntry
}