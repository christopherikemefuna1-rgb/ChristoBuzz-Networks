import { authInit } from './supabase.js';
import { loadPosts, addPost } from './posts.js';
import { loadStories, addStory } from './stories.js';
import { loadReels } from './reels.js';
import { loadMessages } from './messages.js';
import { loadMarketplace } from './marketplace.js';
import { loadProfile } from './profile.js';
import { loadMusic } from './music.js';
import { loadNotifications } from './notifications.js';

// Show Auth or Home
export async function showAuth() {
  document.getElementById('app').innerHTML = `
    <div class="auth-container">
      <div class="auth-card">
        <h2>Sign Up / Login</h2>
        <input type="email" id="email" placeholder="Email">
        <input type="password" id="password" placeholder="Password">
        <button id="signupBtn">Sign Up</button>
        <button id="loginBtn">Login</button>
      </div>
    </div>
  `;
  authInit();
}

export async function showHome() {
  document.getElementById('app').innerHTML = `
    <div id="storyRow"></div>
    <div id="feedPosts"></div>
  `;
  loadStories();
  loadPosts();
  loadNotifications();
}

// Navigation buttons
document.getElementById('homeBtn').onclick = showHome;
document.getElementById('reelsBtn').onclick = () => loadReels();
document.getElementById('marketBtn').onclick = () => loadMarketplace();
document.getElementById('profileBtn').onclick = () => loadProfile();
document.getElementById('messagesBtn').onclick = () => loadMessages();

// Start
showAuth();
