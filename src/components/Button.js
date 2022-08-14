import React, { Component } from 'react';

class Button extends Component {
	render() {
		const commonClasses = "btn";
		const classes = commonClasses + " " + this.props.customClasses;
		return (
			<button type="button" data-toggle="modal" data-target="#addTaskModal" className={ classes } onClick={ () => { this.props.callbackFunc() } }> { this.props.children } </button>
		);
	}
}

export default Button;