<?php

header('Access-Control-Allow-Origin: http://localhost:3000');
include '../db.php';

if (isset($_POST['submit'])) {
	$task_name = htmlspecialchars($_POST['task']);
	$username = htmlspecialchars($_POST['username']);
	$formFrom = htmlspecialchars($_POST['formFrom']);
	$sql_query = "insert into tasks (task, username) values ('$task_name', '$username')";
	$is_add_success = $db->query($sql_query);
	if ($is_add_success) {
		header('location: ' .$formFrom);
	}
}