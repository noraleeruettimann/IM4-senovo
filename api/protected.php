<?php
header('Content-Type: application/json; charset=utf-8');

// Einfaches Beispiel (fester Wert):
$retirementDate = new DateTime("2026-01-01");
$today = new DateTime();

$interval = $today->diff($retirementDate);
$daysBefore = (int)$interval->format("%r%a");

$headline = $daysBefore >= 0
    ? "Noch $daysBefore Tage bis zu deiner Pensionierung."
    : "Du bist seit " . abs($daysBefore) . " Tagen pensioniert 🎉";

echo json_encode([
    "status" => "success",
    "daysBefore" => $daysBefore,
    "headline" => $headline
]);
