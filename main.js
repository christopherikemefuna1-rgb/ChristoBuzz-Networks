// Navigation
const navButtons = document.querySelectorAll("nav button");
const pages = document.querySelectorAll(".page");

navButtons.forEach(btn => {
  btn.onclick = () => {
    navButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    pages.forEach(p => p.classList.remove("active"));
    document.getElementById(btn.dataset.page).classList.add("active");
  };
});

// Theme Toggle
const themeToggle = document.getElementById("themeToggle");

themeToggle.onclick = () => {
  document.body.classList.toggle("dark");
  themeToggle.textContent =
    document.body.classList.contains("dark") ? "Light" : "Dark";
};

// Posting
document.getElementById("postBtn").onclick = () => {
  const text = document.getElementById("postText").value.trim();
  const mediaInput = document.getElementById("postMedia");
  const file = mediaInput.files[0];

  if (!text && !file) return;

  addPost(text, file);

  document.getElementById("postText").value = "";
  mediaInput.value = "";
};
