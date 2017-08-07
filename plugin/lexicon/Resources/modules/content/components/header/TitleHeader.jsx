import React from 'react';

function TitleAction() {
	return false;
}

const TitleHeader = props => 

	<span id="titre-up" onClick={props.action}>
		{props.state.titleResource}
	</span>



export default TitleHeader