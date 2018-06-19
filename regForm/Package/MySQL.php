<?php
class MySQL {
    use ValidationTrait;
    private $dbc, $query, $result;

    // Connect to the database

    public function __construct($server, $username, $password, $dbName) {
        $this->connect($server, $username, $password, $dbName);
        $this->query("CREATE DATABASE IF NOT EXISTS $dbName"); // Create DataBase
        $this->dbc->select_db($dbName);
        $this->createDbTable(); // Create Table registration_ticket
    }

    public function query($sql) {
        $this->result = $this->dbc->query($sql);
        return $this->result;
    }

    public function insert($userData) {

        // Validate the user data

        $this->validation($userData); 
        if ($this->response['success']) {

            // variables of user data

            $userName = $userData['name'];
            $userLastName = $userData['lastName'];
            $userEmail = $userData['email'];
            $userTicket = $userData['ticketType'];

            // check if email is already has in the DataBase

            if ($this->uniqueEmail($userEmail)) {
                $this->query = "INSERT INTO registration_ticket VALUES (0, '$userName', '$userLastName', '$userEmail', '$userTicket', NOW())";
                $this->query($this->query);
                $this->response['success'] = true;
            } else {
                $this->response['errors']['email'] = 'This Email has already been used, please enter a different email';
                $this->response['success'] = false;
            }
        }

        die(json_encode($this->response));
    }

    public function __destruct() {
        mysqli_close($this->dbc);
    }

    private function connect($server, $username, $password) {
        $this->dbc = new mysqli($server, $username, $password);
    }

    // check if email isn't already registered

    private function uniqueEmail($userEmail) {
        $this->query("SELECT * FROM registration_ticket WHERE email = '$userEmail'");
        $rows = $this->result->num_rows;
        $valid = $rows > 0 ? false : true;
        return $valid;
    }

    private function createDbTable() {
        $this->query = "CREATE TABLE IF NOT EXISTS `registration_ticket` (
   `user_id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `first_name` VARCHAR(30),
    `last_name` VARCHAR(30),
    `email` VARCHAR(60),
    `ticket_type` VARCHAR(30),
    `date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   )";
        $this->query($this->query);
    }
}
