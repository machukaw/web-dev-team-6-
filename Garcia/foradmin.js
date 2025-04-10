
  const correctUser = "admin";
  const correctPass = "admin123";
  const correctPin = "1234";

  function login() {
         // Dummy login
         window.location.href = "menu.html"; 
    const user = document.getElementById("username").value;
    const pass = document.getElementById("password").value;
    const pin = document.getElementById("pin").value;
    const error = document.getElementById("error");

    if (user === correctUser && pass === correctPass && pin === correctPin) {
      // Redirect to dashboard
      window.location.href = "formenu.html";
    } else {
      error.textContent = "Incorrect credentials or PIN.";
    }
    
  }
