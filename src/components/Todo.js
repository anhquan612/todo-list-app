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
	const [filterPatternS, setFilterPatternS] = useState(props.filterPattern);
	const [numberOfPage, setNumberOfPage] = useState(0);
	const [isReady, setIsReady] = useState(false);
	const [isShowAddModal, setIsShowAddModal] = useState(false);
	const [isShowEditModal, setIsShowEditModal] = useState(false);
	const navigate = useNavigate();
	const baseURL = "http://localhost:8000/tasks/";
	
	function getData(user, filterPattern, page) {
		if (page === undefined) {
			page = props.page;
		}
		setIsReady(false);
		const url = baseURL + `/get.php/?username=${user}&filterPattern=${filterPattern}&page=${page}&tasksPerPage=${props.tasksPerPage}`;
		console.log(url);
		fetch(url)
			.then((res) => res.json())
				.then((actualData) => { console.log(actualData); setTaskData(actualData['taskData']); setNumberOfPage(actualData['numberOfPage']) })
					.then(() => { setIsReady(true) });
	}
	
	function changePassword() {
		navigate('/changepassword');
	}
	
	function logOut() {
		localStorage.removeItem('inSession');
		navigate('/signin');
	}
	
	function handleFilter(e) {
		const newPattern = e.target.value;
		setFilterPatternS(newPattern);
		getData(username, newPattern, 1);
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
				getData(inSession, filterPatternS);
			}
		}
		action();
	}, []);
	
	return (
		<div className="todos">
			<Header>Todo App</Header>
			<Container>
				<div className="col-md-10 col-md-offset-1">
					<h5 className="mt-3">Hi, { username }</h5>
					<Button customClasses="btn-outline-success" callbackFunc={ handleShowAddModal }>Add task</Button>
					<Button customClasses="btn-outline-dark float-end last-btn" callbackFunc={ logOut }>Sign out</Button>
					<Button customClasses="btn-outline-warning float-end " callbackFunc = { changePassword }>Change password</Button>
					<hr/><br/>
					<div className="mb-4">
						<input type="text" name="filterPattern" value={ filterPatternS } onChange= { handleFilter } className="border border-secondary rounded task-filter" placeholder="Filter by task name"/>
					</div>
					{isShowAddModal && <Modal username={ username } taskId={ taskIdForHandle } handleHideModal={ handleHideAddModal } modalTitle="Add task" targetURL={ baseURL+"add.php" } formPurpose="Add"/>}
					{isShowEditModal && <Modal username={ username } taskId={ taskIdForHandle } handleHideModal={ handleHideEditModal } modalTitle="Edit task" targetURL={ baseURL+"edit.php" } formPurpose="Edit"/>}
					{isReady && <TaskTable taskData={ taskData } callbackForEditButton={ handleShowEditModal }></TaskTable>}
					{isReady && <Pagination filterPattern={ filterPatternS } numberOfPage={ numberOfPage } page={ props.page } tasksPerPage={ props.tasksPerPage }/>}
				</div>
			</Container>
		</div>
	);
}

export default Todo;