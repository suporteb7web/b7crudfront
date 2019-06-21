import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../../components/Header';
import Config from '../../Config';
import style from './Home.css';

import Uso from '../../components/Home/Uso';
import Modal from '../../components/Home/Modal';

export class Home extends Component {

	constructor(props) {
		super(props);
		this.state = {
			structureName:'',
			columns:[],
			data:[],
			modelOn:false,
			modalTitle:'',
			modalBody:'',
			modalOkAction:()=>{},
			modalAction:true,
			modalSize:''
		};

		this.loadStructure = this.loadStructure.bind(this);
		this.loadValues = this.loadValues.bind(this);
		this.resetModal = this.resetModal.bind(this);
		this.openModal = this.openModal.bind(this);

		this.openEdit = this.openEdit.bind(this);
		this.openAdd = this.openAdd.bind(this);
		this.openAddColumn = this.openAddColumn.bind(this);
		this.openInstructions = this.openInstructions.bind(this);

		this.deleteItem = this.deleteItem.bind(this);
		this.editItem = this.editItem.bind(this);
		this.addItem = this.addItem.bind(this);
		this.addColumnAction = this.addColumnAction.bind(this);
		this.deleteColumnAction = this.deleteColumnAction.bind(this);
		
	}

	componentDidMount() {
		this.jwt = localStorage.getItem('jwt');

		if(this.jwt == '') {
			this.props.history.push('/login');
		}

		this.loadStructure();

		$('#modalWindow').on('hidden.bs.modal', this.resetModal);
	}

	loadStructure() {
		let url = Config.API_URL+'/u?jwt='+this.jwt;
		fetch(url)
		.then(r=>r.json())
		.then(json=>{
			if(json.logged == false) {
				localStorage.setItem('jwt', '');
				this.props.history.push('/login');
			}

			this.setState({
				structureName:json.data.structure_name,
				columns:json.data.columns
			});

			this.loadValues();
		});
	}

	loadValues() {
		let url = Config.API_URL+'/'+this.state.structureName+'?jwt='+this.jwt;
		fetch(url)
		.then(r=>r.json())
		.then(json=>{
			if(json.logged == false) {
				localStorage.setItem('jwt', '');
				this.props.history.push('/login');
			}

			this.setState({data:json.data});
		});
	}

	openModal(obj) {

		this.setState({
			modalTitle:obj.title,
			modalBody:obj.body,
			modalOkAction:obj.okAction,
			modalAction:obj.modalAction,
			modalSize:obj.modalSize
		});

		$('#modalWindow').modal();
	}

	resetModal() {
		this.setState({
			modalTitle:'',
			modalBody:'',
			modalOkAction:()=>{},
			modalAction:true,
			modalSize:''
		});
	}

	openEdit(e, data) {
		e.preventDefault();

		this.openModal({
			title:'Editar',
			body:(
				<form class="m-0" onSubmit={this.editItem} data-id={data.id}>

					{this.state.columns.map((item)=>
						<div class="form-group">
							<label for={item+'_field'}>{item}</label>
							<input defaultValue={data[item]} name={item} type="text" id={item+'_field'} class="form-control" />
						</div>
					)}

				</form>
			),
			okAction:this.editItem,
			modalAction:true,
			modalSize:''
		});

	}

	openAdd(e) {
		e.preventDefault();

		this.openModal({
			title:'Adicionar',
			body:(
				<form class="m-0">
					{this.state.columns.map((item)=>
						<div class="form-group">
							<label for={item+'_field'}>{item}</label>
							<input name={item} type="text" id={item+'_field'} class="form-control" />
						</div>
					)}
				</form>
			),
			okAction:this.addItem,
			modalAction:true,
			modalSize:''
		});
	}

	openAddColumn(e) {
		e.preventDefault();

		this.openModal({
			title:'Nova Coluna',
			body:(
				<form class="m-0">
				  <div class="form-group">
				    <input type="text" class="form-control" id="new_column_name" placeholder="Nome da coluna" />
				  </div>
				</form>
			),
			okAction:this.addColumnAction,
			modalAction:true,
			modalSize:''
		});
	}

	openInstructions(e) {
		e.preventDefault();

		this.openModal({
			title:'Informações de Uso',
			body:<Uso structureName={this.state.structureName} />,
			okAction:()=>{},
			modalAction:false,
			modalSize:'modal-lg'
		});
	}

	addItem() {
		let form = $('#modalWindow').find('form')[0];

		let formData = new FormData(form);
		formData.append('jwt', this.jwt);
	
		let url = Config.API_URL+'/'+this.state.structureName;
		fetch(url, {
			method:'POST',
			body:formData
		})
		.then(r=>r.json())
		.then(json=>{
			if(json.logged == false) {
				localStorage.setItem('jwt', '');
				this.props.history.push('/login');
			}

			if(json.error != '') {
				alert(json.error);
			} else {
				$('#modalWindow').modal('hide');

				this.loadValues();
			}
		});
	}

	editItem() {
		let form = $('#modalWindow').find('form')[0];

		let id = form.getAttribute('data-id');

		let formData = new FormData(form);
		formData.append('jwt', this.jwt);
	
		let url = Config.API_URL+'/'+this.state.structureName+'/'+id;
		fetch(url, {
			method:'PUT',
			body:formData
		})
		.then(r=>r.json())
		.then(json=>{
			if(json.logged == false) {
				localStorage.setItem('jwt', '');
				this.props.history.push('/login');
			}

			if(json.error != '') {
				alert(json.error);
			} else {
				$('#modalWindow').modal('hide');

				this.loadValues();
			}
		});
	}

	deleteItem(e, item) {
		e.preventDefault();

		if(confirm('Tem certeza que deseja excluir?')) {
			let url = Config.API_URL+'/'+this.state.structureName+'/'+item.id;
			fetch(url, {
				method:'DELETE',
				body:JSON.stringify({jwt:this.jwt})
			})
			.then(r=>r.json())
			.then(json=>{
				if(json.logged == false) {
					localStorage.setItem('jwt', '');
					this.props.history.push('/login');
				}

				if(json.error != '') {
					alert(json.error);
				} else {
					this.loadValues();
				}
			});
		}
	}

	addColumnAction() {
		let column_name = document.getElementById('new_column_name').value;

		let url = Config.API_URL+'/u';
		fetch(url, {
			method:'POST',
			body:JSON.stringify({jwt:this.jwt, column_name})
		})
		.then(r=>r.json())
		.then(json=>{
			if(json.logged == false) {
				localStorage.setItem('jwt', '');
				this.props.history.push('/login');
			}

			if(json.error != '') {
				alert(json.error);
			} else {
				$('#modalWindow').modal('hide');

				this.loadStructure();
			}
		});
	}

	deleteColumnAction(e, column_name) {
		e.preventDefault();

		if(confirm('Tem certeza que deseja excluir esta coluna?')) {
			let url = Config.API_URL+'/u';
			fetch(url, {
				method:'DELETE',
				body:JSON.stringify({jwt:this.jwt, column_name})
			})
			.then(r=>r.json())
			.then(json=>{
				if(json.logged == false) {
					localStorage.setItem('jwt', '');
					this.props.history.push('/login');
				}

				if(json.error != '') {
					alert(json.error);
				} else {
					this.loadStructure();
				}
			});
		}
	}

	render() {
		return (
			<div>
				<Header />

				<div class="container">
					<h1 class="structureName">{this.state.structureName}</h1>

					<div class="d-flex">

						<div class="new_column flex-fill">
							<div class="btn-group" role="group">
								<button onClick={this.openAdd} class="btn btn-success">Adicionar Dados</button>
								<button onClick={this.openAddColumn} class="btn btn-warning">Adicionar Nova Coluna</button>
								<button onClick={this.openInstructions} class="btn btn-primary">Informações de Uso</button>
							</div>
						</div>
						
					</div>
					

					{this.state.columns.length > 0 &&
					<table class="table table-striped">
						<thead>
							<tr>
								<th scope="col">#</th>
								{this.state.columns.map((item)=>
									<th scope="col">{item} <a onClick={(e)=>this.deleteColumnAction(e, item)} href="#">[x]</a></th>
								)}
								<th scope="col">Ações</th>
							</tr>
						</thead>
						<tbody>
							{this.state.data.length > 0 &&
								this.state.data.map((item, key)=>{
									return (
										<tr>
									      	<th scope="row">{item.id}</th>

											{this.state.columns.map((col)=>
												<td>{this.state.data[key][col]}</td>
											)}

									      	<td>
									      		<div class="btn-group" role="group">
													<a onClick={(e)=>this.openEdit(e, item)} class="btn btn-sm btn-primary" href="#">Editar</a>
													<a onClick={(e)=>this.deleteItem(e, item)} class="btn btn-sm btn-danger" href="#">Excluir</a>
												</div>
											</td>
									    </tr>
									);

								})
							}
						</tbody>
					</table>
					}
				</div>

				<Modal
					modalSize={this.state.modalSize}
					modalTitle={this.state.modalTitle}
					modalBody={this.state.modalBody}
					modalAction={this.state.modalAction}
					modalOkAction={this.state.modalOkAction}
				/>
			</div>
		);
	}

}