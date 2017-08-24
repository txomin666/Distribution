import React, { Component } from 'react'
import {PropTypes as T} from 'prop-types'
import { connect } from 'react-redux'
import LexiconContentHeader from './LexiconContentHeader.jsx'
import LexiconContentBody from './LexiconContentBody.jsx'
import {select as selectHeader} from './../selectors/ContentHeader' 
import {actions as actionsHeader} from './../actions/actionHeader' 
import {select as selectBody}  from './../selectors/ContentBody'
import {actions as actionsBody} from './../actions/actionBody'

console.log(actionsHeader)

class LexiconContent extends Component {

  render() {
    return (
      <div className="">
          <LexiconContentHeader
            titleResource   = {this.props.titleResource}
            actionAddEntry  = {this.props.actionAddEntry(this.props.titleResource)}
            actionTitleEdit = {this.props.actionTitleEdit(this.props.titleResource)}
            clickeditTitle  = {this.props.clickeditTitle}
            actionSaveTitleEdit = {this.props.actionSaveTitleEdit(this.props.titleResource)}
          />
          <LexiconContentBody
            typeResource  = {this.props.typeResource}
            titleResource = {this.props.titleResource}
            author        = {this.props.author}
            clickeditContent  = {this.props.clickeditContent}
            dataEntries       = {this.props.dataEntries}
            editContentEntry  = {this.props.editContentEntry(this.props.dataEntries)}
            clicksearchEntry  = {this.props.clicksearchEntry}
            searchEntry       = {this.props.searchEntry(this.props.entrySearch)}
            goSearchEntry     = {this.props.goSearchEntry(this.props.clicksearchEntry)}
            contentEntry      = {this.props.contentEntry(this.props.dataEntries)}
          />
      </div>
    );
  }

}

LexiconContent.propTypes = {
  titleResource: T.string.isRequired,
  actionAddEntry: T.func.isRequired,
  actionTitleEdit: T.func.isRequired,
  clickeditTitle: T.bool,
  entrySearch: T.string,
  actionSaveTitleEdit: T.func.isRequired,
  typeResource: T.string,
  author: T.string,
  clickeditContent: T.bool,
  dataEntries: T.array.isRequired,
  editContentEntry: T.func.isRequired,
  clicksearchEntry: T.bool,
  searchEntry: T.func.isRequired,
  goSearchEntry: T.func.isRequired,
  contentEntry: T.func.isRequired
}


function mapStateToProps(state) {
  return {
    entrySearch: selectBody.getEntrySearch(state),
    clickeditTitle: selectHeader.getClickeditTitle(state),
    titleResource: selectHeader.getResourceTitle(state),
    dataEntries: selectBody.getAllEntries(state),
    clicksearchEntry: selectBody.getClicksearchEntry(state),
    author: selectHeader.getAuthor(state),
    clickeditContent: selectBody.getClickeditContent(state),
    typeResource: selectBody.getTypeResource(state)
  }
}


function mapDispatchToProps(dispatch) {
  return {
    actionAddEntry(entry) {
      dispatch(actionsHeader.addEntry(entry))
    },
    actionTitleEdit(clickeditTitle) {
      dispatch(actionsHeader.editTitle(clickeditTitle))
    },
    actionSaveTitleEdit(titleResource) {
      dispatch(actionsHeader.saveEditTitle(titleResource))
    },
    editContentEntry(handle) {
      dispatch(actionsBody.editContentEntry(handle))
    },
    searchEntry(entrySearch) {
      dispatch(actionsBody.searchEntry(entrySearch))
    },
    goSearchEntry(clicksearchEntry) {
      dispatch(actionsBody.goSearchEntry(clicksearchEntry))
    },
    contentEntry(handle) {
      dispatch(actionsBody.contentEntry(handle))
    }
  }
}


const ConnectedLexiconResource = connect(
  mapStateToProps, 
  mapDispatchToProps
)(LexiconContent)


export default  ConnectedLexiconResource