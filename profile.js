import { supabase } from './supabase.js';

export async function loadProfile(currentUserId) {
  const app = document.getElementById('app');
  const { data: profileData } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', currentUserId)
    .single();

  app.innerHTML = `
    <div style="text-align:center; padding:15px;">
      <img src="${profileData?.avatar || 'default-avatar.png'}" style="width:100px; height:100px; border-radius:50%; object-fit:cover;">
      <h2>${profileData?.username || 'User'}</h2>
      <p>${profileData?.bio || 'No bio yet'}</p>
    </div>

    <div style="display:flex; justify-content:space-around; padding:10px; border-top:1px solid #ddd; border-bottom:1px solid #ddd;">
      <button onclick="showMyPosts()">📝 My Posts</button>
      <button onclick="showReels()">🎬 Reels</button>
      <button onclick="showMusic()">🎵 Music</button>
      <button onclick="showFriends()">👥 Friends</button>
    </div>

    <div id="profileContent" style="padding:10px;"></div>
  `;

  // Example placeholders
  window.showMyPosts = () => {
    document.getElementById('profileContent').innerHTML = '<p>My Posts will appear here.</p>';
  };
  window.showReels = () => {
    document.getElementById('profileContent').innerHTML = '<p>Reels will appear here.</p>';
  };
  window.showMusic = () => {
    document.getElementById('profileContent').innerHTML = '<p>Music section here.</p>';
  };
  window.showFriends = () => {
    document.getElementById('profileContent').innerHTML = '<p>Friends list here.</p>';
  };
}
