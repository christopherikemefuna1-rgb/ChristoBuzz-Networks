import { supabase } from './supabase.js';

export async function loadMusic(container) {
  container.innerHTML = '<h2>Music</h2>';

  const { data, error } = await supabase.from('music').select('*');
  if (error) return container.innerHTML += '<p>Error loading music.</p>';

  data?.forEach(track => {
    container.innerHTML += `
      <div class="music-track">
        <p>${track.title || 'Track title'}</p>
        <audio controls src="${track.url || ''}"></audio>
      </div>
    `;
  });
}
