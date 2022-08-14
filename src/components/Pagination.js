import React, { Component } from 'react';

class Pagination extends Component {
	constructor(props) {
		super(props);
		const pageList = [];
		for (var i = 1; i <= this.props.numberOfPage; ++i) {
			const targetURL = `/?page=${i}&tasksPerPage=${this.props.tasksPerPage}`;
			var liClasses = "page-item ";
			if (i === this.props.page) {
				liClasses += "disabled";
			}
			pageList.push(<li key={ i } className={ liClasses }><a className="page-link" href={ targetURL }>{i}</a></li>);
		}
		this.state = { pageList: pageList };
	}
	
	render() {
		return (
			<div>
				<ul className="pagination justify-content-center" >
					{ this.state.pageList }
				</ul>
			</div>
		);
	}
}

export default Pagination;