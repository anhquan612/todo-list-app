import './App.css';
import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Todo from './components/Todo';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';

function App() {
	
	var page = 1;
	var tasksPerPage = 5;
	const params = new URLSearchParams(window.location.search);
	if (params.has('page')) {
		page = params.get('page');
	}
	if (params.has('tasksPerPage')) {
		tasksPerPage = params.get('tasksPerPage');
	}
	
	return (
		<Routes>
			<Route path="/" element={ <Navigate to={'/todos'}/> }/>
			<Route path="/todos" element={ <Todo page = { page } tasksPerPage = { tasksPerPage }/> }/>
			<Route path="/signup" element={ <SignUp/> }/>
			<Route path="/signin" element={ <SignIn/> }/>
		</Routes>
	);
}

export default App;