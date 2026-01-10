import { supabase } from './supabase.js';

export async function loadMessages() {
  const app = document.getElementById('app');
  app.innerHTML = '<h2>Messages</h2>';

  const { data } = await supabase.from('messages').select('*').order('created_at', { ascending: false });

  data?.forEach(m => {
    app.innerHTML += `<div class="message them">${m.text}</div>`;
  });
}
