import { supabase } from './supabase.js'

export async function loadPosts() {
  const app = document.getElementById('app')
  app.innerHTML = `<h2>Home</h2><div id="posts"></div>`

  const { data } = await supabase.from('posts').select('*').order('created_at',{ascending:false})

  data?.forEach(p => {
    app.innerHTML += `<div class="post">${p.content}</div>`
  })
}
