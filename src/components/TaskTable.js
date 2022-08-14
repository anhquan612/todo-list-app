import React, { Component } from 'react';
import Button from './Button';

const TableHeader = (props) => {
	const colHeaders = props.colHeaders.map((colHeader, index) => {
		colHeader = colHeader[0].toUpperCase() + colHeader.substring(1);
		return (
			<th scope="col" key={ index }> { colHeader } </th>
		);
	})
	return (
		<thead>
			<tr>
				{ colHeaders }
			</tr>
		</thead>
	);
}

const TableBody = (props) => {
	const tableRows = props.tableData.map((row, index) => {
		return (
			<tr key={ index } className="align-items-center">
				<th className="align-middle" scope="row">{ row.id }</th>
				<td className="align-middle col-md-10">{ row.task }</td>
				<td><Button customClasses="btn-primary" callbackFunc={ () => props.callbackForEditButton(row.id) }>Edit</Button></td>
				<td><a href={"http://localhost:8000/delete.php?id=" + row.id} className="btn btn-danger" role="button">Delete</a></td>
			</tr>
		);
	})
	return (<tbody>{ tableRows }</tbody>);
}

class TaskTable extends Component {
	constructor(props) {
		super(props);
		const headers = Object.keys(this.props.taskData[0]);
		this.state = { columnHeaders: headers};
	}
	
	render() {
		return (
			<table className="table table-hover table-borderless">
				<TableHeader colHeaders={ this.state.columnHeaders} />
				<TableBody tableData={ this.props.taskData } callbackForEditButton={ this.props.callbackForEditButton }/>
			</table>
		);
	}
}

export default TaskTable;