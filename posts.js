import { supabase } from './supabase.js';

export async function loadPosts() {
  const container = document.getElementById('feedPosts');
  container.innerHTML = '';

  const { data } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false });

  data?.forEach(p => {
    container.innerHTML += `
      <div class="post">
        <b>${p.username}</b>
        <p>${p.content}</p>
      </div>
    `;
  });
}

export async function addPost() {
  const text = newPostText.value;
  const { data:{ user } } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from('profiles')
    .select('username')
    .eq('id', user.id)
    .single();

  await supabase.from('posts').insert({
    user_id: user.id,
    username: profile.username,
    content: text
  });

  newPostText.value = '';
  loadPosts();
    }
