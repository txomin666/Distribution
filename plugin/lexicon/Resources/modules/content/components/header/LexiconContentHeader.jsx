import React, { Component } from 'react';
import AddEntry from './AddEntry.jsx';
import TitleHeader from './TitleHeader.jsx';
//import index from './../../css/index.css'



class LexiconContentHeader extends Component { 
	
	constructor(props){
		super(props)
		this.store = this.props.lexiconStore;
	}

	
	render() {
		return (
			<span className="row"  id="lexiconheader">
				<TitleHeader 
					state={this.store.getState()} 
					action={this.props.hEditT}
				/>
				<AddEntry 
					saveData={this.props.saved} 
					action={this.props.hCreateE}
				/>
		    </span>
	    );
	}

}


export default LexiconContentHeader
