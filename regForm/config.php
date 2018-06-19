<?php
// Define database connection constants
	define('DB_HOST', 'localhost');
	define('DB_USER', 'root');
	define('DB_PW', '');
	define('DB_NAME', 'registration_base');


// Define saving type
$saving_type = 'db_log'; // 'file_log' || 'db_log' || 'xml_log'

spl_autoload_register(function ($classname) {
	require_once(__DIR__ . "/Package/$classname.php");
});