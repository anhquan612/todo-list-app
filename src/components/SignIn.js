import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import Header from './Header';
import Container from './Container';

class SignIn extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			isSuccess: true,
			goToHomepage: false,
		}
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	
	componentDidMount() {
		if (localStorage.getItem('inSession')) {
			this.setState({goToHomepage: true});
		}
	}
	
	handleSubmit(e) {
		e.preventDefault();
		this.setState({ isSuccess: true });
		const url = window.$('#signinForm').attr("action");
		const formData = window.$('#signinForm').serialize();
		window.$.ajax({
			type: 'POST',
			url: url,
			data: formData,
			success: function(data) {
				const actualData = JSON.parse(data);
				const isLoginSuccess = actualData['isSuccess'];
				if (isLoginSuccess) {
					localStorage.setItem('inSession', actualData['username']);
					this.setState({goToHomepage: true});
				}
				else {
					this.setState({isSuccess: false});
				}
			}.bind(this),
		});
	}
	
	render() {
		return (
			<div className="sign-in">
				<Header>Sign In</Header>
				<Container>
					<div className="col-md-4 justify-content-center mt-5 shadow-lg rounded">
						<form id="signinForm" method="post" action="http://localhost:8000/users/login.php" onSubmit={ this.handleSubmit }>
							<div className="form-outline my-4">
								<label>Username</label>
								<input type="text" name="username" className="form-control" required/>
							</div>
							<div className="form-outline mb-4">
								<label>Password</label>
								<input type="password" name="password" className="form-control" required/>	
							</div>
							<div className="text-center">
								<input type="submit" name="submit" value="Sign in" className="btn btn-primary btn-block mb-4"/>
								<p>Not a member? <a href="/signup">Register</a></p>
								{ !this.state.isSuccess && <span>Wrong username or password!</span> }
							</div>
						</form>
					</div>
				</Container>
				{ this.state.goToHomepage && <Navigate to={'/todos'}/> }
			</div>
		);
	}
}

export default SignIn;