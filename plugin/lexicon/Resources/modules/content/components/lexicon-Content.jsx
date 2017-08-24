import React, { Component } from 'react'
import {PropTypes as T} from 'prop-types'
import { connect }      from 'react-redux'
import LexiconContentHeader from './LexiconContentHeader.jsx'
import LexiconContentBody   from './LexiconContentBody.jsx'
import {select  as selectArticles}  from './../selectors/articles' 
import {actions as actionsArticles} from './../actions/articles'
import {actions as actionsMetaResource} from './../actions/metaResource' 
import {actions as actionsSearch} from './../actions/search' 
import {actions as actionsClicks} from './../actions/clicks' 
import {actions as actionsTotalArticles} from './../actions/totalArticles' 
import {actions as actionsModal}  from './../actions/modal' 
import {select  as selectMetaResource}  from './../selectors/metaResource'
import {select  as selectOthers}  from './../selectors'


console.log(actionsArticles)

class LexiconContent extends Component {

  render() {
    return (
      <div className="">
          <LexiconContentHeader
            metaResource        = {this.props.metaResource}
            actionAddArticle    = {this.props.actionAddArticle}
            actionSaveEditTitle = {this.props.actionSaveEditTitle}
            clickEditTitle      = {this.props.clickEditTitle}
            modalAddArticle     = {this.props.modalAddArticle}
            actionSaveTitleEdit = {this.props.actionSaveTitleEdit}
          />
          <LexiconContentBody
            metaResource      = {this.props.metaResource}
            articles          = {this.props.articles}
            totalArticles     = {this.props.totalArticles}
            search            = {this.props.search}
            clickEditArticle  = {this.props.clickEditArticle}
            saveEditArticle   = {this.props.saveEditArticle}
            clickSearchArticle  = {this.props.clickSearchArticle}
            searchArticle       = {this.props.searchArticle}
            consultArticle      = {this.props.consultArticle}
            articleEditable     = {this.props.articleEditable}
          />
      </div>
    );
  }

}

LexiconContent.propTypes = {
  metaResource: T.shape({
    id: T.string.isRequired,
    type: T.string.isRequired,
    lang: T.string.isRequired,
    title: T.string.isRequired,
    author: T.string.isRequired,
    editable: T.bool
  }).isRequired,
  articles: T.array.isRequired,
  totalArticles: T.number.isRequired,
  search: T.shape({
    searchable: T.bool,
    valueSearch: T.string,
  }).isRequired,
  articleEditable: T.bool,
  actionAddArticle: T.func.isRequired,
  clickEditTitle: T.func.isRequired,
  clickEditArticle: T.func.isRequired,
  actionSaveTitleEdit: T.func.isRequired,
  saveEditArticle: T.func.isRequired,
  clickSearchArticle: T.func.isRequired,
  searchArticle: T.func.isRequired,
  consultArticle: T.func.isRequired,
  modalAddArticle: T.func.isRequired,
}


function mapStateToProps(state) {
  return {
    metaResource: selectMetaResource.getMetaResource(state),
    articles: selectArticles.getArticles(state),
    totalArticles: selectArticles.getTotalArticles(state),
    search: selectOthers.getSearch(state),
    articleEditable: selectOthers.getArticleEditable(state)
  }
}


function mapDispatchToProps(dispatch) {
  return {
    actionAddArticle(article) {
      dispatch(actionsArticles.addNewArticle(article))
    },
    clickEditTitle(editable) {
      dispatch(actionsMetaResource.clickEditTitle(editable))
    },
    clickEditArticle(articleEditable) {
      dispatch(actionsClicks.clickEditArticle(articleEditable))
    },
    actionSaveTitleEdit(titleResource) {
      dispatch(actionsMetaResource.saveEditTitle(titleResource))
    },
    saveEditArticle(article) {
      dispatch(actionsArticles.saveEditArticle(article))
    },
    clickSearchArticle(searchable) {
      dispatch(actionsClicks.clickSearchArticle(searchable))
    },
    searchArticle(valueSearch) {
      dispatch(actionsSearch.searchArticle(valueSearch))
    },
    consultArticle(handle) {
      dispatch(actionsArticles.consultArticle(handle))
    },
    modalAddArticle() {
      dispatch(actionsModal.openModal())
    }
  }
}


const ConnectedLexiconResource = connect(
  mapStateToProps, 
  mapDispatchToProps
)(LexiconContent)


export default  ConnectedLexiconResource