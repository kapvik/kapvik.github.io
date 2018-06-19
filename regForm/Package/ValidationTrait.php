<?php
trait ValidationTrait {
   private $response = ['success' => false, 'msg' => "Invalid parameters"];
   public $rules = [
   'name' => [
      'msg' => 'Invalid name format! The name can contain letters only. The minimum length of your first name must be 3 characters.', 
      'type' => 'regex',
      'pattern' => '/^[a-zA-Z\-]{3,}$/'],
   'lastName' => [
      'msg' => 'Invalid name format! The name can contain letters only. The minimum length of your last name must be 3 characters.', 
      'type' => 'regex',
      'pattern' => '/^[a-zA-Z\-]{3,}$/'],
   'email' => [
      'msg' => 'Please enter a valid email address.', 
      'type' => 'email'],
   'ticketType' => ['msg' => 'Please choose a ticket type.'],
   'captcha' => ['type' => 'match', 'msg' => 'Please enter the verification phrase exactly as shown.']
     ];

 public function validation($userData) {

  if($userData && is_array($userData)) {

   $this->response['errors'] = $this->validate($userData, $this->rules);
   $this->response['success'] = empty($this->response['errors']);
    if($this->response['success']){
        $this->response['msg'] = 'Congratulations, you have successfully completed the order of the ' . $userData['ticketType'] . ' ticket';
     } else {
      $this->response['msg'] = 'Invalid data';
    }
  }
  return $this->response;
 } 

 private function validate($data, $validation) {
  $error = [];

  foreach ($validation as $key => $value) {
   $valid = isset($data[$key]);

   // check if this data value is set = valid
  
   if ($valid) {
  
    // if it's valid, then base on type, check what kind of validation it's required
  
    if (isset($value['type'])) {
     $function = "validate_{$value['type']}";
  
     // find the method with equal name of the type validation
  
     if (method_exists($this, $function)) {
  
      // call the method for that type
  
      $valid = $this->$function($data[$key], $value);
     }
    }
   }
   if (!$valid) {
   
    // the data isn't sets, so display an error for each value
   
    $error[$key] = isset($value['msg']) ? $value['msg'] : 'Please enter a value';
   }
  }
  return $error;
 } 
 
 // validate some data in array by pattern
 
 private function validate_regex($item, $value) {
  $pattern = isset($value['pattern']) ? $value['pattern'] : '/.*/';
  return preg_match($pattern, $item);
 }

 // validate email
 
 private function validate_email($item, $value) {
  return filter_var($item, FILTER_VALIDATE_EMAIL) !== false;
 }

 // Validate ticket type
 private function validate_match($item, $value) {
  $hash_item = sha1($item);
  return $_COOKIE['captcha'] === $hash_item;
 }
}