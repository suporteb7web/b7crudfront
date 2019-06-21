import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Config from '../../Config';
import style from './Login.css';

export class Login extends Component {

	constructor(props) {
		super(props);
		this.state = {
			error:''
		};

		this.submitAction = this.submitAction.bind(this);
	}

	submitAction(e) {
		e.preventDefault();

		let email = document.getElementById('email').value;
		let pass = document.getElementById('password').value;

		let url = Config.API_URL+'/u/login';
		fetch(url, {
			method:'POST',
			body:JSON.stringify({email, pass})
		})
		.then(r=>r.json())
		.then(json=>{
			if(json.error != '') {
				this.setState({error:json.error});
			} else {
				localStorage.setItem('jwt', json.jwt);
				this.props.history.push('/');
			}
		});
	}

	render() {
		return (
			<div class="d-flex flex-column align-items-center mt-4">
				<h2>B7CRUD 1.0</h2>
				<h6>Criado por Bonieky Lacerda</h6>

				<div class="login-area">
					<form onSubmit={this.submitAction}>
						<h4>Faça o Login</h4>
						<hr/>

						{this.state.error != '' &&
							<div class="alert alert-danger" role="alert">
								{this.state.error}
							</div>
						}

						<div class="form-group">
							<label for="email">E-mail</label>
							<input type="email" class="form-control" id="email" placeholder="Seu email" />
						</div>
						<div class="form-group">
							<label for="password">Senha</label>
							<input type="password" class="form-control" id="password" placeholder="Sua senha" />
						</div>
						<div class="form-group">
							<button type="submit" class="btn btn-primary">Entrar</button>
						</div>
						<div class="form-group">
							<Link class="d-block" to="/signup">Criar uma conta</Link>
						</div>
					</form>
				</div>
			</div>
		);
	}

}