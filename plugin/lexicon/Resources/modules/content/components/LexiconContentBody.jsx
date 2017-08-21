import React, { Component } from 'react';
import {PropTypes as T} from 'prop-types'
import {connect} from 'react-redux'
import index from './../css/index.css'


{/* Liste des entrées d'une ressource lexicale */}
const Entry = props =>
	<li className="list-group-item"  id={props.entryName} key={props.entryName}>
		<span className="pointer" onClick={props.contentEntry(props.handle)} >{props.entryName}</span>
	</li>

Entry.propTypes = {
	entryName: T.string.isRequired,
	contentEntry: T.func.isRequired,
	handle: T.number.isRequired
}


{/* Liste des entrées d'une ressource lexicale */}
const ListEntries = props =>
	<ul className="list-group" id="content-entry">
		{
			props.dataEntries.map(
				(entry, index) => {
					const results = <Entry entryName={entry[0]} key={index} handle={entry[1]} contentEntry={props.contentEntry} />;
					return results;
				}
			) 
		}
	</ul>

ListEntries.propTypes = {
	dataEntries: T.array.isRequired,
	contentEntry: T.func.isRequired,
	handle: T.string.isRequired
}


{/* Liste des entrées d'une ressource lexicale */}
const LexiconEntries = props =>
	<div className="panel panel-body" id="list-entry">
		<ListEntries dataEntries={props.dataEntries} contentEntry={props.contentEntry}/>
	</div>

LexiconEntries.propTypes = {
	dataEntries: T.array.isRequired,
	contentEntry: T.func.isRequired
}


{/* Zone de recherche des entrées */}
const LexiconSearch = props =>
	<div className="panel panel-heading">
		{props.clicksearchEntry ? 
			(<div className="row" id="row-search">
				<button type="button" role="button" className="btn page-action-btn" onClick={props.action}>
					<span className="page-action-icon fa fa-search" aria-hidden="true"></span>
				</button>
				<input id="titre-up" onChange={props.searchEntry(event)} className="col-xs-9 input-form" type="text" style={{display: 'inline-block', float:'left', fontSize:15, marginTop:6}} placeholder='Que rechercher vous ?' />
			</div>) :
			(<div className="row" id="row-search">
				<button type="button" role="button" className="btn page-action-btn" onChange={props.goSearchEntry}>
					<span className="page-action-icon fa fa-search" aria-hidden="true"></span>
				</button>
				<span>
					&nbsp; <span className="page-action-icon fa fa-hand-o-left" aria-hidden="true"></span>
					&nbsp; Cliquez pour rechercher
				</span>
			</div>)
		}
	</div>

LexiconSearch.propTypes = {
	clicksearchEntry: T.bool,
	searchEntry: T.func.isRequired,
	goSearchEntry: T.func.isRequired
}


{/* Zone de recherche et de consultation des entrées */}
const LexiconListEntries = props =>
	<div className="col-md-3">
		<div className="panel panel-default">
		{/* Affiche la zone de recherche */}
			<LexiconSearch
				clicksearchEntry={props.clicksearchEntry}
				searchEntry={props.searchEntry}
				goSearchEntry={props.goSearchEntry}
			/>
		{/* Affiche la liste des entrées d'une ressource lexicale */}
			<LexiconEntries
				dataEntries={props.dataEntries}
				contentEntry={props.contentEntry}
			/>
		</div>
	</div>

LexiconListEntries.propTypes = {
	clicksearchEntry: T.bool,
	searchEntry: T.func.isRequired,
	goSearchEntry: T.func.isRequired,
	contentEntry: T.func.isRequired,
	dataEntries: T.array.isRequired
}


{/* Cette page affiche le contenu de chaque article */}
const LexiconShowEntry = props =>
	<div className="col-md-9" style={{"float":"left"}}>
		<div className="panel panel-default">
		{/* haut de la page */}
			<div className="panel panel-heading">
				<div className="row" style={{"marginLeft":"10pt"}}>
					<div  style={{"float":"left"}}>
						<button type="button" role="button" className="btn page-action-btn" onClick={props.editContentEntry('entry-content')}>
							<span className="page-action-icon fa fa-pencil"></span>
						</button>
						<span>
							&nbsp; <span className="page-action-icon fa fa-hand-o-left" aria-hidden="true"></span>
							&nbsp; Cliquez pour modifier cette entrée
						</span>
					</div>
				</div>
			</div>
		{/* corps de la page */}
			{props.clickeditContent ?
				(<div className="panel panel-body" id="entry-content">

				</div>) :
				(<div className="panel panel-body" id="entry-content">
					{props.dataEntries} //à revoir
				</div>)
			}
		{/* bas de page */}
			<div className="panel-footer text-right">
				<span className="text-right" id="left">
					<span> {props.typeResource} :  </span>
					<span> {props.titleResource} > </span>
					<span> Auteur : {props.author} </span>
				</span>
			</div>
		</div>
	</div>


LexiconShowEntry.propTypes = {
	typeResource: T.string,
	titleResource: T.string,
	author: T.string,
	clickeditContent: T.bool,
	dataEntries: T.array.isRequired,
	editContentEntry: T.func.isRequired
}



export default class LexiconContentBody extends Component {

	render() {
		return (
			<div className="row" id="lexiconbody">
				<LexiconListEntries
					style={index}
					searchAction={this.props.searchAction}
					consultAction={this.props.consultAction}
					clicksearchEntry={this.props.clicksearchEntry}
					searchEntry={this.props.searchEntry}
					goSearchEntry={this.props.goSearchEntry}
					contentEntry={this.props.contentEntry}
					dataEntries={this.props.dataEntries}

				/>
				<LexiconShowEntry
					style={index}
					typeResource={this.props.typeResource}
					titleResource={this.props.titleResource}
					author={this.props.author}
					clickeditContent={this.props.titleResource}
					dataEntries={this.props.dataEntries}
					editContentEntry={this.props.editContentEntry}
				/>
		    </div>
    	);
	}
}

LexiconContentBody.propTypes = {
	typeResource: T.string,
	titleResource: T.string,
	author: T.string,
	clickeditContent: T.bool,
	dataEntries: T.array.isRequired,
	editContentEntry: T.func.isRequired,
	clicksearchEntry: T.bool,
	searchEntry: T.func.isRequired,
	goSearchEntry: T.func.isRequired,
	contentEntry: T.func.isRequired
}

