<?php

header('Access-Control-Allow-Origin: http://localhost:3000');
include 'db.php';

if(isset($_POST['submit'])) {
	$id = (int) htmlspecialchars($_POST['id']);
	$new_task_name = htmlspecialchars($_POST['task']);
	$sql_query = "update tasks set task = '$new_task_name' where id = '$id'";
	$is_update_success = $db->query($sql_query);
	if ($is_update_success) {
		header('location: http://localhost:3000');
	}
}