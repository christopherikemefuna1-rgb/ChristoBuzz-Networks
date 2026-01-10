import { supabase } from './supabase.js';

export async function loadPosts() {
  const container = document.getElementById('feedPosts');
  container.innerHTML = '';
  const { data } = await supabase.from('posts').select('*').order('created_at', { ascending: false });
  data?.forEach(p => {
    container.innerHTML += `
      <div class="post">
        <b>${p.username}</b>
        <p>${p.content}</p>
        ${p.image ? `<img src="${p.image}" />` : ''}
      </div>
    `;
  });
}

export async function addPost(content, image) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return alert('Login required');
  const { data: profile } = await supabase.from('profiles').select('username').eq('id', user.id).single();

  await supabase.from('posts').insert([{ username: profile.username, content, image }]);
  loadPosts();
                                                                                  }
