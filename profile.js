import { supabase } from './supabase.js';

export async function loadProfile() {
  const app = document.getElementById('app');
  const { data:{ user } } = await supabase.auth.getUser();
  if(!user) return alert('Login required');

  const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single();

  app.innerHTML = `
    <div class="profile">
      <div class="profile-cover">
        <img src="${data.cover || 'cover.jpg'}">
      </div>
      <div class="profile-header">
        <img class="profile-avatar" src="${data.avatar || 'avatar.jpg'}">
        <div class="profile-info">
          <h2>${data.username}</h2>
          <p class="profile-bio">${data.bio || 'Bio text'}</p>
          <div class="profile-stats">
            <span><b>0</b> Posts</span>
            <span><b>0</b> Followers</span>
            <span><b>0</b> Following</span>
          </div>
        </div>
      </div>
    </div>
  `;
}
