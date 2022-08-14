<?php

$hostname = "localhost";
$username = "root";
$password = "Root@mysql1";
$database = "todo";

$db = new Mysqli;
$db->connect($hostname, $username, $password, $database);

if (!$db) {
    die(mysqli_connect_error());
}