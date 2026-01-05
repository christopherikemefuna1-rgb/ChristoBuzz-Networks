/* ===============================
   ChristoBuzz SPA Controller
   main.js
================================ */

// Views
const loginView = document.getElementById("loginView");
const signupView = document.getElementById("signupView");
const feedView = document.getElementById("feedView");
const bottomNav = document.getElementById("bottomNav");

// Buttons / Links
const goSignup = document.getElementById("goSignup");
const goLogin = document.getElementById("goLogin");
const loginBtn = document.getElementById("loginBtn");
const signupBtn = document.getElementById("signupBtn");

// Helpers
function show(view) {
  loginView.classList.add("hidden");
  signupView.classList.add("hidden");
  feedView.classList.add("hidden");

  view.classList.remove("hidden");
}

function showAuth() {
  bottomNav.classList.add("hidden");
}

function showApp() {
  bottomNav.classList.remove("hidden");
}

// Initial state
show(loginView);
showAuth();

/* ===============================
   Navigation Logic
================================ */

// Switch to signup
goSignup.addEventListener("click", (e) => {
  e.preventDefault();
  show(signupView);
});

// Switch to login
goLogin.addEventListener("click", (e) => {
  e.preventDefault();
  show(loginView);
});

// Fake login (UI only for now)
loginBtn.addEventListener("click", () => {
  show(feedView);
  showApp();
});

// Fake signup (UI only for now)
signupBtn.addEventListener("click", () => {
  show(feedView);
  showApp();
});

/* ===============================
   Bottom Nav (UI only)
================================ */

const navButtons = document.querySelectorAll("nav button");

navButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    navButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    // For now, everything routes to feed
    show(feedView);
  });
});
