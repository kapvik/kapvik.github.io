<?php
class XmlLogger {

use ValidationTrait;

private $content = '<?xml version="1.0" encoding="UTF-8"?><users></users>';
private $uniqueEmail = false;
private $xml, $xmlFileName;

public function __construct() {
  $this->xmlFileName = 'registration_'.date('d_m_Y').'.xml';
    if(file_exists($this->xmlFileName)){
      $this->xml = simplexml_load_file($this->xmlFileName);
    } else {
      $this->xml = new SimpleXMLElement($this->content);
    }
  }
 //
 // check if email is already has in the file
 //
private function uniqueEmail($userEmail) {
  if(file_exists($this->xmlFileName)) {
    if (!strpos(file_get_contents($this->xmlFileName), $userEmail)) {
      $this->uniqueEmail = true;
    }
    return false;
  } else {
    $this->uniqueEmail = true;
  }
}
//
// Save valid user data to xml file
// 
public function addNewUser($userData) {
  if ($userData && is_array($userData)) {
    //
    // Validate the user data
    // 
    $this->validation($userData);
      if($this->response['success']) {
        //
        // Validate user email for uniqueness
        // 
        $this->uniqueEmail($userData['email']);
        if($this->uniqueEmail) {
          $user = $this->xml->addChild('user');

          foreach ($userData as $key => $value) {
            if($key == 'submit' || $key == 'captcha') continue;
            $user->addChild($key, $value);
          }

          $this->xml->asXML($this->xmlFileName);
          $this->response['success'] = true;
         } else {
          $this->response['errors']['email'] = 'This Email has already been used, please enter a different email';
          $this->response['success'] = false;
        }
      }
      die(json_encode($this->response));
    }
  }
}