import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import Header from './Header';
import Container from './Container';

class ChangePassword extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isError: false,
			isSuccess: true,
			gotoHomepage: false,
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.validate = this.validate.bind(this);
	}
	
	handleSubmit(e) {
		e.preventDefault();
		this.setState({ isSuccess: true });
		const isGoodInput = this.validate(e);
		if (isGoodInput) {
			const url = window.$('#changePasswordForm').attr('action');
			const formData = window.$('#changePasswordForm').serialize();
			window.$.ajax({
				type: 'POST',
				url: url,
				data: formData,
				success: function(data) {
					console.log(data);
					const actualData = JSON.parse(data);
					const isChangeSuccess = actualData["isSuccess"];
					if (isChangeSuccess) {
						this.setState({ gotoHomepage: true });
					}
					else {
						this.setState({ isSuccess: false });
					}
				}.bind(this)
			});
			this.setState({isError: false});
		}
		else {
			this.setState({isError: true});
		}
	}
	
	validate(e) {
		const newPassword = e.target.newPassword.value;
		const confirmNewPassword = e.target.confirmNewPassword.value;
		if (newPassword === confirmNewPassword) {
			return true;
		}
		else {
			return false;
		}
	}
	
	render() {
		var componentForRender = null;
		const userInSession = localStorage.getItem('inSession');
		if (!userInSession) {
			componentForRender = <Navigate to="/signin"/>;
		}
		else {
			componentForRender = (
				<div>
					{ this.state.gotoHomepage && <Navigate to="/todos"/> }
					<Header>Change password</Header>
					<Container>
						<div className="col-md-4 justify-content-center mt-5 shadow-lg rounded">
							<form id="changePasswordForm" method="POST" action="http://localhost:8000/users/changepassword.php" onSubmit={ this.handleSubmit }>
								<div className="form-outline my-4">
									<input type="hidden" name="username" value={ userInSession }/>
									<label>Current password</label>
									<input type="password" name="currentPassword" className="form-control" required/>
								</div>
								<div className="form-outline my-4">
									<label>New password</label>
									<input type="password" name="newPassword" className="form-control" required/>
								</div>
								<div className="form-outline my-4">
									<label>Confirm new password</label>
									<input type="password" name="confirmNewPassword" className="form-control" required/>
									{ this.state.isError && <span>New password and confirm new password are not equal!</span> }
								</div>
								<div className="text-center">
									<input type="submit" name="submit" value="Change" className="btn btn-primary btn-block mb-4"/>
									<p><a href="/todos">Back to Home page</a></p>
									{ !this.state.isSuccess && <span>Current password is wrong!</span>}
								</div>
							</form>
						</div>
					</Container>
				</div>
			);
		}
		return (
			<div className="change-password">
				{ componentForRender }
			</div>
		);
	}
}

export default ChangePassword;