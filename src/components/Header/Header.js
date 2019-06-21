import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Config from '../../Config';

export class Header extends Component {

	render() {
		return (
			<header>
				<nav class="navbar navbar-expand-lg navbar-light bg-light">
				  <a class="navbar-brand" href="#">B7Crud</a>
				  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Alterna navegação">
				    <span class="navbar-toggler-icon"></span>
				  </button>
				  <div class="collapse navbar-collapse" id="navbarNavDropdown">
				    <ul class="navbar-nav">
				      <li class="nav-item">
				      	<Link class="nav-link" to="/">Home</Link>
				      </li>
				      <li class="nav-item">
					      <Link class="nav-link" to="/logout">Sair</Link>
				      </li>
				    </ul>
				  </div>
				</nav>
			</header>
		);
	}

}