import React from 'react';


{/* Liste des entrées d'une ressource lexicale */}
const Entry = props => 

	<li className="list-group-item"  id={props.name} key={props.name}>
		<span className="pointer" onClick={props.actionEntry} >{props.name}</span>
	</li>
			


export default Entry