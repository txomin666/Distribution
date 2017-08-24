import React, {Component} from 'react'
import {PropTypes as T} from 'prop-types'
import Modal from 'react-bootstrap/lib/Modal'

import {update} from './../../utils/utils'
import {t, tex} from '#/main/core/translation'
import {FormGroup} from '#/main/core/layout/form/components/form-group.jsx'
import {BaseModal} from '#/main/core/layout/modal/components/base.jsx'
import {UserTypeahead} from './../../users/components/typeahead.jsx'

export const MODAL_CREATE_LEXICON = 'MODAL_CREATE_LEXICON'


export class CreateLexiconModal extends Component {
  constructor(props) {
    super(props)

    this.state = {
      adminRights: false,
      dataResource : Object.assign({
        type : '',
        title : '',
        description : ''
      }, props.dataResource)
    }
  }

  

  render() {
    return (
        <BaseModal {...this.props} className="create-lexicon-modal">
        <Modal.Body>
          <FormGroup
            controlId="type-resource"
            label={tex('type')}
          >
            <input
              id="type-resource"
              type="text"
              placeholder="A quel type  se réfère votre ressource ?"
              className="form-control "
              value={this.state.dataResource.type}
            />
          </FormGroup>
          
          <FormGroup
            controlId="title-resource"
            label={tex('Intitulé de la ressource')}
          >
            <input
              id="title-resource"
              type="text"
              placeholder="Quel nom donnez vous à votre ressource ?"
              className="form-control"
              value={this.state.dataResource.title}
            />
          </FormGroup>
          
          <FormGroup
            controlId="decription-resource"
            label={tex('Description de la ressource')}
          >
            <textarea 
              rows="5"
              id="decription-resource"
              className="form-control"
              value={this.state.dataResource.description}
            >

            </textarea>

          </FormGroup>

        </Modal.Body>

        <Modal.Footer>
          <button className="btn btn-default" onClick={this.props.fadeModal}>
            {t('cancel')}
          </button>
          <button className="btn btn-primary" onClick={() => this.props.handleCreateLexicon(this.state.dataResource)}>
            {t('Créer')}
          </button>
        </Modal.Footer>
      </BaseModal>
    )
  }
}

CreateLexiconModal.propTypes = {
  dataResource: T.shape({
    title: T.string,
    type: T.string,
    description: T.string
  }).isRequired,
  fadeModal: T.func.isRequired,
  handleCreateLexicon: T.func.isRequired
}
  
