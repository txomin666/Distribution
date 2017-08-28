import React, { Component } from 'react'
import {PropTypes as T} from 'prop-types'
import {connect} from 'react-redux'
import index from './../css/index.css'
import {ButtonGroup, Button} from 'react-bootstrap'



{/* Liste des entrées d'une ressource lexicale */}
const Entry = props =>
	<li className="list-group-item"  id={props.key} key={props.key} author={props.author} creation={props.creation}>
	{/* Modale de partage d'un article de la ressource lexicale */}
		<div className="modal fade" id="shareModal" role="dialog">
		    <div className="modal-dialog">
		      <div className="modal-content">
		        <div className="modal-header">
		          <button type="button" className="close" data-dismiss="modal">&times;</button>
		          <h4 className="modal-title">Partager la ressource lexicale</h4>
		        </div>
		        <div className="modal-body">
					<div className="form-horizontal">
						<div>
					    	<span><input type="checkbox"/>  Partager les droits d'édition et de suppression </span>
					    </div><br/>
					    <div className="form-group">
					        <div className="col-sm-12">
						       <span> Avec</span> <br/>
						        <div className="input-group col-sm-12">
								    <span className="input-group-addon"><i className="fa fa-user"></i></span>
								    <input id="email" type="text" className="form-control" name="email" placeholder="Insérer un nom"/>
							    </div>
						    </div>
					    </div>
			        </div>
				</div>
		        <div className="modal-footer">
		          <button type="button" className="btn btn-default" data-dismiss="modal">Annuler</button>
		          <button type="button" className="btn btn-primary">Partager</button>
		        </div>
		      </div>
		    </div>
		</div>
	{/* Modale de suppression d'un article de la ressource lexicale */}
		<div className="modal fade" id="deleteModal" role="dialog">
		    <div className="modal-dialog">
		      <div className="modal-content">
		        <div className="modal-header">
		          <button type="button" className="close" data-dismiss="modal">&times;</button>
		          <h4 className="modal-title">Supprimer la ressource lexicale</h4>
		        </div>
		        <div className="modal-body">
					<div className="form-horizontal">
					     <div className="form-group">
					      <label className="control-label col-sm-11" htmlFor="def">
					      <i className="fa fa-trash-o text-danger"/> Êtes-vous sûr de vouloir supprimer cette article ?
					      </label>
					    </div>
			        </div>
				</div>
		        <div className="modal-footer">
		          <button type="button" className="btn btn-danger btn-inline col-sm-12">
						Supprimer
				  </button>
		        </div>
		      </div>
		    </div>
		</div>
		{/* Bouton d'action pour chaque article de la ressource lexicale */}
		<span className="pointer" onClick={() => props.consultArticle(props.entryName, props.content)}>
			{props.entryName}
		</span>
		<span id="entryAction">
			<i className="fa fa-share text-primary act"
				onClick={() => props.shareArticle(props.key)}
				data-toggle="modal" data-target="#shareModal"
			/>
			<span> &nbsp;&nbsp; </span>
			<i className="fa fa-trash-o text-danger act"
				onClick={() => props.deleteArticle(props.key)}
				data-toggle="modal" data-target="#deleteModal"
			/>
		</span>
	</li>

Entry.propTypes = {
	entryName: T.string.isRequired,
	content: T.string.isRequired,
	key: T.string.isRequired,
	author: T.string.isRequired,
	creation: T.string.isRequired,
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
	consultArticle: T.func.isRequired,
	shareArticle: T.func.isRequired,
	deleteArticle: T.func.isRequired,
	currentContentArticle: T.object.isRequired
}


{/* Liste des entrées d'une ressource lexicale */}
const ListEntries = props =>
	<div className="panel panel-body" id="list-entry">
		<ul className="list-group" id="content-entry">
			{
				props.articles.map(
					(article) => {
						const result  =
							<Entry 
								entryName={article.entry} 
								key={article.id}
								author={article.author}
								creation={article.creation}
								content={article.content}
								deleteArticle={props.deleteArticle}
								shareArticle={props.shareArticle}
								consultArticle={props.consultArticle}
								currentContentArticle={props.currentContentArticle}
								metaResource={props.metaResource}
							/>
						return result
					}
				) 
			}
		</ul>
	</div>

ListEntries.propTypes = {
	articles: T.array.isRequired,
	search: T.shape({
		searchable: T.bool,
		value: T.string.isRequired
	}).isRequired,
	shareArticle: T.func.isRequired,
	deleteArticle: T.func.isRequired,
	consultArticle: T.func.isRequired,
	currentContentArticle: T.object.isRequired,
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
}


{/* Affiche la zone de recherche */}
class SearchBar extends Component {
  constructor(props) {
	  super(props);
	  this.changeSearch = this.changeSearch.bind(this)
  }
  changeSearch(event) {
	this.props.onSearch(event.target.value)
	console.log('event_search', event.target.value)
  }

  render() {
    return (
      <form>
        <div className="input-group">
		    <input type="text" className="form-control input-lg"
		    	placeholder="Recherchez ..." onChange={this.changeSearch}/>
		    <div className="input-group-btn">
		      <button className="btn btn-default input-lg" type="submit">
		        <i className="fa fa-search" style={{"fontSize":"15pt"}}></i>
		      </button>
		    </div>
		</div>
      </form>
    );
  }
}

SearchBar.propTypes = {
	search: T.shape({
		searchable: T.bool,
		value: T.string.isRequired
	}).isRequired,
	onSearch: T.func.isRequired
}


{/* Filtre les articles en fonction de la recherche */}
class FilterLexiconArticles extends Component {
  constructor(props) {
	super(props);
	this.changeSearch = this.changeSearch.bind(this)
  }
  changeSearch(event) {
	this.props.onSearch(event.target.value)
	console.log(event.target.value)
  }

  render() {
    return (
        <div className="panel panel-default">
		{/* Sélectionne la zone de recherche */}
			<div className="panel panel-heading">
				{this.props.metaResource.searchable ? 
					(<SearchBar search={this.props.search} onSearch={this.entrySearch}/>) :
					(<div className="row" id="row-search">
						<button type="button" role="button" className="btn page-action-btn" 
							onClick={() => this.props.clickSearchArticle(this.props.metaResource.searchable)}>
							<span className="page-action-icon fa fa-search" aria-hidden="true"></span>
						</button>
						<span>
							&nbsp; <span className="page-action-icon fa fa-hand-o-left" aria-hidden="true"></span>
							&nbsp; Cliquez pour rechercher
						</span>
					</div>)
				}
			</div>
		{/* Affiche la liste des entrées d'une ressource lexicale */}
			<ListEntries articles={this.props.articles} 
				search={this.props.search} 
				shareArticle={this.props.shareArticle} 
				deleteArticle={this.props.deleteArticle}
				consultArticle={this.props.consultArticle}
				currentContentArticle={this.props.currentContentArticle}
				metaResource={this.props.metaResource}
			/>
		</div>
    );
  }
}

FilterLexiconArticles.propTypes = {
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
	articles: T.array.isRequired,
	search: T.shape({
		//searchable: T.bool,
		value: T.string.isRequired
	}).isRequired,
	clickSearchArticle: T.func.isRequired,
	shareArticle: T.func.isRequired,
	deleteArticle: T.func.isRequired,
	consultArticle: T.func.isRequired,
	currentContentArticle: T.object.isRequired
}


{/* Cette page affiche le contenu de chaque article */}
const LexiconShowEntry = props =>
	<div>
		<div className="col-md-3">
			<FilterLexiconArticles articles={props.articles} 
				search={props.search}
				clickSearchArticle={props.clickSearchArticle} 
				metaResource={props.metaResource}
				shareArticle={props.shareArticle} 
				deleteArticle={props.deleteArticle}
				consultArticle={props.consultArticle}
				currentContentArticle={props.currentContentArticle}
			/>
		</div>
		<div className="col-md-9" style={{"float":"left"}}>
			<div className="panel panel-default">
			
			{/* haut de la page de consultation d'article */}
				<div className="panel panel-heading">
					<div className="row" style={{"marginLeft":"10pt"}}>
						<div  style={{"float":"left"}}>
							<button type="button" role="button" className="btn page-action-btn" 
								onClick={() => props.clickEditArticle(props.metaResource.articleEditable)}>
								<span className="page-action-icon fa fa-pencil"></span>
							</button>
							<span>
								&nbsp; <span className="page-action-icon fa fa-hand-o-left" aria-hidden="true"></span>
								&nbsp; Cliquez pour modifier cette entrée
							</span>
						</div>
					</div>
				</div>

			{/* corps de la page de consultation d'article */}
				{props.metaResource.articleEditable ?
					(<div className="panel panel-body" id="entry-content">

					</div>) :
					(<div className="panel panel-body" id="entry-content">
						{props.currentContentArticle}
					</div>)
				}

			{/* bas de page de consultation d'article */}
				<div className="panel-footer text-right">
					<span className="text-right" id="left">
						<span>Type : <span className="text-primary">{props.metaResource.type}</span> >  </span>
						<span> Titre : <span className="text-primary">{props.metaResource.title}</span> > </span>
						<span> Auteur : <span className="text-primary">{props.metaResource.author}</span> </span>
					</span>
				</div>
			</div>
		</div>
	</div>

LexiconShowEntry.propTypes = {
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
	search: T.shape({
		//searchable: T.bool,
		value: T.string.isRequired
	}).isRequired,
	articles: T.array.isRequired,
	clickEditArticle: T.func.isRequired,
	articleEditable: T.bool,
	clickSearchArticle: T.func.isRequired,
	shareArticle: T.func.isRequired,
	deleteArticle: T.func.isRequired,
	consultArticle: T.func.isRequired,
	currentContentArticle: T.object.isRequired
}



export default class LexiconContentBody extends Component {

	render() {
		return (
			<div className="row" id="lexiconbody">
				<LexiconShowEntry
					style={index}
					metaResource={this.props.metaResource}
					articles={this.props.articles}
					clickEditArticle={this.props.clickEditArticle}
					articleEditable={this.props.articleEditable}
					search={this.props.search}
					clickSearchArticle={this.props.clickSearchArticle}
					shareArticle={this.props.shareArticle}
					deleteArticle={this.props.deleteArticle}
					consultArticle={this.props.consultArticle}
					currentContentArticle={this.props.currentContentArticle}
				/>
		    </div>
    	);
	}
}

LexiconContentBody.propTypes = {
	style: T.string,
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
	search: T.shape({
		//searchable: T.bool,
		value: T.string.isRequired
	}).isRequired,
	articles: T.array.isRequired,
	clickEditArticle: T.func.isRequired,
	articleEditable: T.bool,
	clickSearchArticle: T.func.isRequired,
	shareArticle: T.func.isRequired,
	deleteArticle: T.func.isRequired,
	consultArticle: T.func.isRequired,
	currentContentArticle: T.object.isRequired
}

