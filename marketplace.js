import { supabase } from './supabase.js';

export async function loadMarketplace(container) {
  container.innerHTML = '<h2>Marketplace</h2>';
  
  const { data, error } = await supabase.from('marketplace').select('*');
  if (error) return container.innerHTML += `<p>Error loading marketplace</p>`;

  data?.forEach(item => {
    container.innerHTML += `
      <div class="product">
        <img src="${item.image || 'https://via.placeholder.com/150'}">
        <p>${item.name || 'Product Name'}</p>
        <b>₦${item.price || '0'}</b>
      </div>
    `;
  });
}
