import React, { Component } from 'react';
import LexiconListEntries from './LexiconListEntries.jsx';
import LexiconShowEntry from './LexiconShowEntry.jsx';
import index from './../../css/index.css'


class LexiconContentBody extends Component {

	constructor(props){
		super(props)
		this.store = this.props.contentStore;
	}

	//const lexiconState = this.store.getState();

	render() {
		return (
			<div className="row" id="lexiconbody">
				<LexiconListEntries 
					style={index} 
					state={this.store.getState()}
					searchAction={this.props.hSearchE}
					consultAction={this.props.hConsultE}
				/>
				<LexiconShowEntry 
					style={index}
				/>
		    </div>
    	);
	}
}

export default LexiconContentBody
