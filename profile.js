import { supabase } from './supabase.js';

export async function loadProfile() {
  const app = document.getElementById('app');
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    app.innerHTML = '<p>Please log in</p>';
    return;
  }

  // get profile info
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  // get user posts
  const { data: posts } = await supabase
    .from('posts')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  app.innerHTML = `
    <div class="profile">

      <!-- COVER PHOTO -->
      <div class="profile-cover">
        <img src="${profile.cover || 'https://placehold.co/900x300'}">
      </div>

      <!-- PROFILE HEADER -->
      <div class="profile-header">
        <img class="profile-avatar"
          src="${profile.avatar || 'https://placehold.co/150'}">

        <div class="profile-info">
          <h2>${profile.username}</h2>
          <p class="profile-bio">${profile.bio || 'No bio yet'}</p>

          <div class="profile-stats">
            <span><b>${posts?.length || 0}</b> Posts</span>
            <span><b>${profile.followers || 0}</b> Followers</span>
            <span><b>${profile.following || 0}</b> Following</span>
          </div>

          <button class="edit-btn">Edit Profile</button>
        </div>
      </div>

      <!-- POSTS GRID (Instagram style) -->
      <div class="profile-posts">
        ${
          posts?.length
            ? posts.map(p => `
              <div class="profile-post">
                ${p.image ? `<img src="${p.image}">` : `<p>${p.content}</p>`}
              </div>
            `).join('')
            : '<p class="no-posts">No posts yet</p>'
        }
      </div>

    </div>
  `;
            }
