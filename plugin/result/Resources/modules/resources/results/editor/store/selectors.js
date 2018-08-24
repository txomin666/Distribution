import {selectors as formSelectors} from '#/main/app/content/form/store/selectors'

import {selectors as resultSelectors} from '#/plugin/result/resources/results/store/selectors'

const FORM_NAME = resultSelectors.STORE_NAME+'.resultForm'

const result = (state) => formSelectors.data(formSelectors.form(state, FORM_NAME))

export const selectors = {
  FORM_NAME,
  result
}
