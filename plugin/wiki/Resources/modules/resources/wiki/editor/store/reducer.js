import {makeFormReducer} from '#/main/app/content/form/store/reducer'
import {selectors} from '#/plugin/wiki/resources/wiki/store'

const reducer = makeFormReducer(selectors.STORE_NAME + '.wikiForm')

export {
  reducer
}
