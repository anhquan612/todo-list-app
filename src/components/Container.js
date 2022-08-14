import React, { Component } from 'react';

class Container extends Component {
	render() {
		return (
			<div className="container">
				<div className="row justify-content-center">
					<div className="col-md-10 col-md-offset-1">
						{ this.props.children }
					</div>
				</div>
			</div>
		);
	}
}

export default Container;