<?php

header('Access-Control-Allow-Origin: http://localhost:3000');
include '../db.php';

if (isset($_POST)) {
	$username = htmlspecialchars($_POST['username']);
	$password = htmlspecialchars($_POST['password']);
	$sql_query = "insert into users values ('$username', '$password')";
	$response["isSuccess"] = false;
	try {
		$is_register_success = $db->query($sql_query);
		if ($is_register_success) {
			$response["isSuccess"] = true;
		}
	}
	catch(Exception $e) {
		$response["isSuccess"] = false;
	}
	echo json_encode($response);
	exit;
}