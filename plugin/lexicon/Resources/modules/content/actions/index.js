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