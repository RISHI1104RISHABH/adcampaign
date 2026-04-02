const API = "http://localhost:5000";

function register() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!name || !email || !password) {
    alert("Fill all fields");
    return;
  }

  fetch(API + "/register", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ name, email, password })
  })
  .then(async res => {
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    alert(data.message);
    window.location.href = "login.html";
  })
  .catch(err => alert(err.message));
}

function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  fetch(API + "/login", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ email, password })
  })
  .then(async res => {
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    localStorage.setItem("user", JSON.stringify(data));
    window.location.href = "index.html";
  })
  .catch(err => alert(err.message));
}