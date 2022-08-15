import React, { Component } from 'react';
import ReactDOM from 'react-dom';
// import * as jQuery from 'jquery';
// import 'bootstrap';

class Modal extends Component {
	
	componentDidMount() {
		var modalDOMNode = ReactDOM.findDOMNode(this);
		window.$(modalDOMNode).modal('show');
		window.$(modalDOMNode).on('hidden.bs.modal', this.props.handleHideModal);
	}
	
	render() {
		console.log(this.props.taskId);
		return (
			<div className="modal fade">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h4 className="modal-title">{ this.props.modalTitle }</h4>
							<button type="button" className="close" data-dismiss="modal">&times;</button>
						</div>
						<div className="modal-body">
							<form method="post" action={ this.props.targetURL }>
								<div className="form-group mb-3">
									<label>Task Name</label>
									<input type="text" name="task" className="form-control mt-2" placeholder="Enter your task name here..." required/>
									<input type="hidden" name="id" value={ this.props.taskId }/>
									<input type="hidden" name="username" value={ this.props.username }/>
									<input type="hidden" name="formFrom" value={ window.location.href }/>
								</div>
								<input type="submit" name="submit" value={ this.props.formPurpose } className="btn btn-success" />
							</form>
						</div>
						<div className="modal-footer">
							<button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Modal;