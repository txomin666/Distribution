import {makeActionCreator} from '#/main/app/store/actions'
import {API_REQUEST, url} from '#/main/app/api'

import {actions as listActions} from '#/main/app/content/list/store'

import {selectors} from '#/plugin/claco-form/resources/claco-form/store/selectors'

const RESOURCE_PROPERTY_UPDATE = 'RESOURCE_PROPERTY_UPDATE'
const RESOURCE_PARAMS_PROPERTY_UPDATE = 'RESOURCE_PARAMS_PROPERTY_UPDATE'

const CATEGORY_ADD = 'CATEGORY_ADD'
const CATEGORY_UPDATE = 'CATEGORY_UPDATE'
const CATEGORIES_REMOVE = 'CATEGORIES_REMOVE'
const KEYWORD_ADD = 'KEYWORD_ADD'
const KEYWORD_UPDATE = 'KEYWORD_UPDATE'
const KEYWORDS_REMOVE = 'KEYWORDS_REMOVE'

const actions = {}

actions.updateResourceProperty = makeActionCreator(RESOURCE_PROPERTY_UPDATE, 'property', 'value')
actions.updateResourceParamsProperty = makeActionCreator(RESOURCE_PARAMS_PROPERTY_UPDATE, 'property', 'value')

actions.saveCategory = (category, isNew) => (dispatch, getState) => {
  if (isNew) {
    const clacoFormId = selectors.clacoForm(getState()).id
    category['clacoForm'] = {}
    category['clacoForm']['id'] = clacoFormId

    dispatch({
      [API_REQUEST]: {
        url: ['apiv2_clacoformcategory_create'],
        request: {
          method: 'POST',
          body: JSON.stringify(category)
        },
        success: (data, dispatch) => {
          dispatch(actions.addCategory(data))
        }
      }
    })
  } else {
    dispatch({
      [API_REQUEST]: {
        url: ['apiv2_clacoformcategory_update', {id: category.id}],
        request: {
          method: 'PUT',
          body: JSON.stringify(category)
        },
        success: (data, dispatch) => {
          dispatch(actions.updateCategory(data))
        }
      }
    })
  }
}

actions.deleteCategories = (categories) => ({
  [API_REQUEST]: {
    url: url(['apiv2_clacoformcategory_delete_bulk', {ids: categories.map(c => c.id)}]),
    request: {
      method: 'DELETE'
    },
    success: (data, dispatch) => {
      dispatch(actions.removeCategories(categories.map(c => c.id)))
      dispatch(listActions.deleteItems(selectors.STORE_NAME+'.clacoFormForm.categories', categories))
    }
  }
})

actions.addCategory = makeActionCreator(CATEGORY_ADD, 'category')
actions.updateCategory = makeActionCreator(CATEGORY_UPDATE, 'category')
actions.removeCategories = makeActionCreator(CATEGORIES_REMOVE, 'ids')

actions.saveKeyword = (keyword, isNew) => (dispatch, getState) => {
  if (isNew) {
    const clacoFormId = selectors.clacoForm(getState()).id
    keyword['clacoForm'] = {}
    keyword['clacoForm']['id'] = clacoFormId

    dispatch({
      [API_REQUEST]: {
        url: ['apiv2_clacoformkeyword_create'],
        request: {
          method: 'POST',
          body: JSON.stringify(keyword)
        },
        success: (data, dispatch) => {
          dispatch(actions.addKeyword(data))
        }
      }
    })
  } else {
    dispatch({
      [API_REQUEST]: {
        url: ['apiv2_clacoformkeyword_update', {id: keyword.id}],
        request: {
          method: 'PUT',
          body: JSON.stringify(keyword)
        },
        success: (data, dispatch) => {
          dispatch(actions.updateKeyword(data))
        }
      }
    })
  }
}

actions.deleteKeywords = (keywords) => ({
  [API_REQUEST]: {
    url: url(['apiv2_clacoformkeyword_delete_bulk', {ids: keywords.map(k => k.id)}]),
    request: {
      method: 'DELETE'
    },
    success: (data, dispatch) => {
      dispatch(actions.removeKeywords(keywords.map(k => k.id)))
      dispatch(listActions.deleteItems(selectors.STORE_NAME+'.clacoFormForm.keywords', keywords))
    }
  }
})

actions.addKeyword = makeActionCreator(KEYWORD_ADD, 'keyword')
actions.updateKeyword = makeActionCreator(KEYWORD_UPDATE, 'keyword')
actions.removeKeywords = makeActionCreator(KEYWORDS_REMOVE, 'ids')

export {
  actions,
  RESOURCE_PROPERTY_UPDATE,
  RESOURCE_PARAMS_PROPERTY_UPDATE,
  CATEGORY_ADD,
  CATEGORY_UPDATE,
  CATEGORIES_REMOVE,
  KEYWORD_ADD,
  KEYWORD_UPDATE,
  KEYWORDS_REMOVE
}