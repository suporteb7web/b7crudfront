import React, { Component } from 'react';
import Config from '../../Config';

export default class Uso extends Component {

	render() {
		return (
			<div>
				<div class="alert alert-info" role="alert">
					Todos os endpoints (exceto login/cadastro) devem possuir, além dos parâmetros padrão, o JWT.
				</div>

				<table class="table table-striped">
					<thead>
						<tr>
							<th>Método</th>
							<th>Endpoint</th>
							<th>Parâmetros</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td colspan="3">
								<strong>Efetuar Login</strong>
							</td>
						</tr>
						<tr>
							<td>POST</td>
							<td>{Config.API_URL+'/u/login'}</td>
							<td>email=seuemail@email.com<br/>pass=12345</td>
						</tr>

						<tr>
							<td colspan="3">
								<strong>Registrar novo login</strong>
							</td>
						</tr>
						<tr>
							<td>POST</td>
							<td>{Config.API_URL+'/u/new'}</td>
							<td>email=seuemail@email.com<br/>pass=12345<br/>structure_name=carros</td>
						</tr>

						<tr>
							<td colspan="3">
								<strong>Ver lista de itens</strong>
							</td>
						</tr>
						<tr>
							<td>GET</td>
							<td>{Config.API_URL+'/'+this.props.structureName}</td>
							<td></td>
						</tr>

						<tr>
							<td colspan="3">
								<strong>Adicionar novo item</strong>
							</td>
						</tr>
						<tr>
							<td>POST</td>
							<td>{Config.API_URL+'/'+this.props.structureName}</td>
							<td>coluna1=Exemplo<br/>coluna2=99</td>
						</tr>

						<tr>
							<td colspan="3">
								<strong>Informações de um item</strong>
							</td>
						</tr>
						<tr>
							<td>GET</td>
							<td>{Config.API_URL+'/'+this.props.structureName+'/123'}</td>
							<td></td>
						</tr>

						<tr>
							<td colspan="3">
								<strong>Editar item</strong>
							</td>
						</tr>
						<tr>
							<td>PUT</td>
							<td>{Config.API_URL+'/'+this.props.structureName+'/123'}</td>
							<td>coluna1=Exemplo<br/>coluna2=99</td>
						</tr>

						<tr>
							<td colspan="3">
								<strong>Excluir item</strong>
							</td>
						</tr>
						<tr>
							<td>DELETE</td>
							<td>{Config.API_URL+'/'+this.props.structureName+'/123'}</td>
							<td></td>
						</tr>

						<tr>
							<td colspan="3">
								<strong>Ver estrutura de dados</strong>
							</td>
						</tr>
						<tr>
							<td>GET</td>
							<td>{Config.API_URL+'/u'}</td>
							<td></td>
						</tr>

						<tr>
							<td colspan="3">
								<strong>Adicionar Nova Coluna</strong>
							</td>
						</tr>
						<tr>
							<td>POST</td>
							<td>{Config.API_URL+'/u'}</td>
							<td>column_name=Exemplo</td>
						</tr>

						<tr>
							<td colspan="3">
								<strong>Excluir Coluna</strong>
							</td>
						</tr>
						<tr>
							<td>DELETE</td>
							<td>{Config.API_URL+'/u'}</td>
							<td>column_name=Exemplo</td>
						</tr>
					</tbody>
				</table>
			</div>
		);
	}
}