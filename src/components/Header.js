import React, { Component } from 'react';

class Header extends Component {
	render() {
		return (
			<header className='header mt-5 text-center'>
				<h1> { this.props.children.toUpperCase() } </h1>
			</header>
		);
	}
}

export default Header;