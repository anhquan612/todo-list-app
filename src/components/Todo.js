import Header from './Header';
import Button from './Button';
import Container from './Container';
import TaskTable from './TaskTable';
import Modal from './Modal';
import Pagination from './Pagination';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Todo(props) {
	const [username, setUsername] = useState('');
	const [taskIdForHandle, setTaskIdForHandle] = useState(-1);
	const [taskData, setTaskData] = useState(null);
	const [numberOfPage, setNumberOfPage] = useState(0);
	const [isReady, setIsReady] = useState(false);
	const [isShowAddModal, setIsShowAddModal] = useState(false);
	const [isShowEditModal, setIsShowEditModal] = useState(false);
	const navigate = useNavigate();
	const baseURL = "http://localhost:8000/tasks/";
	
	function logOut() {
		localStorage.removeItem('inSession');
		navigate('/signin');
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
		const action = async() => {
			const inSession = localStorage.getItem('inSession');
			if (!inSession) {
				return navigate('/signin');
			}
			else {
				setUsername(inSession);
			}
			const url = baseURL + `/get.php/?username=${inSession}&page=${props.page}&tasksPerPage=${props.tasksPerPage}`;
			fetch(url)
				.then((res) => res.json())
					.then((actualData) => { setTaskData(actualData['taskData']); setNumberOfPage(actualData['numberOfPage']) })
						.then(() => { setIsReady(true) });
		}
		action();
	}, []);
	
	return (
		<div className="todos">
			<Header>Todo App</Header>
			<Container>
				<div className="col-md-10 col-md-offset-1">
					<h5 className="mt-3">Hi, { username }</h5>
					<Button customClasses="btn-outline-success" callbackFunc= { handleShowAddModal }>Add task</Button>
					<Button customClasses="btn-outline-dark float-end" callbackFunc={ logOut }>Sign out</Button>
					<hr/><br/>
					{isShowAddModal && <Modal username={ username } taskId={ taskIdForHandle } handleHideModal={ handleHideAddModal } modalTitle="Add task" targetURL={ baseURL+"add.php" } formPurpose="Add"/>}
					{isShowEditModal && <Modal username={ username } taskId={ taskIdForHandle } handleHideModal={ handleHideEditModal } modalTitle="Edit task" targetURL={ baseURL+"edit.php" } formPurpose="Edit"/>}
					{isReady && <TaskTable taskData={ taskData } callbackForEditButton={ handleShowEditModal }></TaskTable>}
					{isReady && <Pagination numberOfPage={ numberOfPage } page={ props.page } tasksPerPage={ props.tasksPerPage }/>}
				</div>
			</Container>
		</div>
	);
}

export default Todo;