import { supabase } from './supabase.js';

export async function loadNotifications(container) {
  container.innerHTML = '<h2>Notifications</h2>';

  const { data, error } = await supabase.from('notifications').select('*').order('created_at', { ascending: false });
  if (error) return container.innerHTML += '<p>Error loading notifications.</p>';

  data?.forEach(note => {
    container.innerHTML += `
      <div class="notification">
        <p>${note.message || 'Notification message'}</p>
        <small>${note.created_at || 'Time'}</small>
      </div>
    `;
  });
}
