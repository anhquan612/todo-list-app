<?php

header('Access-Control-Allow-Origin: http://localhost:3000');
include 'db.php';

if (isset($_POST['submit'])) {
	$task_name = htmlspecialchars($_POST['task']);
	$sql_query = "insert into tasks (task) values ('$task_name')";
	$is_add_success = $db->query($sql_query);
	if ($is_add_success) {
		header('location: http://localhost:3000');
	}
}