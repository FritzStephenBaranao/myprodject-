// ---------- USER "DATABASE" HELPERS (localStorage) ----------
function getUsers() {
  return JSON.parse(localStorage.getItem("pulsetrack_users") || "[]");
}

function saveUsers(users) {
  localStorage.setItem("pulsetrack_users", JSON.stringify(users));
}

// ---------- LOGIN ----------
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const alertBox = document.getElementById("alertBox");

    const users = getUsers();
    const match = users.find(u => u.username === username && u.password === password);

    if (match) {
      localStorage.setItem("pulsetrack_loggedIn", "true");
      localStorage.setItem("pulsetrack_username", match.username);
      localStorage.setItem("pulsetrack_fullname", match.fullName);
      window.location.href = "dashboard.html";
    } else {
      alertBox.textContent = "Invalid username or password. Don't have an account? Sign up first.";
      alertBox.classList.remove("d-none");
    }
  });
}

// ---------- SIGN UP ----------
const signupForm = document.getElementById("signupForm");
if (signupForm) {
  signupForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const fullName = document.getElementById("fullName").value.trim();
    const newUsername = document.getElementById("newUsername").value.trim();
    const newPassword = document.getElementById("newPassword").value.trim();
    const confirmPassword = document.getElementById("confirmPassword").value.trim();
    const alertBox = document.getElementById("signupAlert");

    const users = getUsers();

    if (newPassword !== confirmPassword) {
      showSignupAlert(alertBox, "Passwords do not match.", "danger");
      return;
    }

    if (users.some(u => u.username === newUsername)) {
      showSignupAlert(alertBox, "Username already taken. Choose another.", "danger");
      return;
    }

    users.push({ fullName, username: newUsername, password: newPassword });
    saveUsers(users);

    showSignupAlert(alertBox, "Account created! Redirecting to login...", "success");

    setTimeout(() => {
      window.location.href = "login.html";
    }, 1200);
  });
}

function showSignupAlert(box, message, type) {
  box.textContent = message;
  box.className = "alert alert-" + type;
  box.classList.remove("d-none");
}