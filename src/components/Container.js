import React, { Component } from 'react';

class Container extends Component {
	render() {
		return (
			<div className="container">
				<div className="row justify-content-center">
						{ this.props.children }
				</div>
			</div>
		);
	}
}

export default Container;