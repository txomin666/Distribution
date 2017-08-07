import React from 'react';
import Entry from './Entry.jsx';


function items(item, action) {
	const result = item.map((entry, index) => <Entry name={entry[0]} key={index} actionEntry={action} />) ;
	return result;
}


{/* Liste des entrées d'une ressource lexicale */}
const ListEntries = props => 

	<ul className="list-group" id="content-entry">
		{
			items(props.listItems, props.actionEntries)
		}
	</ul>
			


export default ListEntries