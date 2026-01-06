// ===============================
// ChristoBuzz SPA + Auth
// ===============================

import { supabase } from "./supabase.js";

// Views
const loginView = document.getElementById("loginView");
const signupView = document.getElementById("signupView");
const feedView = document.getElementById("feedView");
const bottomNav = document.getElementById("bottomNav");

// Inputs
const loginEmail = document.getElementById("loginEmail");
const loginPassword = document.getElementById("loginPassword");
const signupUsername = document.getElementById("signupUsername");
const signupEmail = document.getElementById("signupEmail");
const signupPassword = document.getElementById("signupPassword");

// Buttons
const goSignup = document.getElementById("goSignup");
const goLogin = document.getElementById("goLogin");
const loginBtn = document.getElementById("loginBtn");
const signupBtn = document.getElementById("signupBtn");

// ===============================
// Helpers
// ===============================

function show(view) {
  [loginView, signupView, feedView].forEach(v =>
    v.classList.add("hidden")
  );
  view.classList.remove("hidden");
}

function showApp() {
  bottomNav.classList.remove("hidden");
}

function showAuth() {
  bottomNav.classList.add("hidden");
}

// ===============================
// Initial Load
// ===============================

show(loginView);
showAuth();

// ===============================
// Navigation
// ===============================

goSignup.onclick = e => {
  e.preventDefault();
  show(signupView);
};

goLogin.onclick = e => {
  e.preventDefault();
  show(loginView);
};

// ===============================
// LOGIN
// ===============================

loginBtn.onclick = async () => {
  const { error } = await supabase.auth.signInWithPassword({
    email: loginEmail.value,
    password: loginPassword.value
  });

  if (error) {
    alert(error.message);
    return;
  }

  show(feedView);
  showApp();
};

// ===============================
// SIGNUP
// ===============================

signupBtn.onclick = async () => {
  const { error } = await supabase.auth.signUp({
    email: signupEmail.value,
    password: signupPassword.value,
    options: {
      data: {
        username: signupUsername.value
      }
    }
  });

  if (error) {
    alert(error.message);
    return;
  }

  alert("Account created. You can now log in.");
  show(loginView);
};

// ===============================
// Session Persistence
// ===============================

supabase.auth.onAuthStateChange((event, session) => {
  if (session) {
    show(feedView);
    showApp();
  } else {
    show(loginView);
    showAuth();
  }
});
