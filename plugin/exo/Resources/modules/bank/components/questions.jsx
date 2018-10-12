import React from 'react'
import {PropTypes as T} from 'prop-types'
import {connect} from 'react-redux'

import {actions as modalActions} from '#/main/app/overlay/modal/store'
import {ListData} from '#/main/app/content/list/containers/data'
import {CALLBACK_BUTTON} from '#/main/app/buttons'
import {MODAL_CONFIRM} from '#/main/app/modals/confirm'
import {getPlainText} from '#/main/app/data/html/utils'

import {tex, trans, transChoice} from '#/main/core/translation'
import {
  PageContainer,
  PageHeader,
  PageContent
} from '#/main/core/layout/page'

import {actions} from '#/plugin/exo/bank/actions'
import {MODAL_SHARE} from '#/plugin/exo/bank/components/modal/share'
import {getDefinition, listItemNames} from '#/plugin/exo/items/item-types'
import {Icon as ItemIcon} from '#/plugin/exo/items/components/icon.jsx'

// TODO : restore list grid display

const QuestionsPage = props =>
  <PageContainer id="question-bank">
    <PageHeader title={tex('questions_bank')} />

    <PageContent>
      <ListData
        name="questions"
        fetch={{
          url: ['question_list'],
          autoload: true
        }}
        definition={[
          {
            name: 'type',
            label: tex('type'),
            displayed: true,
            alias: 'mimeType',
            render: (rowData) => {
              // variable is for eslint rule "Component definition is missing display name  react/display-name"
              const itemIcon = <ItemIcon name={getDefinition(rowData.type).name} />

              return itemIcon
            },
            type: 'choice',
            options: {
              choices: listItemNames().reduce(
                (selectObj, itemType) => Object.assign(
                  selectObj, {
                    [itemType.type]: trans(itemType.name, {}, 'question_types')
                  }
                ),
                {}
              )
            }
          }, {
            name: 'content',
            label: tex('question'),
            type: 'string',
            render: (rowData) => {
              if (rowData.title) {
                return rowData.title
              } else {
                const content = getPlainText(rowData.content)

                return 50 < content.length ? `${content.substr(0, 50)}...` : content
              }
            },
            displayed: true
          }, {
            name: 'meta.model',
            label: trans('model'),
            type: 'boolean',
            alias: 'model',
            displayed: true
          }, {
            name: 'meta.created',
            label: trans('creation_date'),
            type: 'date',
            alias: 'dateCreate'
          }, {
            name: 'meta.updated',
            label: trans('last_modification'),
            type: 'date',
            alias: 'dateModify',
            displayed: true,
            options: {
              time: true
            }
          }, {
            name: 'selfOnly',
            label: tex('filter_by_self_only'),
            type: 'boolean',
            displayable: false
          }
        ]}

        actions={(rows) => [
          /*{
            icon: 'fa fa-fw fa-copy',
            label: trans('duplicate'),
            action: (rows) => props.duplicateQuestions(rows, false)
          }, {
            icon: 'fa fa-fw fa-clone',
            label: trans('duplicate_model'),
            action: (rows) => props.duplicateQuestions(rows, true)
          },*/ {
            // TODO : checks if the current user has the rights to share to enable the action
            type: CALLBACK_BUTTON,
            icon: 'fa fa-fw fa-share',
            label: tex('question_share'),
            callback: () => props.shareQuestions(rows)
          }, {
            type: CALLBACK_BUTTON,
            icon: 'fa fa-fw fa-trash-o',
            label: trans('delete'),
            callback: () => props.removeQuestions(rows),
            dangerous: true
          }
        ]}
      />
    </PageContent>
  </PageContainer>

QuestionsPage.propTypes = {
  removeQuestions: T.func.isRequired,
  duplicateQuestions: T.func.isRequired,
  shareQuestions: T.func.isRequired
}

function mapDispatchToProps(dispatch) {
  return {
    removeQuestions(questions) {
      dispatch(
        modalActions.showModal(MODAL_CONFIRM, {
          icon: 'fa fa-fw fa-trash-o',
          title: transChoice('delete_items', questions.length, {count: questions.length}, 'quiz'),
          question: tex('remove_questions_confirm', {
            question_list: questions.map(question => question.title || question.content.substr(0, 40)).join(', ')
          }),
          dangerous: true,
          handleConfirm: () => dispatch(actions.removeQuestions(questions))
        })
      )
    },

    duplicateQuestions(questions, asModel = false) {
      dispatch(
        modalActions.showModal(MODAL_CONFIRM, {
          title: transChoice(asModel ? 'copy_model_questions' : 'copy_questions', questions.length, {count: questions.length}, 'quiz'),
          question: tex(asModel ? 'copy_model_questions_confirm' : 'copy_questions_confirm', {
            workspace_list: questions.map(question => question.title || question.content.substr(0, 40)).join(', ')
          }),
          handleConfirm: () => dispatch(actions.duplicateQuestions(questions, asModel))
        })
      )
    },

    shareQuestions(questions) {
      dispatch(modalActions.showModal(MODAL_SHARE, {
        title: transChoice('share_items', questions.length, {count: questions.length}, 'quiz'),
        handleShare: (users, adminRights) => {
          dispatch(modalActions.fadeModal())
          dispatch(actions.shareQuestions(questions, users, adminRights))
        }
      }))
    }
  }
}

const Questions = connect(null, mapDispatchToProps)(QuestionsPage)

export {
  Questions
}
