import React, { Component } from 'react';
import Config from '../../Config';

export class Logout extends Component {

	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
		localStorage.setItem('jwt', '');
		this.props.history.push('/');
	}

	render() {
		return (
			<div></div>
		);
	}

}