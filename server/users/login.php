<?php

header('Access-Control-Allow-Origin: http://localhost:3000');
include '../db.php';

if (isset($_POST)) {
	$username = htmlspecialchars($_POST['username']);
	$password = htmlspecialchars($_POST['password']);
	$sql_query = "select * from users where username='$username' and password='$password'";
	$result = $db->query($sql_query);
	if (mysqli_num_rows($result) != 0) {
		$res_username = $result->fetch_array()[0];
		$response["isSuccess"] = true;
		$response["username"] = $res_username;
	}
	else {
		$response["isSuccess"] = false;
	}
	echo json_encode($response);
	exit;
}