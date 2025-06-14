document.getElementById("registerForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const user_name = document.getElementById("user_name").value.trim();
  const pensdate = document.getElementById("pensdate").value;


  console.log("Pfad-Check startet...");

const response = await fetch("api/register.php", {
  // ...
});


  try {
    const response = await fetch("api/register.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        email,
        password,
        user_name,
        pensdate,
      }),
    });

    const result = await response.json();

    if (result.status === "success") {
      alert("Registrierung erfolgreich!");
      window.location.href = "login.html";
    } else {
      alert(result.message || "Registrierung fehlgeschlagen.");
    }
  } catch (error) {
    console.error("Fehler:", error);
    alert("Etwas ist schiefgelaufen.");
  }
});
