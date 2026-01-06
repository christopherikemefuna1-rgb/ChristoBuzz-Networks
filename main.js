// Navigation
const buttons = document.querySelectorAll(".bottom-nav button");
const views = document.querySelectorAll(".view");

buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    buttons.forEach(b => b.classList.remove("active"));
    views.forEach(v => v.classList.remove("active"));

    btn.classList.add("active");
    document.getElementById(btn.dataset.view).classList.add("active");
  });
});
