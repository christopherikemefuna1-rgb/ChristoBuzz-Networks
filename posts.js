import { supabase } from './supabase.js';

export async function loadPosts(container) {
  container.innerHTML = '<h2>Posts</h2>';
  // Fetch posts from Supabase (placeholder)
  const { data, error } = await supabase.from('posts').select('*').order('created_at', { ascending: false });
  if (error) return container.innerHTML += `<p>Error loading posts</p>`;
  data?.forEach(post => {
    container.innerHTML += `
      <div class="post">
        <p>${post.content || 'Post content placeholder'}</p>
        ${post.image ? `<img src="${post.image}">` : ''}
      </div>
    `;
  });
                                    }
