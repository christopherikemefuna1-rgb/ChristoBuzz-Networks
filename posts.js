import { supabase } from './supabase.js';

export async function loadPosts() {
  const container = document.getElementById('feedPosts');
  container.innerHTML = '';

  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    alert(error.message);
    return;
  }

  data.forEach(p => {
    container.innerHTML += `
      <div class="feed-post">
        <strong>${p.username}</strong>
        <p>${p.content}</p>
        ${p.image ? `<img src="${p.image}" />` : ''}
      </div>
    `;
  });
}

export async function addPost() {
  const content = document.getElementById('newPostText').value;
  if (!content) return alert('Enter text');

  // get logged-in user
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return alert('You must be logged in');

  // get profile (username)
  const { data: profile } = await supabase
    .from('profiles')
    .select('username')
    .eq('id', user.id)
    .single();

  if (!profile) return alert('Profile not found');

  // insert post
  const { error } = await supabase.from('posts').insert([{
    user_id: user.id,
    username: profile.username,
    content: content
  }]);

  if (error) {
    alert(error.message);
    return;
  }

  document.getElementById('newPostText').value = '';
  loadPosts();
}
