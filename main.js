import { supabase } from "./supabase.js";
import { loadPosts, createPost } from "./posts.js";
import { loadMessages } from "./messages.js";

/* VIEWS */
const loginView = document.getElementById("loginView");
const signupView = document.getElementById("signupView");
const feedView = document.getElementById("feedView");
const profileView = document.getElementById("profileView");
const bottomNav = document.getElementById("bottomNav");

/* BUTTONS */
const goSignup = document.getElementById("goSignup");
const goLogin = document.getElementById("goLogin");
const loginBtn = document.getElementById("loginBtn");
const signupBtn = document.getElementById("signupBtn");
const postBtn = document.getElementById("postBtn");

/* NAV BUTTONS */
const homeBtn = document.getElementById("homeBtn");
const messagesBtn = document.getElementById("messagesBtn");
const marketplaceBtn = document.getElementById("marketplaceBtn");
const profileBtn = document.getElementById("profileBtn");

/* PROFILE ELEMENTS */
const profilePic = document.getElementById("profilePic");
const profileUsername = document.getElementById("profileUsername");
const profileBio = document.getElementById("profileBio");
const postsCount = document.getElementById("postsCount");
const followersCount = document.getElementById("followersCount");
const followingCount = document.getElementById("followingCount");
const profilePosts = document.getElementById("profilePosts");

/* HELPERS */
function show(view){
  loginView.classList.add("hidden");
  signupView.classList.add("hidden");
  feedView.classList.add("hidden");
  profileView.classList.add("hidden");
  view.classList.remove("hidden");
}

function showAuth(){ bottomNav.classList.add("hidden"); }
function showApp(){ bottomNav.classList.remove("hidden"); }

/* INITIAL STATE */
show(loginView);
showAuth();

/* NAVIGATION */
goSignup.addEventListener("click",(e)=>{ e.preventDefault(); show(signupView); });
goLogin.addEventListener("click",(e)=>{ e.preventDefault(); show(loginView); });

/* LOGIN */
loginBtn.addEventListener("click", async ()=>{
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if(error) return alert(error.message);
  show(feedView); showApp();
  await loadPosts();
  loadUserProfile();
});

/* SIGNUP */
signupBtn.addEventListener("click", async ()=>{
  const username = document.getElementById("signupUsername").value;
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;
  const file = document.getElementById("signupProfilePic").files[0];
  const { data, error } = await supabase.auth.signUp({ email, password });
  if(error) return alert(error.message);

  let picUrl = "";
  if(file){
    const { data: fileData, error: fileError } = await supabase.storage.from("profile-pics").upload(`${data.user.id}.png`, file);
    if(fileError) console.error(fileError);
    picUrl = supabase.storage.from("profile-pics").getPublicUrl(`${data.user.id}.png`).publicURL;
  }

  await supabase.from("profiles").insert([{ id:data.user.id, username, profile_pic:picUrl, bio:"", likes:[], dislikes:[] }]);
  show(feedView); showApp();
  await loadPosts();
  loadUserProfile();
});

/* POST */
postBtn.addEventListener("click", async ()=>{
  const content = document.getElementById("newPostContent").value;
  if(!content) return alert("Post cannot be empty!");
  await createPost(content);
  document.getElementById("newPostContent").value="";
  await loadPosts();
});

/* NAV */
homeBtn.addEventListener("click", ()=>{ show(feedView); });
messagesBtn.addEventListener("click", ()=>{ loadMessages(); show(feedView); });
marketplaceBtn.addEventListener("click", ()=>{ alert("Marketplace coming soon"); });
profileBtn.addEventListener("click", ()=>{ loadUserProfile(); show(profileView); });

/* LOAD USER PROFILE */
async function loadUserProfile(){
  const user = supabase.auth.user();
  if(!user) return;

  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single();
  if(!profile) return;

  profilePic.src = profile.profile_pic || "https://via.placeholder.com/70";
  profileUsername.innerText = profile.username;
  profileBio.innerText = profile.bio || "This is your bio.";
  postsCount.innerText = profile.posts_count || 0;
  followersCount.innerText = profile.followers_count || 0;
  followingCount.innerText = profile.following_count || 0;

  // Load posts (optional: filter by user)
  profilePosts.innerHTML = "";
  const { data: posts } = await supabase.from("posts").select("*").eq("user_id", user.id);
  posts.forEach(post=>{
    const div = document.createElement("div");
    div.className="post";
    div.innerHTML = `<strong>${profile.username}</strong><p>${post.content}</p>`;
    profilePosts.appendChild(div);
  });
  }
