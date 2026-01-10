import { supabase } from './supabase.js';

export async function loadMusic() {
  const app = document.getElementById('app');
  app.innerHTML = '<h2>Music</h2>';

  const { data } = await supabase.from('music').select('*');

  data?.forEach(m => {
    app.innerHTML += `
      <div>
        <p>${m.title}</p>
        <audio controls src="${m.url}"></audio>
      </div>
    `;
  });
}
