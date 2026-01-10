import { supabase } from './supabase.js';

export async function loadMessages(container) {
  container.innerHTML = '<h2>Chat</h2><div class="chat"></div>';
  const chatContainer = container.querySelector('.chat');

  const { data, error } = await supabase.from('messages').select('*').order('created_at', { ascending: true });
  if (error) return chatContainer.innerHTML += `<p>Error loading messages</p>`;

  data?.forEach(msg => {
    chatContainer.innerHTML += `
      <div class="message ${msg.user === 'me' ? 'me' : 'other'}">
        ${msg.text}
      </div>
    `;
  });
}
