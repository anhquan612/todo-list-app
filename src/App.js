import './App.css';
import Header from './components/Header';
import Button from './components/Button';
import Container from './components/Container';
import TaskTable from './components/TaskTable';
import Modal from './components/Modal';
import Pagination from './components/Pagination';
import { useState, useEffect } from 'react';

function App(props) {
	const [taskIdForHandle, setTaskIdForHandle] = useState(-1);
	const [taskData, setTaskData] = useState(null);
	const [numberOfPage, setNumberOfPage] = useState(0);
	const [isReady, setIsReady] = useState(false);
	const [isShowAddModal, setIsShowAddModal] = useState(false);
	const [isShowEditModal, setIsShowEditModal] = useState(false);
	const baseURL = "http://localhost:8000/";
	
	function printWindow() {
		window.print();
	}
	
	function handleShowAddModal() {
		setTaskIdForHandle(-1);
		setIsShowAddModal(true);
	}
	
	function handleHideAddModal() {
		setIsShowAddModal(false);
	}
	
	function handleShowEditModal(selectedId) {
		setTaskIdForHandle(selectedId);
		setIsShowEditModal(true);
	}
	
	function handleHideEditModal() {
		setIsShowEditModal(false);
	}
	
	useEffect(() => {
		const url = baseURL + `get.php/?page=${props.page}&tasksPerPage=${props.tasksPerPage}`;
		fetch(url)
			.then((res) => res.json())
				.then((actualData) => { setTaskData(actualData['taskData']); setNumberOfPage(actualData['numberOfPage']) })
					.then(() => { setIsReady(true) });
	}, []);
	
	return (
		<div className="App">
			<Header>Todo App</Header>
			<Container>
				<Button customClasses="btn-outline-success" callbackFunc= { handleShowAddModal }>Add task</Button>
				<Button customClasses="btn-outline-dark float-end" callbackFunc={ printWindow }>Print</Button>
				<hr/><br/>
				{isShowAddModal && <Modal taskId={ taskIdForHandle } handleHideModal={ handleHideAddModal } modalTitle="Add task" targetURL={ baseURL+"add.php" } formPurpose="Add"/>}
				{isShowEditModal && <Modal taskId={ taskIdForHandle } handleHideModal={ handleHideEditModal } modalTitle="Edit task" targetURL={ baseURL+"edit.php" } formPurpose="Edit"/>}
				{isReady && <TaskTable taskData={ taskData } callbackForEditButton={ handleShowEditModal }></TaskTable>}
				{isReady && <Pagination numberOfPage={ numberOfPage } page={ props.page } tasksPerPage={ props.tasksPerPage }/>}
			</Container>
		</div>
	);
}

export default App;