import { supabase } from './supabase.js'

export async function loadStories() {
  const app = document.getElementById('app')
  app.innerHTML = `<div class="stories"></div>` + app.innerHTML

  const { data } = await supabase.from('stories').select('*')

  data?.forEach(s => {
    document.querySelector('.stories').innerHTML += `
      <div class="story">${s.title}</div>
    `
  })
}
