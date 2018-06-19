<?php 
require_once('config.php');

$userData = $_POST;

switch ($saving_type) {
    case 'file_log':
        $file = new FileLogger;
        $file->log($userData);
        break;

    case 'db_log':
        $mysql = new MySQL(DB_HOST, DB_USER, DB_PW, DB_NAME);
        $mysql->insert($userData);
        break;
	
    case 'xml_log':
        $xmllog = new XmlLogger;
        $xmllog->addNewUser($userData);
        break;
}