import React from 'react'
import {PropTypes as T} from 'prop-types'
import {connect} from 'react-redux'

import {trans} from '#/main/core/translation'

import {MODAL_CONFIRM} from '#/main/app/modals/confirm'
import {actions as modalActions} from '#/main/app/overlay/modal/store'
import {EmptyPlaceholder} from '#/main/core/layout/components/placeholder'
import {selectors as resourceSelect} from '#/main/core/resource/store'
import {hasPermission} from '#/main/core/resource/permissions'

import {actions, selectors} from '#/plugin/announcement/resources/announcement/store'
import {AnnouncePost} from '#/plugin/announcement/resources/announcement/components/announce-post'

const AnnouncesList = props =>
  <div>
    <div className="announces-sort">
      {trans('list_sort_by')}
      <button
        type="button"
        className="btn btn-link"
        disabled={0 === props.posts.length}
        onClick={props.toggleSort}
      >
        {trans(1 === props.sortOrder ? 'from_older_to_newer':'from_newer_to_older', {}, 'announcement')}
      </button>
    </div>

    {props.posts.map(post =>
      <AnnouncePost
        {...post}
        key={post.id}
        editable={props.editable}
        deletable={props.deletable}
        removePost={() => props.removePost(props.aggregateId, post)}
        sendPost={() => props.sendPost(props.aggregateId, post)}
      />
    )}

    {0 === props.posts.length &&
      <EmptyPlaceholder
        size="lg"
        icon="fa fa-bullhorn"
        title={trans('no_announcement', {}, 'announcement')}
      />
    }

    {1 < props.pages &&
      <nav className="text-right">
        <div className="pagination-condensed btn-group">
          <button
            type="button"
            className="btn btn-pagination btn-previous"
            disabled={0 === props.currentPage}
            onClick={() => props.changePage(props.currentPage - 1)}
          >
            <span className="fa fa-angle-double-left" aria-hidden="true" />
            <span className="sr-only">
              {trans(1 === props.sortOrder ? 'older':'newer', {}, 'announcement')}
            </span>
          </button>

          <button
            type="button"
            className="btn btn-pagination btn-next"
            disabled={(props.pages - 1) === props.currentPage}
            onClick={() => props.changePage(props.currentPage + 1)}
          >
            {trans(1 === props.sortOrder ? 'newer':'older', {}, 'announcement')}
            <span className="fa fa-angle-double-right" aria-hidden="true" />
          </button>
        </div>
      </nav>
    }
  </div>

AnnouncesList.propTypes = {
  sortOrder: T.number.isRequired,
  currentPage: T.number.isRequired,
  pages: T.number.isRequired,
  aggregateId: T.string.isRequired,
  posts: T.arrayOf(T.shape({
    id: T.string.isRequired
  })).isRequired,
  toggleSort: T.func.isRequired,
  changePage: T.func.isRequired,
  editable: T.bool,
  deletable: T.bool,
  sendPost: T.func.isRequired,
  removePost: T.func.isRequired
}

const Announces = connect(
  state => ({
    sortOrder: selectors.sortOrder(state),
    currentPage: selectors.currentPage(state),
    pages: selectors.pages(state),
    aggregateId: selectors.aggregateId(state),
    posts: selectors.visibleSortedPosts(state),
    editable: hasPermission('edit', resourceSelect.resourceNode(state)),
    deletable: hasPermission('delete', resourceSelect.resourceNode(state))
  }),
  dispatch => ({
    removePost(aggregateId, announcePost) {
      dispatch(
        modalActions.showModal(MODAL_CONFIRM, {
          icon: 'fa fa-fw fa-trash-o',
          title: trans('remove_announce', {}, 'announcement'),
          question: trans('remove_announce_confirm', {}, 'announcement'),
          dangerous: true,
          handleConfirm: () => dispatch(actions.removeAnnounce(aggregateId, announcePost))
        })
      )
    },
    sendPost(aggregateId, announcePost) {
      dispatch(
        modalActions.showModal(MODAL_CONFIRM, {
          title: trans('send_announce', {}, 'announcement'),
          question: trans('send_announce_confirm', {}, 'announcement'),
          handleConfirm: () => dispatch(actions.sendAnnounce(aggregateId, announcePost))
        })
      )
    },
    toggleSort() {
      dispatch(actions.toggleAnnouncesSort())
    },
    changePage(page) {
      dispatch(actions.changeAnnouncesPage(page))
    }
  })
)(AnnouncesList)

export {
  Announces
}
