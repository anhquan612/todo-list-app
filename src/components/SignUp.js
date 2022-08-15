import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import Header from './Header';
import Container from './Container';

class SignUp extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			isError: false,
			isSuccess: true,
			gotoSigninPage: false,
			gotoHomePage: true,
		}
		this.handleSubmit = this.handleSubmit.bind(this);
		this.validate = this.validate.bind(this);
	}
	
	componentDidMount() {
		if (localStorage.getItem('inSession')) {
			this.setState({goToHomepage: true});
		}
	}
	
	handleSubmit(e) {
		e.preventDefault();
		this.setState({ isSuccess: true });
		const isGoodInput = this.validate(e);
		if (isGoodInput === false) {
			this.setState({ isError: true });
		}
		else {
			const url = window.$('#signupForm').attr('action');
			const formData = window.$('#signupForm').serialize();
			window.$.ajax({
				type: 'POST',
				url: url,
				data: formData,
				success: function(data) {
					const actualData = JSON.parse(data);
					const isRegSuccess = actualData['isSuccess'];
					if (isRegSuccess === false) {
						this.setState({ isSuccess: isRegSuccess });
					}
					else {
						this.setState({gotoSigninPage: true});
					}
				}.bind(this)
			});
			this.setState({ isError: false });
		}
	}
	
	validate(e) {
		const formPassword = e.target.password.value;
		const formConfirmPassword = e.target.confirmPassword.value;
		if (formPassword !== formConfirmPassword) {
			return false;
		}
		else {
			return true;
		}
	}
	
	render() {
		return (
			<div className="sign-up">
				<Header>Sign Up</Header>
				<Container>
					<div className="col-md-4 justify-content-center mt-5 shadow-lg rounded">
						<form id="signupForm" method="post" action="http://localhost:8000/users/register.php" onSubmit= { this.handleSubmit }>
							<div className="form-outline my-4">
								<label>Username</label>
								<input type="text" name="username" className="form-control" required/>
							</div>
							<div className="form-outline mb-4">
								<label>Password</label>
								<input type="password" name="password" className="form-control" required/>	
							</div>
							<div className="form-outline mb-4">
								<label>Confirm password</label>
								<input type="password" name="confirmPassword" className="form-control" required/>
								{ this.state.isError && <span>Password and confirm password are not equal!</span> }
							</div>
							<div className="text-center">
								<input type="submit" name="submit" value="Sign up" className="btn btn-primary btn-block mb-4"/>
								<p><a href="/signin">Back to Sign in</a></p>
								{ !this.state.isSuccess && <span>This username is already exists!</span> }
							</div>
						</form>
					</div>
				</Container>
				{ this.state.gotoSigninPage && <Navigate to={'/signin'}/> }
				{ this.state.goToHomepage && <Navigate to={'/todos'}/> }
			</div>
		);
	}
}

export default SignUp;