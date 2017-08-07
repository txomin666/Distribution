import React from 'react';
import LexiconSearch from './LexiconSearch.jsx';
import LexiconEntries from './LexiconEntries.jsx';

    

{/* Zone de recherche et de consultation des entrées */}
const LexiconListEntries = props => 

	<div className="col-md-3">
		<div className="panel panel-default"> 
		{/* Affiche la zone de recherche */}
			<LexiconSearch 
				action={props.searchAction} 
			/>
		{/* Affiche la liste des entrées d'une ressource lexicale */}
			<LexiconEntries 
				listItems={props.state.dataItems}  
				action={props.consultAction}
			/>
		</div>
	</div>
		


export default LexiconListEntries