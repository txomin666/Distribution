import {createSelector} from 'reselect'
import isEmpty from 'lodash/isEmpty'
import uniq from 'lodash/uniq'

import {select as quizSelect} from '#/plugin/exo/quiz/selectors'

import {tex, trans} from '#/main/core/translation'

import {TYPE_QUIZ, TYPE_STEP} from './../enums'

const quiz = createSelector( // todo : duplicated
  [quizSelect.resource],
  (resource) => resource.quiz
)
const steps = createSelector( // todo : duplicated
  [quizSelect.resource],
  (resource) => resource.steps
)
const items = createSelector( // todo : duplicated
  [quizSelect.resource],
  (resource) => resource.items
)

const editor = createSelector( // todo : duplicated
  [quizSelect.resource],
  (resource) => resource.editor
)

const saved = createSelector(editor, editor => editor.saved)
const saving = createSelector(editor, editor => editor.saving)
const saveEnabled = createSelector([saved, saving], (saved, saving) => !saved && !saving)
const validating = createSelector(editor, editor => editor.validating)
const currentObject = createSelector(editor, editor => editor.currentObject)
const openPanels = createSelector(editor, editor => editor.openPanels)
const quizOpenPanel = createSelector(openPanels, panels => panels[TYPE_QUIZ])
const openStepPanels = createSelector(openPanels, panels => panels[TYPE_STEP])


const stepList = createSelector(
  quiz,
  steps,
  (quiz, steps) => !isEmpty(quiz.steps) ? quiz.steps.map(id => steps[id]) : []
)

// retrieves the list of used tags and the number of questions using it
const tags = createSelector(
  items,
  (items) => uniq(Object.keys(items).map(key => items[key]).reduce((tags, item) => [...tags.concat(item.tags)], []))
)

const quizThumbnail = createSelector(
  quiz,
  currentObject,
  (quiz, current) => {
    return {
      id: quiz.id,
      title: trans('parameters'),
      type: TYPE_QUIZ,
      active: quiz.id === current.id && current.type === TYPE_QUIZ,
      hasErrors: !isEmpty(quiz._errors)
    }
  }
)

const stepThumbnails = createSelector(
  stepList,
  currentObject,
  items,
  (steps, current, items) => steps.map((step, index) => {
    return {
      id: step.id,
      title: step.title || `${tex('step')} ${index + 1}`,
      type: TYPE_STEP,
      active: step.id === current.id && current.type === TYPE_STEP,
      hasErrors: !!step.items.find(id => !isEmpty(items[id]._errors))
    }
  })
)

const thumbnails = createSelector(
  quizThumbnail,
  stepThumbnails,
  (quiz, steps) => [quiz].concat(steps)
)

const currentObjectDeep = createSelector(
  currentObject,
  quiz,
  steps,
  items,
  (current, quiz, steps, items) => {
    if (current.type === TYPE_QUIZ) {
      return {
        type: TYPE_QUIZ,
        id: quiz.id
      }
    }

    return Object.assign({}, steps[current.id], {
      type: TYPE_STEP,
      items: steps[current.id].items.map(itemId => items[itemId])
    })
  }
)

const currentObjectIndex = createSelector(
  currentObject,
  steps,
  (currentObject, steps) => {
    if (currentObject.type === TYPE_QUIZ) {
      return null
    }

    return Object.keys(steps).indexOf(currentObject.id) + 1
  }
)

const stepOpenPanel = createSelector(
  currentObject,
  openStepPanels,
  (current, panels) => {
    if (current.type === TYPE_STEP && panels[current.id] !== undefined) {
      return panels[current.id]
    }
    return false
  }
)

const nextObject = createSelector(
  currentObject,
  quiz,
  stepList,
  (current, quiz, steps) => {
    if (current.type === TYPE_QUIZ) {
      return current
    }

    if (steps.length <= 1) {
      return {
        id: quiz.id,
        type: TYPE_QUIZ
      }
    }

    const stepIndex = steps.findIndex(step => step.id === current.id)
    const nextIndex = stepIndex === 0 ? (stepIndex + 1) : (stepIndex - 1)

    return {
      id: steps[nextIndex].id,
      type: TYPE_STEP
    }
  }
)

const valid = createSelector(
  quiz,
  stepList,
  items,
  (quiz, steps, items) => {
    const hasQuizError = !isEmpty(quiz._errors)
    const hasStepError = !!steps.find(step => {
      return !!step.items.find(id => !isEmpty(items[id]._errors))
    })
    return !hasQuizError && !hasStepError
  }
)

// todo remove default exports and use `select`
export default {
  quiz,
  items,
  thumbnails,
  currentObjectDeep,
  currentObjectIndex,
  quizOpenPanel,
  stepOpenPanel,
  nextObject,
  editor,
  valid,
  validating,
  saved,
  steps,
  tags,
  saveEnabled
}

export const select = {
  quiz,
  items,
  thumbnails,
  currentObjectDeep,
  currentObjectIndex,
  quizOpenPanel,
  stepOpenPanel,
  nextObject,
  editor,
  valid,
  validating,
  saved,
  steps,
  tags,
  saveEnabled
}
