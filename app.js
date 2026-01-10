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

const navButtons = ['posts','stories','reels','chat','marketplace','profile','music','ads','ai','notifications'];

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

export function showGuestHome() {
  const app = document.getElementById('app');
  const guestViews = Number(localStorage.getItem('guestViews') || 0);

  if (guestViews >= 5) {
    showAuth(); // limit reached
    return;
  }

  localStorage.setItem('guestViews', guestViews + 1);

  app.innerHTML = `<h1>ChristoBuzz (Guest Mode)</h1><div id="content"></div>`;
  document.querySelector('nav').style.display = 'none';

  loadPosts(document.getElementById('content'));
}

export function showHome() {
  const app = document.getElementById('app');
  const content = document.createElement('div');
  content.id = 'content';
  app.innerHTML = `<h1>ChristoBuzz</h1>`;
  app.appendChild(content);

  const nav = document.querySelector('nav');
  nav.style.display = 'flex';

  loadPosts(content); // default view

  navButtons.forEach(btn => {
    document.querySelector(`nav button[data-target="${btn}"]`)?.addEventListener('click', () => {
      content.innerHTML = '';
      switch(btn){
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
