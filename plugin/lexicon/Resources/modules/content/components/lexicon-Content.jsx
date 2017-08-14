import React, { Component } from 'react';
//sssimport {PropTypes as T} from 'prop-types'
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
    alert(this.store);
    alert(this.store);
    this.store.dispatch(editEntry());
  }

  handleCreateEntry(){
    alert(this.store);
    alert(this.state );
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
