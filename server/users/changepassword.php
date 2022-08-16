<?php

header('Access-Control-Allow-Origin: http://localhost:3000');
include '../db.php';

if (isset($_POST)) {
	$username = htmlspecialchars($_POST['username']);
	$current_password = htmlspecialchars($_POST['currentPassword']);
	$new_password = htmlspecialchars($_POST['newPassword']);
	$sql_check_query = "select * from users where username='$username' and password='$current_password'";
	$result = $db->query($sql_check_query);
	
	if (mysqli_num_rows($result) != 0) {
		$sql_change_password_query = "update users set password = '$new_password' where username = '$username'";
		$is_update_success = $db->query($sql_change_password_query);
		if ($is_update_success) {
			$response['isSuccess'] = true;
		}
		else {
			$response['isSuccess'] = false;
		}
	}
	else {
		$response['isSuccess'] = false;
	}
	echo json_encode($response);
	exit;
}