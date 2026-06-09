<?php
// Ice & Instinct inquiry handler. Receives the Inquire form (POST) and emails
// it to the studio, so a lead lands WITHOUT depending on the visitor's mail
// client (the old mailto silently failed on desktop webmail). Returns JSON;
// the front end falls back to a mailto link if this ever responds not-ok.

header('Content-Type: application/json; charset=utf-8');

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
  http_response_code(405);
  echo json_encode(['ok' => false, 'error' => 'method']);
  exit;
}

$name    = trim($_POST['name'] ?? '');
$email   = trim($_POST['email'] ?? '');
$message = trim($_POST['message'] ?? '');
$honey   = trim($_POST['company'] ?? ''); // honeypot - real users never fill it

// Bot caught in the honeypot: pretend success, send nothing.
if ($honey !== '') {
  echo json_encode(['ok' => true]);
  exit;
}

if ($name === '' || $message === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
  http_response_code(422);
  echo json_encode(['ok' => false, 'error' => 'invalid']);
  exit;
}

// Keep header-bound values free of injected newlines.
$safeName = preg_replace('/[\r\n]+/', ' ', $name);

$to      = 'alchemyandice.nyc@gmail.com';
$subject = 'Ice & Instinct inquiry - ' . $safeName;
$body    = "New inquiry from iceinstinct.com\n\n"
         . "Name:  " . $name . "\n"
         . "Email: " . $email . "\n\n"
         . $message . "\n";

$headers  = "From: Ice & Instinct <no-reply@iceinstinct.com>\r\n";
$headers .= 'Reply-To: ' . $email . "\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

$ok = @mail($to, $subject, $body, $headers);

if (!$ok) {
  http_response_code(502);
  echo json_encode(['ok' => false, 'error' => 'send']);
  exit;
}

echo json_encode(['ok' => true]);
