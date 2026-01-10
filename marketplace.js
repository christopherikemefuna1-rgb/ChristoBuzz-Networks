import { supabase } from './supabase.js';

export async function loadMarketplace() {
  const app = document.getElementById('app');
  app.innerHTML = '<h2>Marketplace</h2>';

  const { data } = await supabase.from('marketplace').select('*');

  data?.forEach(p => {
    app.innerHTML += `
      <div class="product">
        <img src="${p.image}">
        <p>${p.name}</p>
        <b>₦${p.price}</b>
      </div>
    `;
  });
}
