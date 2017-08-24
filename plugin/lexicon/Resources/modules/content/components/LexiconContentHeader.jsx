import React, { Component } from 'react';
import {PropTypes as T} from 'prop-types'



{/* Zone de création de nouvelles ressources lexicales */}
const AddEntry = props =>
	<span id="titre-resources" style={{'float':'right'}}>
		<button className="btn page-action-btn" type="button" role="button"
		 onClick={() => props.modalAddArticle()} style={{'background':'#2F99D1', 'color':'white', marginBottom:20}}
		alt="Ajouter une ressource lexicale">
			<span className="page-action-icon fa fa-plus" style={{"fontSize":"20pt"}}></span>
		</button>
	</span>

AddEntry.propTypes = {
  modalAddArticle: T.func.isRequired  //à revoir
}


{/* Zone de création de nouvelles ressources lexicales */}
const TitleHeader = props =>
	<span>
		{props.metaResource.editable ?
			(<span  style={{marginLeft:-12}}>
				<input id="titre-up" name="value-title" className="col-xs-4" 
					type="text" style={{display: 'inline-block', float:'left', fontSize:15}} 
					defaultValue={props.metaResource.title} 
				/>
				<span className="" style={{display: 'inline-block', float:'left'}}>
			      <button className="btn btn-default" 
			      	onClick={() => props.actionSaveTitleEdit(props.metaResource.title)}>
			        <i className="fa fa-pencil"></i>
			      </button>
			    </span>
				 </span>
			) : (
				<span id="titre-up" style={{'cursor': 'pointer'}} 
					onClick={() => props.clickEditTitle(props.metaResource.editable)}>
					{props.metaResource.title}
				</span>
			)
		}
	</span>

TitleHeader.propTypes = {
   metaResource: T.shape({
    id: T.string.isRequired,
    type: T.string.isRequired,
    lang: T.string.isRequired,
    title: T.string.isRequired,
    author: T.string.isRequired,
    editable: T.bool
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
					metaResource   ={this.props.metaResource}
					clickEditTitle ={this.props.clickEditTitle}
					actionSaveTitleEdit ={this.props.actionSaveTitleEdit}
				/>
				<AddEntry
					modalAddArticle={this.props.modalAddArticle}
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
    editable: T.bool
  }).isRequired,
  actionSaveTitleEdit: T.func.isRequired,
  clickEditTitle: T.func.isRequired, //a revoir
  modalAddArticle: T.func.isRequired
}
