import { supabase } from './supabase.js';

export async function loadProfile(container) {
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  if (userError || !user) return container.innerHTML = '<p>Please log in to view profile.</p>';

  const { data, error } = await supabase.from('profiles').select('*').eq('id', user.id).single();
  if (error) return container.innerHTML = '<p>Error loading profile.</p>';

  container.innerHTML = `
    <div class="profile">
      <div class="profile-cover">
        <img src="${data.cover || 'https://via.placeholder.com/430x220'}">
      </div>
      <div class="profile-header">
        <img class="profile-avatar" src="${data.avatar || 'https://via.placeholder.com/120'}">
        <div class="profile-info">
          <h2>${data.username || 'Username'}</h2>
          <p class="profile-bio">${data.bio || 'Bio placeholder'}</p>
          <div class="profile-stats">
            <span><b>${data.posts || 0}</b> Posts</span>
            <span><b>${data.followers || 0}</b> Followers</span>
            <span><b>${data.following || 0}</b> Following</span>
          </div>
        </div>
      </div>
      <div class="profile-posts">
        <!-- Placeholder posts, later load real posts -->
      </div>
    </div>
  `;
}
