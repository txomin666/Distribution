/**
 * This file was copied and update from QuestionBank bundle
 */


import { connect } from 'react-redux'

import {translex} from '#/main/core/translation'
import LexiconList from './../components/lexicon-list.jsx'
import {getVisibleLexicons} from './../selectors/lexicons'
import {actions as sortActions} from './../actions/sort-by'
import {actions as lexiconsActions} from './../actions/lexicons'
import {actions as selectActions} from './../actions/select'
import {actions as modalActions} from '#/main/core/layout/modal/actions'
import {MODAL_DELETE_CONFIRM} from '#/main/core/layout/modal'
import {MODAL_SHARE} from './../components/modal/share.jsx'
import {select} from './../selectors'

const mapStateToProps = (state) => {
  return {
    lexiconsResources: getVisibleLexicons(state),
    selected: select.selected(state),
    sortBy: state.sortBy
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    /**
     * Update sort order.
     *
     * @param property
     */
    onSort: (property) => {
      dispatch(sortActions.updateSortBy(property))
    },

    toggleSelectPage: () => {

    },

    toggleSelectAll: () => {

    },

    toggleSelect: (item) => {
      dispatch(selectActions.toggleSelect(item.id))
    },

    onShare: (items) => {
      dispatch(modalActions.showModal(MODAL_SHARE, {
        title: translex('Partager la ressource lexicale', items.length, {count: items.length}, 'lexicon'),
        fadeModal: () => dispatch(modalActions.fadeModal()),
        handleShare: (users, adminRights) => {
          dispatch(modalActions.fadeModal())
          dispatch(lexiconsActions.shareResource(items, users, adminRights))
        }
      }))
    },

    onDelete: (items) => {
      dispatch(modalActions.showModal(MODAL_DELETE_CONFIRM, {
        title: translex('Supprimer la ressource lexicale', items.length, {count: items.length}, 'lexicon'),
        question: translex('remove_lexicon_resource_confirm_message'),
        handleConfirm: () => dispatch(lexiconsActions.deleteResource(items)),
        fadeModal: () => dispatch(modalActions.fadeModal())
      }))
    }
  }
}

const VisibleLexicons = connect(
  mapStateToProps,
  mapDispatchToProps
)(LexiconList)

export default VisibleLexicons
