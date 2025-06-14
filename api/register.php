<?php
session_start();
header('Content-Type: application/json');

require_once '../system/config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email     = trim($_POST['email'] ?? '');
    $password  = trim($_POST['password'] ?? '');
    $user_name = trim($_POST['user_name'] ?? '');
    $pensdate  = trim($_POST['pensdate'] ?? '');

    if (!$email || !$password || !$user_name || !$pensdate) {
        echo json_encode(["status" => "error", "message" => "Alle Felder sind erforderlich."]);
        exit;
    }

    $stmt = $pdo->prepare("SELECT id FROM users WHERE email = :email");
    $stmt->execute([':email' => $email]);

    if ($stmt->fetch()) {
        echo json_encode(["status" => "error", "message" => "Email wird bereits verwendet."]);
        exit;
    }

    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    $insert = $pdo->prepare("INSERT INTO users (email, password, name, pensdate) VALUES (:email, :pass, :name, :pensdate)");
    $insert->execute([
        ':email'    => $email,
        ':pass'     => $hashedPassword,
        ':name'     => $user_name,
        ':pensdate' => $pensdate
    ]);

    echo json_encode(["status" => "success"]);
} else {
    echo json_encode(["status" => "error", "message" => "Ungültige Anfrage"]);
}
