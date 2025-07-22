<?php
// Only allow POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo "<div class='error'>Only POST method is allowed.</div>";
    exit;
}

// Sanitize input
$name = isset($_POST['name']) ? strip_tags(trim($_POST['name'])) : '';
$email = isset($_POST['email']) ? filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL) : '';
$comments = isset($_POST['comments']) ? strip_tags(trim($_POST['comments'])) : '';

// Basic validation
if (empty($name) || empty($email) || empty($comments)) {
    echo "<div class='error'>Please fill in all fields.</div>";
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo "<div class='error'>Invalid email address.</div>";
    exit;
}

// Send email
$to = "sdhundhalva@gmail.com"; // Replace with your email
$subject = "Portfolio: Contact Form Submission";
$body = "Name: $name\nEmail: $email\n\nMessage:\n$comments";
$headers = "From: $name <$email>\r\nReply-To: $email\r\n";

if (mail($to, $subject, $body, $headers)) {
    echo "<div class='success'>Your message has been sent successfully.</div>";
} else {
    echo "<div class='error'>Something went wrong. Please try again later.</div>";
}
