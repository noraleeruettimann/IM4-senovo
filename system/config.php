<?php
// config.php
$host = 'lg2lh4.myd.infomaniak.com';
$db   = 'lg2lh4_im4cv';  // Change to your DB name
$user = 'lg2lh4_im4cv';   // Change to your DB user
$pass = 'h74!2o.dD&?8gMZ';       // Change to your DB pass if needed

try {
    $dsn = "mysql:host=$host;dbname=$db;charset=utf8mb4";
    $pdo = new PDO($dsn, $user, $pass);
    // Optional: Set error mode
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (Exception $e) {
    echo "Database connection error: " . $e->getMessage();
    exit;
}
?>