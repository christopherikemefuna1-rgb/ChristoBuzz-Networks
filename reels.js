import { supabase } from './supabase.js';

export async function loadReels(container) {
  container.innerHTML = '<h2>Reels</h2>';
  // Placeholder reels
  const { data, error } = await supabase.from('reels').select('*');
  if (error) return container.innerHTML += `<p>Error loading reels</p>`;

  data?.forEach(reel => {
    container.innerHTML += `
      <div class="reel">
        <video src="${reel.video}" controls></video>
      </div>
    `;
  });
}
