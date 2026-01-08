import { supabase, authInit } from './supabase.js';
import { loadPosts, addPost } from './posts.js';
import { loadStories } from './stories.js';
import { loadReels } from './reels.js';
import { loadMessages } from './messages.js';
import { loadMarketplace } from './marketplace.js';
import { loadProfile } from './profile.js';
import { loadMusic } from './music.js';
import { loadAds } from './adnetwork.js';
import { initAI } from './ai.js';

// Initialize authentication buttons
authInit();

// Navigation
const views = ['feedView','reelsView','messagesView','marketplaceView','profileView','musicView'];
const navButtons = document.querySelectorAll('#bottomNav button');

navButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const view = btn.dataset.view;
    views.forEach(v => document.getElementById(v).classList.add('hidden'));
    document.getElementById(view).classList.remove('hidden');

    navButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    switch(view){
      case 'feedView': loadStories(); loadPosts(); break;
      case 'reelsView': loadReels(); break;
      case 'messagesView': loadMessages(); break;
      case 'marketplaceView': loadMarketplace(); break;
      case 'profileView': loadProfile(); break;
      case 'musicView': loadMusic(); break;
    }
  });
});

// Show initial view
document.getElementById('feedView').classList.remove('hidden');
document.querySelector('#bottomNav').classList.remove('hidden');
document.querySelector('#bottomNav button[data-view="feedView"]').classList.add('active');

// Post button
document.getElementById('addPostBtn')?.addEventListener('click', addPost);
