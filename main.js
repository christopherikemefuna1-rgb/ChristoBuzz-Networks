import { supabase } from './supabase.js';

import { loadPosts } from './post.js';
import { loadStories } from './stories.js';
import { loadReels } from './reels.js';
import { loadMessages } from './messages.js';
import { loadMarketplace } from './marketplace.js';
import { loadMusic } from './music.js';
import { loadProfile } from './profile.js';
import { loadNotifications } from './notifications.js';
import { loadAds } from './adnetwork.js';
import { loadAI } from './ai.js';

const app = document.getElementById('app');
const nav = document.getElementById('nav');

/* -------------------------
   PAGE REGISTRY
-------------------------- */
const pages = {
  posts: loadPosts,
  stories: loadStories,
  reels: loadReels,
  messages: loadMessages,
  marketplace: loadMarketplace,
  music: loadMusic,
  profile: loadProfile,
  notifications: loadNotifications
};

/* -------------------------
   DEMO MODE (NO LOGIN)
-------------------------- */
function showDemo() {
  nav.style.display = 'flex';
  app.innerHTML = '';
  loadPosts(app);
}

/* -------------------------
   AUTH CHECK (OPTIONAL)
-------------------------- */
async function checkAuth() {
  const { data } = await supabase.auth.getUser();
  if (data?.user) {
    showDemo();
  } else {
    showDemo(); // TikTok-style demo access
  }
}

/* -------------------------
   NAVIGATION
-------------------------- */
nav.querySelectorAll('button').forEach(btn => {
  btn.addEventListener('click', () => {
    const page = btn.dataset.page;
    app.innerHTML = '';

    if (pages[page]) {
      pages[page](app);
    }
  });
});

/* -------------------------
   START APP
-------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  checkAuth();
});
