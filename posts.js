import { supabase } from './supabase.js';

// Create a post
window.sendPost = async () => {
    const content = document.getElementById('post-content').value;
    if(!content) return;

    const user = supabase.auth.user();
    if(!user) return alert('Login required');

    const { error } = await supabase.from('posts').insert([
        { user_id: user.id, content, type: 'text', created_at: new Date() }
    ]);
    if(error) return console.error(error);

    const div = document.createElement('div');
    div.className = 'post';
    div.innerText = content;
    document.getElementById('feed-posts').prepend(div);
    document.getElementById('post-content').value='';
};
