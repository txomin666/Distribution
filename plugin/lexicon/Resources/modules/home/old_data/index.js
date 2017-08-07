import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {createStore} from './bank/store'
import {registerDefaultItemTypes} from './items/item-types'
import {registerModalType} from './modal'
import {MODAL_ADD_ITEM, AddItemModal} from './quiz/editor/components/add-item-modal.jsx'
import {MODAL_SEARCH, SearchModal} from './bank/components/modal/search.jsx'
import {MODAL_SHARE, ShareModal} from './bank/components/modal/share.jsx'
import {Bank} from './bank/components/bank.jsx'

// va chercher l'élément avec l'id lexicon


// Register needed modals
registerModalType(MODAL_SEARCH, SearchModal)
registerModalType(MODAL_ADD_ITEM, AddItemModal)
registerModalType(MODAL_SHARE, ShareModal)


 const listResources = JSON.parse(document.getElementById('lexicon').dataset.resources)
 const currentUser = JSON.parse(document.getElementById('lexicon').dataset.user)

 //console.log(listResources) et lui 
 const data = []
 data.push(listResources.dico, listResources.dico2);

 const store = createStore(Object.assign({}, listResources, {
    currentUser })
  );


class LexiconComponents extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    return (
      React.createElement(
        Provider,
        {store},
        React.createElement(Bank)
      )
    );
  }
}

ReactDOM.render(
  <LexiconComponents />,
  document.getElementById('lexicon')
)
