// ===== VIEWS =====
const loginView = document.getElementById("loginView");
const signupView = document.getElementById("signupView");
const feedView = document.getElementById("feedView");
const bottomNav = document.getElementById("bottomNav");

// Buttons
const goSignup = document.getElementById("goSignup");
const goLogin = document.getElementById("goLogin");
const loginBtn = document.getElementById("loginBtn");
const signupBtn = document.getElementById("signupBtn");

// Helper
function show(view) {
  [loginView, signupView, feedView].forEach(v => v.classList.add("hidden"));
  view.classList.remove("hidden");
}

// Initial
show(loginView);
bottomNav.classList.add("hidden");

// Auth switching
goSignup.onclick = () => show(signupView);
goLogin.onclick = () => show(loginView);

// TEMP auth (Supabase comes later)
loginBtn.onclick = () => {
  show(feedView);
  bottomNav.classList.remove("hidden");
};

signupBtn.onclick = () => {
  show(feedView);
  bottomNav.classList.remove("hidden");
};

// Bottom nav logic
document.querySelectorAll("nav button").forEach(btn => {
  btn.onclick = () => {
    document.querySelectorAll("nav button")
      .forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
  };
});
