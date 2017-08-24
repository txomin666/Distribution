import React, { Component } from 'react';
import {PropTypes as T} from 'prop-types'



{/* Zone de création de nouvelles ressources lexicales */}
const AddEntry = props =>
	<span id="titre-resources" style={{'float':'right'}}>
		<button className="btn page-action-btn" type="button" role="button"
		 onClick={props.actionAddEntry(props.titleResource)} style={{'background':'#2F99D1', 'color':'white', marginBottom:20}}
		alt="Ajouter une ressource lexicale">
			<span className="page-action-icon fa fa-plus" style={{"fontSize":"20pt"}}></span>
		</button>
	</span>

AddEntry.propTypes = {
  titleResource: T.string.isRequired,
  actionAddEntry: T.func  //à revoir
}


{/* Zone de création de nouvelles ressources lexicales */}
const TitleHeader = props =>
	<span>
		{props.clickeditTitle ?
			 (<span  style={{marginLeft:-12}}>
				 <input id="titre-up" className="col-xs-4" type="text" style={{display: 'inline-block', float:'left', fontSize:15}} defaultValue={props.state.titleResource} />
				 <span className="" style={{display: 'inline-block', float:'left'}}>
			      <button className="btn btn-default" onClick={props.actionSaveTitleEdit(props.titleResource)}>
			        <i className="fa fa-pencil"></i>
			      </button>
			    </span>
				 </span>
			  ) : (
				 <span id="titre-up" onClick={props.actionTitleEdit(props.titleResource)}>
					{props.titleResource}
				 </span>
			  )
		}
	</span>

TitleHeader.propTypes = {
  titleResource: T.string,
  actionTitleEdit: T.func, //a revoir
  clickeditTitle: T.bool,
  actionSaveTitleEdit: T.func 
}


{/* Zone de création de nouvelles ressources lexicales */}
export default class LexiconContentHeader extends Component {

	render() {
		return (
			<span className="row"  id="lexiconheader">
				<TitleHeader
					titleResource ={this.props.titleResource}
					actionAddEntry={this.props.actionAddEntry(this.props.titleResource)}
					actionSaveTitleEdit={this.props.actionSaveTitleEdit}
				/>
				<AddEntry
					titleResource={this.props.titleResource}
					actionTitleEdit={this.props.actionTitleEdit(this.props.titleResource)}
					clickeditTitle={this.props.clickeditTitle}
				/>
		    </span>
	    );
	}

}


LexiconContentHeader.propTypes = {
	titleResource: T.string.isRequired,
  	actionAddEntry: T.func,  // a revoir
    actionTitleEdit: T.func,
    clickeditTitle: T.bool,
    actionSaveTitleEdit: T.func
}
