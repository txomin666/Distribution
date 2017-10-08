import React, { Component } from 'react'
import {PropTypes as T} from 'prop-types'
import {OverlayTrigger, Tooltip} from 'react-bootstrap'
import Modal from 'react-bootstrap/lib/Modal'
import {FormGroup} from '#/main/core/layout/form/components/group/form-group.jsx'
import {BaseModal} from '#/main/core/layout/modal/components/base.jsx'
import {update} from './../../home/utils/utils'




{/* Zone de création de nouvelles ressources lexicales */}
class AddEntry extends Component {
	
	constructor(props) {
	    super(props)

	    this.state = {
	      entryResource: Object.assign({
	      	name: this.props.metaResource.title,
	      	lang: this.props.metaResource.lang,
	      	author: this.props.metaResource.author,
	        entry : '',
	        category : '',
	        definition : '',
	        example : '',
	        forme: ''
	      }, props.data)
	    }
	}

	updateData(name, value) {
	    this.setState(update(this.state, {entryResource: {[name]: {$set: value}}}))
	}

	render() {
		return(
			<span id="add_entry">
				<div className="modal fade" id="add_new_entry" role="dialog">
				    <div className="modal-dialog">
				      <div className="modal-content">
				        <div className="modal-header">
				          <button type="button" className="close" data-dismiss="modal">&times;</button>
				          <h4 className="modal-title">Ajouter une nouvelle entrée dans : {this.props.metaResource.title}</h4>
				        </div>
				        <div className="modal-body">
				        	<div className="row">
								<div className="form-horizontal">
									<div className="form-group">
									  <label className="control-label col-sm-3" htmlFor="entry">Forme de l'entrée </label>
								      <div className="col-sm-8">
								      	   <label className="radio-inline">
							                  <input 
							                    type="radio"
							                    checked={this.state.entryResource.forme === 'glossaire'}
							                    value="glossaire"
							                    onChange={e => this.updateData('forme', e.target.value)}
							                  />
							                  Glossaire
							               </label>
									       <label className="radio-inline">
							                  <input 
							                    type="radio"
							                    checked={this.state.entryResource.forme === 'dictionnaire'}
							                    value="dictionnaire"
							                    onChange={e => this.updateData('forme', e.target.value)}
							                  />
							                  Dictionnaire
							               </label>
							              
							          </div>
								    </div>
								    <div className="form-group">
								      <label className="control-label col-sm-3" htmlFor="entry">Entrée </label>
								      <div className="col-sm-8">
								      		<input 
									      		type="text" className="form-control" 
									      		id="entry" placeholder="Donnez un nom à votre nouvelle entrée" 
									      		name="entry"
									      		value={this.state.entryResource.entry}
									            onChange={e => this.updateData('entry', e.target.value)}
								            />
								      </div>
								    </div>
								    {this.state.entryResource.forme == 'dictionnaire' ?
									    (<div className="form-group">
									      <label className="control-label col-sm-3" htmlFor="cat">Catégorie</label>
									      <div className="col-sm-8">          
									        <input 
										        type="text" 
										        className="form-control" 
										        id="cat" 
										        placeholder="Indiquer la catégorie grammaticale ?" 
										        name="category"
										        value={this.state.entryResource.category}
				              					onChange={e => this.updateData('category', e.target.value)}
									        />
									      </div>
									    </div>) : (<div className="form-group"> </div>)
									}
								    <div className="form-group">
								      	<label className="control-label col-sm-3" htmlFor="def">Définition</label>
								        <div className="col-sm-8 btn-inline">
											<input 
												type="text" 
												name="definition" 
												id="def"
												placeholder="Donnez un équivalent définitionnel à votre nouvelle entrée"
												className="form-control"
												value={this.state.entryResource.definition}
			              						onChange={e => this.updateData('definition', e.target.value)}
											/>
											<button type="button" className="btn btn-primary btn-inline">
											<i className="fa fa-plus"/>
											</button>
									    </div>
								    </div>
								   {this.state.entryResource.forme == 'dictionnaire' ?
									    (<div className="form-group">
									      <label className="control-label col-sm-3" htmlFor="expl">Exemple</label>
									       <div className="col-sm-8 btn-inline">
												<input 
													type="text" 
													name="example" 
													id="expl"  
													className="form-control"
													value={this.state.entryResource.example}
				              						onChange={e => this.updateData('example', e.target.value)}
												/>
												<button type="button" className="btn btn-primary btn-inline">
												<i className="fa fa-plus"/>
												</button>
										   </div>
									    </div>) : (<div className="form-group"> </div>)
									 }
								    <div className="form-group">
								     <div className="col-md-10 btn-inline"><hr/>
								     	<a className="col-md-6 btn-inline" href="" title="">
								     	<i className="fa fa-caret-right"/> Plus de champs ? </a>
								     </div>
								    </div>
						        </div>
						    </div>
						</div>
				        <div className="modal-footer">
				          <button type="button" className="btn btn-default" data-dismiss="modal">Annuler</button>
				          <button type="button" className="btn btn-primary"
				          		  onClick={() => this.props.createNewArticle(this.state.entryResource)}
								  data-dismiss="modal"
				          		  >Créer</button>
				        </div>
				      </div>
				    </div>
				</div>
				 <OverlayTrigger trigger={['hover', 'focus']} placement="top" overlay={popoverCreateArticle}>
					<button className="btn page-action-btn" type="button" role="button"
					 	onClick={() => this.props.modalAddArticle(this.props.modal.open)} style={{marginBottom:10}}
						data-toggle="modal" data-target="#add_new_entry"
					>
						<i className="page-action-icon fa fa-plus" style={{"fontSize":"14pt"}}/>
					</button>
				</OverlayTrigger>
			</span>
		)
	}
}


AddEntry.propTypes = {
  modalAddArticle: T.func.isRequired,  //à revoir
  createNewArticle: T.func.isRequired,
  entryResource: T.shape({
  	name: T.string.isRequired,
  	lang: T.string.isRequired,
  	author: T.string.isRequired,
  	entry : T.string.isRequired,
    category : T.string.isRequired,
    definition : T.string.isRequired,
    example : T.string.isRequired,
    forme: T.string.isRequired
  }).isRequired,
  modal: T.shape({
  	type: T.string.isRequired,
  	open: T.bool
  }).isRequired,
  metaResource: T.shape({
    id: T.string.isRequired,
    type: T.string.isRequired,
    lang: T.string.isRequired,
    title: T.string.isRequired,
    author: T.string.isRequired,
    editable: T.bool,
    searchable: T.bool,
	articleEditable: T.bool
  }).isRequired
}

const popoverCreateArticle = (
  <Tooltip id="popover-trigger-hover-focus">
    <span> Cliquez pour ajouter une nouvelle entrée </span>
  </Tooltip>
)

const popoverEditTitleArticle = (
  <Tooltip id="popover-trigger-hover-focus">
    <span> Cliquez pour modifier le titre de la ressource</span>
  </Tooltip>
)

{/* Zone de création de nouvelles ressources lexicales */}
class TitleHeader extends Component {
	constructor(props) {
	    super(props);
	    this.title = {old: this.props.metaResource.title, new:''}
	    this.handleChange = this.handleChange.bind(this)
	}
	handleChange(event) { 
	   this.title.new = event.target.value
	   //console.log(event.target.value)
	}
	render() {
		return (
			<span>
				{this.props.metaResource.editable ?
					(<span className="input-group col-xs-4" style={{'display':'inline-block'}}>
					    <input type="text" className="form-control input-lg" 
					    	placeholder="Search" style={{fontSize:20}} onChange={this.handleChange}
							defaultValue={this.props.metaResource.title}  name="title"/>
					    <span className="input-group-btn" style={{marginLeft:-10, 'display':'inline-block'}}>
					      <button className="btn btn-default input-lg" 
					      	type="submit" onClick={() => this.props.actionSaveTitleEdit(this.title.old, this.title.new)} >
					        <i className="fa fa-floppy-o" style={{fontSize:25}}></i>
					      </button>
					    </span>
					</span>
					) : (
					<OverlayTrigger trigger={['hover', 'focus']} placement="right" overlay={popoverEditTitleArticle}>
						<span id="titre-up" style={{'cursor': 'pointer'}} 
							onClick={() => this.props.clickEditTitle(this.props.metaResource.editable)}>
							{this.props.metaResource.title}
						</span>
					</OverlayTrigger>
					)
				}
			</span>
		);
	}
}

TitleHeader.propTypes = {
  metaResource: T.shape({
    id: T.string.isRequired,
    type: T.string.isRequired,
    lang: T.string.isRequired,
    title: T.string.isRequired,
    author: T.string.isRequired,
    editable: T.bool,
    searchable: T.bool,
	articleEditable: T.bool
  }).isRequired,
  actionSaveTitleEdit: T.func.isRequired,
  clickEditTitle: T.func.isRequired //a revoir
}


{/* Zone de création de nouvelles ressources lexicales */}
export default class LexiconContentHeader extends Component {

	render() {
		return (
			<span className="row"  id="lexiconheader">
				<TitleHeader
					metaResource   = {this.props.metaResource}
					clickEditTitle = {this.props.clickEditTitle}
					actionSaveTitleEdit = {this.props.actionSaveTitleEdit}
				/>
				<AddEntry
					modalAddArticle = {this.props.modalAddArticle}
					modal = {this.props.modal}
					createNewArticle = {this.props.createNewArticle}
					metaResource   = {this.props.metaResource}
				/>
		    </span>
	    );
	}

}


LexiconContentHeader.propTypes = {
	metaResource: T.shape({
		id: T.string.isRequired,
		type: T.string.isRequired,
		lang: T.string.isRequired,
		title: T.string.isRequired,
		author: T.string.isRequired,
		editable: T.bool,
		searchable: T.bool,
		articleEditable: T.bool
	}).isRequired,
	actionSaveTitleEdit: T.func.isRequired,
	createNewArticle: T.func.isRequired,
	clickEditTitle: T.func.isRequired, //a revoir
	modalAddArticle: T.func.isRequired,
	modal: T.shape({
		type: T.string.isRequired,
		open: T.bool
	}).isRequired
}
