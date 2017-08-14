import {makeActionCreator} from '#/main/core/utilities/redux'
import {generateUrl} from '#/main/core/fos-js-router'
import {REQUEST_SEND} from '#/main/core/api/actions'




export const createEntry = (newItem) => {
	return {
		type: 'CREATE_ENTRY',
		item: newItem
	}
}

export const searchEntry = () => {
	return {
		type: 'SEARCH_ENTRY'
	}
}

export const editEntry = () => {
	return {
		type: 'EDIT_ENTRY'
	}
}

export const consultEntry = () => {
	return {
		type: 'CONSULT_ENTRY'
	}
}

export const editTitle = () => {
	return {
		type: 'EDIT_TITLE'
	}
}

export const scrollEntries = () => {
	return {
		type: 'SCROLL_ENTRIES'
	}
}