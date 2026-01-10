import { supabase } from './supabase.js';

export async function loadNotifications() {
  const { data } = await supabase.from('notifications').select('*').order('created_at', { ascending: false });
  data?.forEach(n => {
    console.log('Notification:', n.message);
    // Can be upgraded to show UI toast later
  });
}
