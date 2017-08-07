import React from 'react';


{/* Zone de création de nouvelles ressources lexicales */}
const AddEntry = props => 

	<span id="titre-resources" style={{'float':'right'}}>
		<button className="btn page-action-btn" type="button" role="button" 
		id="creer-gloss" onClick={props.action} style={{'background':'#2F99D1', 'color':'white'}} 
		alt="Ajouter une ressource lexicale">
			<span className="fa fa-plus" style={{"fontSize":"15pt"}}></span>
		</button>
	</span>



export default AddEntry