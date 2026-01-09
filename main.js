import { supabase } from './supabase.js';
import { loadPosts, addPost } from './posts.js';
import { loadStories } from './stories.js';
import { loadReels } from './reels.js';
import { loadMessages } from './messages.js';
import { loadMarketplace } from './marketplace.js';
import { loadProfile } from './profile.js';
import { loadMusic } from './music.js';
import './adnetwork.js';
import './ai.js';

window.addPost = addPost;

window.showPage = (page) => {
  if (page === 'feed') loadPosts();
  if (page === 'stories') loadStories();
  if (page === 'reels') loadReels();
  if (page === 'messages') loadMessages();
  if (page === 'marketplace') loadMarketplace();
  if (page === 'profile') loadProfile();
  if (page === 'music') loadMusic();
};

document.getElementById('signupBtn').onclick = async () => {
  const email = email.value;
  const password = password.value;
  const username = usernameInput.value;

  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) return alert(error.message);

  await supabase.from('profiles').insert({
    id: data.user.id,
    username
  });

  alert('Signed up');
};

document.getElementById('loginBtn').onclick = async () => {
  const { error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value
  });
  if (error) alert(error.message);
  else loadPosts();
};
