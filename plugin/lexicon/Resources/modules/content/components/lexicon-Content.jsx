import React, { Component } from 'react'
import {PropTypes as T} from 'prop-types'
import { connect } from 'react-redux'
import LexiconContentHeader from './LexiconContentHeader.jsx'
import LexiconContentBody from './LexiconContentBody.jsx'
import {select as selectHeader} from './../selectors/ContentHeader' 
import {action as actionHead} from './../actions/actionHeader' 
import {select as selectBody}  from './../selectors/ContentBody'
import {action as actionBod} from './../actions/actionBody'

console.log(actionHead)

class LexiconContent extends Component {

  render() {
    return (
      <div className="">
          <LexiconContentHeader
            titleResource   = {this.props.titleResource}
            actionAddEntry  = {this.props.actionAddEntry(this.props.titleResource)}
            actionTitleEdit = {this.props.actionTitleEdit(this.props.titleResource)}
            clickeditTitle  = {this.props.clickeditTitle}
            actionSaveTitleEdit = {this.props.actionSaveTitleEdit()}
          />
          <LexiconContentBody
            typeResource  = {this.props.typeResource}
            titleResource = {this.props.titleResource}
            author        = {this.props.author}
            clickeditContent  = {this.props.clickeditContent}
            dataEntries       = {this.props.dataEntries}
            editContentEntry  = {this.props.editContentEntry}
            clicksearchEntry  = {this.props.clicksearchEntry}
            searchEntry       = {this.props.searchEntry}
            goSearchEntry     = {this.props.goSearchEntry}
            contentEntry      = {this.props.contentEntry}
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
    clickeditTitle: selectHeader.clickeditTitle(state),
    titleResource: selectHeader.ResourceTitle(state),
    dataEntries: selectBody.AllEntries(state),
    clicksearchEntry: selectBody.getClicksearchEntry(state),
    author: selectHeader.getAuthor(state),
    clickeditContent: selectBody.getClickeditContent(state),
    typeResource: selectBody.typeResource(state)
  }
}


function mapDispatchToProps(dispatch) {
  return {
    actionAddEntry(entryId, entry, category, definition, example) {
      dispatch(actionHead.addEntry(entryId, entry, category, definition, example))
    },
    actionTitleEdit() {
      dispatch(actionHead.editTitle())
    },
    actionSaveTitleEdit(titleResource) {
      dispatch(actionHead.saveEditTitle(titleResource))
    },
    editContentEntry(handle) {
      dispatch(actionBod.editContentEntry(handle))
    },
    searchEntry(entryToSearch) {
      dispatch(actionBod.searchEntry(entryToSearch))
    },
    goSearchEntry() {
      dispatch(actionBod.goSearchEntry())
    },
    contentEntry(handle) {
      dispatch(actionBod.contentEntry(handle))
    }
  }
}


const ConnectedLexiconResource = connect(
  mapStateToProps, 
  mapDispatchToProps
)(LexiconContent)


export default  ConnectedLexiconResource