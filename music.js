import { supabase } from './supabase.js';

export async function loadMusic() {
  const app = document.getElementById('app');

  app.innerHTML = `
    <div class="music-page">
      <div class="music-header">
        <h2>🎵 Music</h2>
        <label class="upload-btn">
          + Upload
          <input type="file" id="musicFile" accept="audio/*" hidden />
        </label>
      </div>

      <div id="musicList" class="music-list"></div>
    </div>
  `;

  document.getElementById('musicFile').onchange = uploadMusic;

  const { data, error } = await supabase
    .from('music')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    alert(error.message);
    return;
  }

  const list = document.getElementById('musicList');

  data.forEach(m => {
    list.innerHTML += `
      <div class="music-card">
        <img src="${m.cover_url || 'https://via.placeholder.com/80'}" />
        <div class="music-info">
          <b>${m.title}</b>
          <small>${m.artist || 'Unknown artist'}</small>
          <audio controls src="${m.audio_url}"></audio>
        </div>
      </div>
    `;
  });
}

async function uploadMusic(e) {
  const file = e.target.files[0];
  if (!file) return;

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return alert('Login required');

  const fileName = `${user.id}-${Date.now()}-${file.name}`;

  // Upload audio
  const { data, error } = await supabase.storage
    .from('music')
    .upload(fileName, file);

  if (error) return alert(error.message);

  const audioUrl = supabase.storage
    .from('music')
    .getPublicUrl(fileName).data.publicUrl;

  const title = prompt('Song title');
  const artist = prompt('Artist name');

  await supabase.from('music').insert([{
    user_id: user.id,
    title,
    artist,
    audio_url: audioUrl
  }]);

  loadMusic();
}
