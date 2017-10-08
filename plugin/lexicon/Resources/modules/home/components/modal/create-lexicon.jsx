import React, {Component} from 'react'
import {PropTypes as T} from 'prop-types'
import Modal from 'react-bootstrap/lib/Modal'

import {update} from './../../utils/utils'
import {translex} from '#/main/core/translation'
import {FormGroup} from '#/main/core/layout/form/components/group/form-group.jsx'
import {BaseModal} from '#/main/core/layout/modal/components/base.jsx'

export const MODAL_CREATE_LEXICON = 'MODAL_CREATE_LEXICON'


export class CreateLexiconModal extends Component {
  constructor(props) {
    super(props)

    this.state = {
      adminRights: false,
      lexiconsResources: Object.assign({
        type : '',
        category : '',
        name : '',
        fullname : '',
        lang: '',
        forme: '',
        comment: ''
      }, props.data)
    }
  }

  updateData(name, value) {
    this.setState(update(this.state, {lexiconsResources: {[name]: {$set: value}}}))
  }


  render() {
    return (
        <BaseModal {...this.props} className="create-lexicon-modal">
        <Modal.Body>
          <FormGroup
            controlId="type-resource"
            label={'Orientation : '}
          > 
            <div className="form-control">
              <label className="radio-inline">
                  <input 
                    type="radio"
                    checked={this.state.lexiconsResources.type === 'monodirectional'}
                    value="monodirectional"
                    onChange={e => this.updateData('type', e.target.value)}
                  />
                  Monodirectionnel
              </label>
              <label className="radio-inline">
                  <input 
                    type="radio"
                    checked={this.state.lexiconsResources.type === 'bidirectional'}
                    value="bidirectional"
                    onChange={e => this.updateData('type', e.target.value)}
                  />
                  Bidirectionnel
              </label>
            </div>
          </FormGroup>
          <FormGroup
            controlId="forme-resource"
            label={'Forme : '}
          > 
            <div className="form-control">
              <label className="radio-inline">
                  <input 
                    type="radio"
                    checked={this.state.lexiconsResources.forme === 'dictionnaire'}
                    value="dictionnaire"
                    onChange={e => this.updateData('forme', e.target.value)}
                  />
                  Dictionnaire
              </label>
              <label className="radio-inline">
                  <input 
                    type="radio"
                    checked={this.state.lexiconsResources.forme === 'glossaire'}
                    value="glossaire"
                    onChange={e => this.updateData('forme', e.target.value)}
                  />
                  Glossaire
              </label>
            </div>
          </FormGroup>
          <FormGroup
            controlId="category-resource"
            label={'Catégorie : '}
          > 
            <div className="form-control">
              <label className="radio-inline">
                  <input 
                    type="radio"
                    checked={this.state.lexiconsResources.category === 'monolingual'}
                    value="monolingual"
                    onChange={e => this.updateData('category', e.target.value)}
                  />
                  Monolingue
              </label>
              <label className="radio-inline">
                  <input 
                    type="radio"
                    checked={this.state.lexiconsResources.category === 'bilingual'}
                    value="bilingual"
                    onChange={e => this.updateData('category', e.target.value)}
                  />
                  Bilingue
              </label>
            </div>
          </FormGroup>
          <FormGroup
            controlId="name-resource"
            label={translex('Nom minimal ou Type initial')}
          >
            <input
              id="name-resource"
              type="text"
              placeholder="Quel nom minimal donnez vous à votre ressource ?"
              className="form-control"
              value={this.state.lexiconsResources.name}
              onChange={e => this.updateData('name', e.target.value)}
            />
          </FormGroup>
          <FormGroup
            controlId="fullname-resource"
            label={'Nom complet'}
          >
             <input
              id="fullname-resource"
              type="text"
              placeholder="Quel nom complet donnez vous à votre ressource ?"
              className="form-control"
              value={this.state.lexiconsResources.fullname}
              onChange={e => this.updateData('fullname', e.target.value)}
            />
          </FormGroup>
          <FormGroup
            controlId="langue-resource"
            label={'Langue(s) et commentaire'}
          >
            <input
              id="lang-resource"
              type="text"
              placeholder="Langue ? format = 'fra:eng' où 'fra' est source et 'eng' cible "
              className="form-control"
              value={this.state.lexiconsResources.lang}
              onChange={e => this.updateData('lang', e.target.value)}
            /><br/>
             <input
              id="comment-resource"
              type="text"
              placeholder="Que contient votre ressource  ou commentaire ?"
              className="form-control"
              value={this.state.lexiconsResources.comment}
              onChange={e => this.updateData('comment', e.target.value)}
            />
          </FormGroup>
        </Modal.Body>

        <Modal.Footer>
          <button className="btn btn-default" onClick={this.props.fadeModal}>
            {translex('cancel')}
          </button>
          <button className="btn btn-primary" onClick={() => this.props.handleCreateLexicon(this.state.lexiconsResources)}>
            {translex('créer')}
          </button>
        </Modal.Footer>
      </BaseModal>
    )
  }
}

CreateLexiconModal.propTypes = {
  lexiconsResources: T.shape({
    type: T.string.isRequired,
    category: T.string.isRequired,
    name: T.string.isRequired,
    fullname: T.string.isRequired,
    lang: T.string.isRequired,
    forme: T.string.isRequired,
    comment: T.string.isRequired
  }).isRequired,
  fadeModal: T.func.isRequired,
  handleCreateLexicon: T.func.isRequired
}
  
