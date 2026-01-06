// Phase 1 SPA navigation and demo posts

const views = ["loginView","signupView","feedView","profileView","messagesView","marketplaceView"];
const bottomNav = document.getElementById("bottomNav");
const feedPosts = document.getElementById("feedPosts");
const myPosts = document.getElementById("myPosts");

function showView(viewId) {
  views.forEach(v => document.getElementById(v).classList.add("hidden"));
  document.getElementById(viewId).classList.remove("hidden");

  // update nav buttons
  document.querySelectorAll("#bottomNav button").forEach(btn => {
    btn.classList.remove("active");
    if(btn.dataset.view === viewId) btn.classList.add("active");
  });
}

// --- LOGIN/SIGNUP TOGGLE ---
document.getElementById("goSignup").addEventListener("click", e => {
  e.preventDefault();
  showView("signupView");
});

document.getElementById("goLogin").addEventListener("click", e => {
  e.preventDefault();
  showView("loginView");
});

// --- LOGIN/SIGNUP DEMO ---
document.getElementById("loginBtn").addEventListener("click", () => {
  showView("feedView");
  bottomNav.classList.remove("hidden");
});

document.getElementById("signupBtn").addEventListener("click", () => {
  showView("feedView");
  bottomNav.classList.remove("hidden");
});

// --- NAVIGATION ---
document.querySelectorAll("#bottomNav button").forEach(btn => {
  btn.addEventListener("click", () => showView(btn.dataset.view));
});

// --- POSTS ---
document.getElementById("addPostBtn").addEventListener("click", () => {
  const text = document.getElementById("newPostText").value.trim();
  if(text) {
    const postDiv = document.createElement("div");
    postDiv.className = "feed-post";
    postDiv.innerHTML = `<strong>You</strong><p>${text}</p>`;
    feedPosts.prepend(postDiv);
    
    // Also add to MyPosts
    const myPostDiv = postDiv.cloneNode(true);
    myPosts.prepend(myPostDiv);

    document.getElementById("newPostText").value = "";
  }
});

// --- PROFILE DEMO DATA ---
document.getElementById("profileUsername").innerText = "Demo User";
document.getElementById("profileBio").innerText = "Welcome to your profile 🐝";
document.getElementById("profileAvatar").src = "https://i.pravatar.cc/100";
