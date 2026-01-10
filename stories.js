import { supabase } from './supabase.js';

export async function loadStories(container) {
  container.innerHTML = '<h2>Stories</h2><div class="stories"></div>';
  const storyContainer = container.querySelector('.stories');

  const { data, error } = await supabase.from('stories').select('*');
  if (error) return storyContainer.innerHTML += `<p>Error loading stories</p>`;

  data?.forEach(story => {
    storyContainer.innerHTML += `
      <div class="story">
        <img src="${story.image || 'https://via.placeholder.com/70'}" alt="story">
        <small>${story.username || 'User'}</small>
      </div>
    `;
  });
}
