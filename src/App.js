import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Config from './Config';

import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { SignUp } from './pages/SignUp';
import { Logout } from './pages/Logout';

class App extends Component {

	render() {
		return (
			<BrowserRouter basename={Config.BASE_URL}>
				<div>
					<Route exact path="/" component={Home} />
					<Route path="/login" component={Login} />
					<Route path="/signup" component={SignUp} />
					<Route path="/logout" component={Logout} />
				</div>
			</BrowserRouter>
		);
	}

}

export default App;