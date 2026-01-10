import { showAuth, showHome } from './app.js';
import { supabase } from './supabase.js';

document.addEventListener('DOMContentLoaded', async () => {
  const { data: { user } } = await supabase.auth.getUser();
  if (user) {
    showHome();
  } else {
    showAuth();
  }
});
