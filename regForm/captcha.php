<?php
// session_start();

header("Content-type: image/png");

define('CAPTCHA_NUMCHARS', 6); // number of characters in pass-phrase
define('CAPTCHA_WIDTH', 120); // width of image
define('CAPTCHA_HEIGHT', 38); // height of image

// Generate the random pass-phrase
$pass_phrase = [];
for ($i = 0; $i < CAPTCHA_NUMCHARS; $i++) { 
	$pass_phrase[$i] = chr(rand(97, 122));
}

// Store the encrypted pass-phrase in a session variable
// $_SESSION['pass_phrase'] = md5($pass_phrase);
// session_destroy();
// 


// Store the encrypted pass-phrase in a cookie variable
$cookie = sha1(implode($pass_phrase));
$cookietime = time() + 120;
setcookie("captcha", $cookie, $cookietime);

// Font settings
$font_type ='./Courier New Bold.ttf';
$font_size = 20;

// Create the image
$img = imagecreatetruecolor(CAPTCHA_WIDTH, CAPTCHA_HEIGHT);

// Create some colors
$bg_color = imagecolorallocate($img, 255, 255, 255); // white
$text_color = imagecolorallocate($img, 0, 0, 0); // black
$graphic_color = imagecolorallocate($img, 64, 64, 64); // dark gray

// Fill the background
imagefilledrectangle($img, 0, 0, CAPTCHA_WIDTH, CAPTCHA_HEIGHT, $bg_color);

// Draw some random lines
for ($i = 0; $i < 5; $i++) { 
	imageline($img, 0, rand() % CAPTCHA_HEIGHT, CAPTCHA_WIDTH, rand() % CAPTCHA_HEIGHT, $graphic_color);
}

// Draw some random dots
for ($i = 0; $i < 50; $i++) { 
	imagesetpixel($img, rand() % CAPTCHA_WIDTH, rand() % CAPTCHA_HEIGHT, $graphic_color);
}

// Draw the pass-phrase string
for ($i = 0; $i < CAPTCHA_NUMCHARS; $i++) {
	
	$angle = rand(0, 35);
	$x = 15 * $i + 10;
	$y = CAPTCHA_HEIGHT - 9;

	imagettftext($img, $font_size, $angle, $x, $y, $text_color, $font_type, $pass_phrase[$i]);
}



imagepng($img);
imagedestroy($img);