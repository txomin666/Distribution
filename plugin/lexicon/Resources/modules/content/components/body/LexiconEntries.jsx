import React from 'react';
import ListEntries from './ListEntries.jsx';




{/* Liste des entrées d'une ressource lexicale */}
const LexiconEntries = props => 

	<div className="panel panel-body" id="list-entry">
		<ListEntries listItems={props.listItems} actionEntries={props.action}/>
	</div>


export default LexiconEntries