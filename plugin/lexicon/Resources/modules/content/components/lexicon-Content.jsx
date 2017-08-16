import React, { Component } from 'react';
import {PropTypes as T} from 'prop-types'
import {connect} from 'react-redux'
import {LexiconContentHeader} from './LexiconContentHeader.jsx'
import {ConnectedLexiconBody} from './LexiconContentBody.jsx'
import select from './../selectors' 
import {action as actionHeader} from './../actions/actionHeader' 

console.log(select)
export default class LexiconContent extends Component {

  render() {
    return (
      <div className="">
          <LexiconContentHeader
            titleResource   = {this.props.titleResource}
            actionAddEntry  = {this.props.actionAddEntry}
            actionTitleEdit = {this.props.actionTitleEdit}
            clickeditTitle  = {this.props.clickeditTitle}
            actionSaveTitleEdit = {this.props.actionSaveTitleEdit}
          />
          <ConnectedLexiconBody/>
      </div>
    );
  }

}

LexiconContent.propTypes = {
  titleResource: T.string.isRequired,
  actionAddEntry: T.func.isRequired,
  actionTitleEdit: T.func.isRequired,
  clickeditTitle: T.bool,
  actionSaveTitleEdit: T.func.isRequired
}


function mapStateToProps(state) {
  return {
    clickeditTitle: select.getTitleResource(state),
    titleResource: select.ResourceTitle(state)
  }
}


function mapDispatchToProps(dispatch) {
  return {
    actionAddEntry() {
      dispatch(actionHeader.addEntry())
    },
    actionTitleEdit() {
      dispatch(actionHeader.editTitle())
    },
    actionSaveTitleEdit(titleResource) {
      dispatch(actionHeader.saveEditTitle(titleResource))
    }
  }
}


const ConnectedLexiconResource = connect(mapStateToProps, mapDispatchToProps)(LexiconContent)


export {ConnectedLexiconResource}