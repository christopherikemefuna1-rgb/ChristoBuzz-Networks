import { supabase } from './supabase.js';

export async function loadStories() {
  const container = document.getElementById('storyRow');
  container.innerHTML = '';

  const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
  const { data } = await supabase.from('stories').select('*').gte('created_at', since).order('created_at', { ascending: false });

  data.forEach(s => {
    container.innerHTML += `<div class="story"><img src="${s.image}" alt="${s.username}"><small>${s.username}</small></div>`;
  });
}

export async function addStory(imageUrl) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return alert('Login required');
  const { data: profile } = await supabase.from('profiles').select('username').eq('id', user.id).single();

  await supabase.from('stories').insert([{ user_id: user.id, username: profile.username, image: imageUrl }]);
}
