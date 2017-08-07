import React from 'react';

function EditEntry () {
	console.log('ok');
	return false;
}

{/* Cette page affiche le contenu de chaque article */}
const LexiconShowEntry = props => 

	<div className="col-md-9" style={{"float":"left"}}>
		<div className="panel panel-default"> 
		{/* haut de la page */}
			<div className="panel panel-heading">
				<div className="row" style={{"marginLeft":"10pt"}}>
					<div  style={{"float":"left"}}>
						<button type="button" role="button" className="btn page-action-btn" onClick={EditEntry}>
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
			<div className="panel panel-body" id="entry-content">
				
			</div>
		{/* bas de page */}
			<div className="panel-footer text-right">
				<span className="text-right" id="left"></span>
			</div>
		</div>
	</div>
	
		


export default LexiconShowEntry