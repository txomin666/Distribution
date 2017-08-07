import React, { Component } from 'react';
//import {PropTypes as T} from 'prop-types'
import LexiconContentHeader from './header/LexiconContentHeader.jsx';
import LexiconContentBody from './body/LexiconContentBody.jsx';
import { createEntry, searchEntry, editEntry, consultEntry, editTitle, scrollEntries} from './../actions'


class LexiconContent extends Component {
 
  constructor(props) {
    super(props);
    this.store = this.props.store;
    this.state = this.props.store.getState();
  }

  handleEditEntry() {
    this.store.dispatch(editEntry());
  }

  handleCreateEntry(){
    this.store.dispatch(createEntry());
  }

  handleSearchEntry() {
    this.store.dispatch(searchEntry());
  }

  handleConsultEntry(){
    this.store.dispatch(consultEntry());
  }

  handleEditTitle(){
    this.store.dispatch(editTitle());
  }

  handleScrollEntries(){
    this.store.dispatch(scrollEntries());
  }


  render() {
    return (
      <div className="">
          <LexiconContentHeader 
            lexiconStore={this.store} 
            hEditT={this.handleEditTitle}
            hCreateE={this.handleCreateEntry}
          />
          <LexiconContentBody 
            listItems={this.state.dataItems}
            contentStore={this.store} 
            hSearchE={this.handleSearchEntry}
            hConsultE={this.handleConsultEntry}
            hEditE={this.handleEditEntry}
            hScrollE={this.handleScrollEntries}
          />
      </div>
    );
  }

}


export default LexiconContent;