import { supabase } from './supabase.js'

export async function loadReels() {
  const app = document.getElementById('app')
  app.innerHTML = `<h2>Reels</h2>`

  const { data } = await supabase.from('reels').select('*')

  data?.forEach(r => {
    app.innerHTML += `
      <video src="${r.url}" controls autoplay muted></video>
    `
  })
}
