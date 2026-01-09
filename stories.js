import { supabase } from './supabase.js';

export async function loadStories() {
  const row = document.getElementById('storyRow');
  row.innerHTML = '';

  const since = new Date(Date.now() - 86400000).toISOString();

  const { data } = await supabase
    .from('stories')
    .select('*')
    .gte('created_at', since);

  data?.forEach(s => {
    row.innerHTML += `
      <div class="story">
        <img src="${s.image}">
        <small>${s.username}</small>
      </div>
    `;
  });
}
