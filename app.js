import { loadPosts } from './posts.js';
import { loadStories } from './stories.js';
import { loadReels } from './reels.js';
import { loadMessages } from './messages.js';
import { loadMarketplace } from './marketplace.js';
import { loadProfile } from './profile.js';
import { loadMusic } from './music.js';
import { loadAds } from './adnetwork.js';
import { loadAI } from './ai.js';
import { loadNotifications } from './notifications.js';
import { supabase } from './supabase.js';

const navButtons = ['posts', 'stories', 'reels', 'chat', 'marketplace', 'profile', 'music', 'ads', 'ai', 'notifications'];

export function showAuth() {
  const app = document.getElementById('app');
  document.querySelector('nav').style.display = 'none';
  
  app.innerHTML = `
    <div class="auth">
      <h2>ChristoBuzz</h2>
      <p>Login or sign up to continue</p>
      <input type="email" id="email" placeholder="Email">
      <input type="password" id="password" placeholder="Password">
      <button id="login-btn">Login</button>
      <button id="signup-btn">Sign Up</button>
    </div>
  `;

  document.getElementById('login-btn').addEventListener('click', async () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert(error.message);
    else showHome();
  });

  document.getElementById('signup-btn').addEventListener('click', async () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) alert(error.message);
    else showHome();
  });
}

export function showHome() {
  const app = document.getElementById('app');
  app.innerHTML = `<h1>ChristoBuzz</h1><div id="content"></div>`;
  const content = document.getElementById('content');
  document.querySelector('nav').style.display = 'flex';

  // Load default module
  loadPosts(content);

  // Attach nav button listeners
  navButtons.forEach(btn => {
    const navBtn = document.querySelector(`nav button[data-target="${btn}"]`);
    if (!navBtn) return;
    navBtn.addEventListener('click', () => {
      document.querySelectorAll('nav button').forEach(b => b.classList.remove('active'));
      navBtn.classList.add('active');
      content.innerHTML = '';

      switch(btn) {
        case 'posts': loadPosts(content); break;
        case 'stories': loadStories(content); break;
        case 'reels': loadReels(content); break;
        case 'chat': loadMessages(content); break;
        case 'marketplace': loadMarketplace(content); break;
        case 'profile': loadProfile(content); break;
        case 'music': loadMusic(content); break;
        case 'ads': loadAds(content); break;
        case 'ai': loadAI(content); break;
        case 'notifications': loadNotifications(content); break;
      }
    });
  });
}
