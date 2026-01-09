import { supabase } from './supabase.js';
import { loadPosts, addPost } from './posts.js';
import { loadStories } from './stories.js';
import { loadReels } from './reels.js';
import { loadMessages } from './messages.js';
import { loadMarketplace } from './marketplace.js';
import { loadProfile } from './profile.js';
import { loadMusic } from './music.js';

// ================================
// AUTH STATE LISTENER
// ================================
supabase.auth.onAuthStateChange((event, session) => {
  const user = session?.user;
  if(user) {
    showHome();
  } else {
    showAuth();
  }
});

// Initial check
(async () => {
  const { data: { user } } = await supabase.auth.getUser();
  if(user) showHome();
  else showAuth();
})();

// ================================
// SHOW AUTH PAGE
// ================================
function showAuth() {
  document.getElementById('app').innerHTML = `
    <div class="auth-container">
      <div class="auth-card">
        <h2>ChristoBuzz</h2>
        <input type="email" id="email" placeholder="Email">
        <input type="password" id="password" placeholder="Password">
        <input type="text" id="username" placeholder="Username (signup only)">
        <button id="signupBtn">Sign Up</button>
        <button id="loginBtn">Login</button>
      </div>
    </div>
  `;

  // SIGNUP
  document.getElementById('signupBtn').onclick = async () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const username = document.getElementById('username').value;

    if(!email || !password || !username) return alert('Fill all fields');

    const { data, error } = await supabase.auth.signUp({ email, password });
    if(error) return alert(error.message);

    // Create profile with username
    await supabase.from('profiles').insert([{ id: data.user.id, username }]);

    alert('Signed up successfully. Please log in.');
  };

  // LOGIN
  document.getElementById('loginBtn').onclick = async () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if(error) return alert(error.message);

    alert('Logged in successfully');
  };
}

// ================================
// SHOW HOME PAGE
// ================================
function showHome() {
  const app = document.getElementById('app');
  app.innerHTML = `
    <header><h1>ChristoBuzz</h1></header>

    <div id="storyRow"></div>
    <div id="feedPosts"></div>

    <nav>
      <button id="homeBtn">🏠 Home</button>
      <button id="reelsBtn">🎥 Reels</button>
      <button id="messagesBtn">💬 Messages</button>
      <button id="marketBtn">🛒 Marketplace</button>
      <button id="profileBtn">👤 Profile</button>
    </nav>
  `;

  // Load initial content
  loadStories();
  loadPosts();

  // NAV BUTTONS
  document.getElementById('homeBtn').onclick = () => {
    loadStories();
    loadPosts();
  };

  document.getElementById('reelsBtn').onclick = loadReels;
  document.getElementById('messagesBtn').onclick = loadMessages;
  document.getElementById('marketBtn').onclick = loadMarketplace;
  document.getElementById('profileBtn').onclick = loadProfile;
}
