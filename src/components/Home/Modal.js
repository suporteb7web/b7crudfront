import React, { Component } from 'react';
import Config from '../../Config';

export default class Modal extends Component {

	render() {
		return (
			<div class="modal fade" id="modalWindow" tabindex="-1" role="dialog">
			  <div class={this.props.modalSize+' modal-dialog modal-dialog-centered'} role="document">
			    <div class="modal-content">
			      <div class="modal-header">
			        <h5 class="modal-title">{this.props.modalTitle}</h5>
			        <button type="button" class="close" data-dismiss="modal" aria-label="Fechar">
			          <span aria-hidden="true">&times;</span>
			        </button>
			      </div>
			      <div class="modal-body">
			        {this.props.modalBody}
			      </div>
			      {this.props.modalAction &&
				      <div class="modal-footer">
				        <button onClick={this.props.modalOkAction} class="btn btn-primary">Salvar</button>
				      </div>
				  }
			    </div>
			  </div>
			</div>
		);
	}
}