import React, { Component } from 'react';
import {PropTypes as T} from 'prop-types'
import {connect} from 'react-redux'
import index from './../css/index.css'


{/* Liste des entrées d'une ressource lexicale */}
const Entry = props =>
	<li className="list-group-item"  id={props.entryName} key={props.entryName}>
		<span className="pointer" onClick={() => props.consultArticle(props.entryHandle)}>
			{props.entryName}
		</span>
	</li>

Entry.propTypes = {
	entryName: T.string.isRequired,
	entryHandle: T.string.isRequired,
	/*article: T.shape({
		entry: T.string.isRequired,
		handle: T.string.isRequired,
		editable: T.bool,
		meta: T.shape({
			content: T.string.isRequired,
			dname: T.string.isRequired,
			dstrategy: T.string.isRequired,
			value: T.string.isRequired
		}).isRequired
	}).isRequired,*/
	consultArticle: T.func.isRequired
}


{/* Liste des entrées d'une ressource lexicale */}
const ListEntries = props =>
	<ul className="list-group" id="content-entry">
		{
			props.articles.map(
				(article, index) => {
					const val = props.search
					if (article.entry.indexOf(val.value) === -1) {
				        return;
				    }
					const results = <Entry entryName={article.entry} key={index} entryHandle={article.handle} editable={article.editable}/>;
					return results;
				}
			) 
		}
	</ul>


ListEntries.propTypes = {
	articles: T.array.isRequired,
	search: T.shape({
		searchable: T.bool,
		value: T.string.isRequired
	}).isRequired
}


{/* Affiche la zone de recherche */}
class SearchBar extends Component {
  render() {
    return (
      <form>
        <div className="row" id="row-search">
			<button type="button" role="button" className="btn page-action-btn">
				<span className="page-action-icon fa fa-search" aria-hidden="true"></span>
			</button>
			<input id="titre-up"  value={this.props.search.value}
				className="col-xs-9 input-form" type="text" style={{display: 'inline-block', float:'left', fontSize:15, marginTop:6}}
				placeholder='Que rechercher vous ?' 
			/>
		</div>
      </form>
    );
  }
}

SearchBar.propTypes = {
	search: T.shape({
		searchable: T.bool,
		value: T.string.isRequired
	}).isRequired
}


{/* Filtre les articles en fonction de la recherche */}
class FilterLexiconArticles extends Component {
  render() {
    return (
        <div className="panel panel-default">
		{/* Sélectionne la zone de recherche */}
			<div className="panel panel-heading">
				{this.props.search.searchable ? 
					(<SearchBar search={this.props.search.value}/>) :
					(<div className="row" id="row-search">
						<button type="button" role="button" className="btn page-action-btn" 
							onClick={() => this.props.clickSearchArticle(this.props.search.searchable)}>
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
			<div className="panel panel-body" id="list-entry">
				<ListEntries articles={this.props.articles} search={this.props.search} />
			</div>
		</div>
    );
  }
}

FilterLexiconArticles.propTypes = {
	articles: T.array.isRequired,
	search: T.shape({
		searchable: T.bool,
		value: T.string.isRequired
	}).isRequired,
	clickSearchArticle: T.func.isRequired
}


{/* Cette page affiche le contenu de chaque article */}
const LexiconShowEntry = props =>
	<div>
		<div className="col-md-3">
			<FilterLexiconArticles articles={props.articles} search={props.search}
				clickSearchArticle={() => props.clickSearchArticle(props.search)}
			/>
		</div>
		<div className="col-md-9" style={{"float":"left"}}>
			<div className="panel panel-default">
			
			{/* haut de la page de consultation d'article */}
				<div className="panel panel-heading">
					<div className="row" style={{"marginLeft":"10pt"}}>
						<div  style={{"float":"left"}}>
							<button type="button" role="button" className="btn page-action-btn" 
								onClick={() => props.clickEditArticle(props.articleEditable)}>
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
				{props.articleEditable ?
					(<div className="panel panel-body" id="entry-content">

					</div>) :
					(<div className="panel panel-body" id="entry-content">
						{props.articles} //à revoir
					</div>)
				}

			{/* bas de page de consultation d'article */}
				<div className="panel-footer text-right">
					<span className="text-right" id="left">
						<span> {props.metaResource.type} :  </span>
						<span> {props.metaResource.type} > </span>
						<span> Auteur : {props.metaResource.author} </span>
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
	    editable: T.bool
	}).isRequired,
	search: T.shape({
		searchable: T.bool,
		value: T.string.isRequired
	}).isRequired,
	articles: T.array.isRequired,
	clickEditArticle: T.func.isRequired,
	articleEditable: T.bool,
	clickSearchArticle: T.func.isRequired
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
	    editable: T.bool
	}).isRequired,
	search: T.shape({
		searchable: T.bool,
		value: T.string.isRequired
	}).isRequired,
	articles: T.array.isRequired,
	clickEditArticle: T.func.isRequired,
	articleEditable: T.bool,
	clickSearchArticle: T.func.isRequired
}

