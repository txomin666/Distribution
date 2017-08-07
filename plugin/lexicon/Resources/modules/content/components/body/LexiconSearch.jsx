import React from 'react';



function Research() {
	return false;
}


{/* Zone de recherche des entrées */}
const LexiconSearch = props => 

	<div className="panel panel-heading">
		<div className="row" id="row-search">
			<button type="button" role="button" className="btn page-action-btn" onClick={props.action}>
				<span className="page-action-icon fa fa-search" aria-hidden="true"></span>
			</button>
			<span>
				&nbsp; <span className="page-action-icon fa fa-hand-o-left" aria-hidden="true"></span>  
				&nbsp; Cliquez pour rechercher
			</span>
		</div>
	</div>


export default LexiconSearch