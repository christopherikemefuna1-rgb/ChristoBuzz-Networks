import { supabase } from './supabase.js';

export async function loadReels() {
  const app = document.getElementById('app');
  app.innerHTML = '<div id="reelsContainer"></div>';
  const { data } = await supabase.from('reels').select('*').order('created_at', { ascending: false });

  const container = document.getElementById('reelsContainer');
  data?.forEach(r => {
    container.innerHTML += `
      <div class="reel">
        <video src="${r.url}" controls autoplay muted></video>
      </div>
    `;
  });
}
