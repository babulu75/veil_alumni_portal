function showModal1() {
  document.getElementById("overlay").style.display = "block";
  document.getElementById("signin-modal").style.display = "block";
}

function closePopup1() {
  document.getElementById("overlay").style.display = "none";
  document.getElementById("signin-modal").style.display = "none";
}

function showModal2() {
  document.getElementById("overlay").style.display = "block";
  document.getElementById("signup-modal").style.display = "block";
}

function closePopup2() {
  document.getElementById("overlay").style.display = "none";
  document.getElementById("signup-modal").style.display = "none";
}

function validatePassword() {
  let pass = document.getElementById("signup-password").value;
  let confirmPassword = document.getElementById("confirm-password").value;

  if (pass !== confirmPassword) {
    alert("Passwords do not match!");
    return false;
  }

  return true;
}

async function signup() {
  const full_name = document.getElementById("signup-name").value;
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;

  if (!validatePassword()) return;

  const response = await fetch('/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ full_name, email, password })
  });

  if (response.ok) {
    alert("Sign up successful");
    window.location.href = "index.html";
  } else {
    const errMsg = await response.text();
    alert("Signup failed: " + errMsg);
  }
}

async function signin() {
  const email = document.getElementById('signin-email').value;
  const password = document.getElementById('signin-password').value;

  const response = await fetch('/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  if (response.ok) {
    alert("Sign in successful");
    window.location.href = "dashboard.html";
  } else {
    const errMsg = await response.text();
    alert("Login failed: " + errMsg);
  }
}
