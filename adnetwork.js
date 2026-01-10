import { supabase } from './supabase.js';

export async function loadAds(container) {
  container.innerHTML = '<h2>Ads</h2>';

  const { data, error } = await supabase.from('ads').select('*');
  if (error) return container.innerHTML += '<p>Error loading ads.</p>';

  data?.forEach(ad => {
    container.innerHTML += `
      <div class="ad">
        <a href="${ad.link || '#'}" target="_blank">
          <img src="${ad.image || 'https://via.placeholder.com/300'}">
          <p>${ad.title || 'Ad title'}</p>
        </a>
      </div>
    `;
  });
}
