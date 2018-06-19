
<?php
class FileLogger {
    
    use ValidationTrait;
    
    private $f; // opened file
    private $fname; // file name
    private $lines; // file data
    
    public function __construct() {
        $this->fname = "registration_" . date('d_m_Y') . ".txt";
        $this->f = fopen($this->fname, 'a+');
    }

    public function __destruct() {
        if (!$this->response['errors']) {
            fwrite($this->f, $this->lines);
            fclose($this->f);
        }
    }

    public function log($userData) {
        if ($userData && is_array($userData)) {
            //
            // Validate the user data
            //
            $this->validation($userData);
            if ($this->response['success']) {
                //
                // variables of user data
                //
                $userName = $userData['name'];
                $userLastName = $userData['lastName'];
                $userEmail = $userData['email'];
                $userTicket = $userData['ticketType'];
                //
                // check if email is already has in the file
                //
                if (!strpos(file_get_contents($this->fname) , $userEmail)) {
                    $this->lines = "$userName " . "$userLastName " . "$userEmail " . "$userTicket \n\r";
                    $this->response['success'] = true;
                } else {
                    $this->response['errors']['email'] = 'This Email has already been used, please enter a different email';
                    $this->response['success'] = false;
                }
            }
        }

        die(json_encode($this->response));
    }
}
