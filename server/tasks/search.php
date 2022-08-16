<?php

header('Access-Control-Allow-Origin: http://localhost:3000');
include '../db.php';

$pattern = "xx";
$sql_query = "select * from tasks where task like '%{$pattern}%'";
