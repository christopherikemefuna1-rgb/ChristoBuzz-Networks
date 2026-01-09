import { supabase } from './supabase.js';

let activeChatId = null;

/* ======================
   GET CURRENT USER
====================== */
async function getUser() {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

/* ======================
   OPEN CHAT
====================== */
export async function openChat(chatId) {
  activeChatId = chatId;
  await loadMessages();
  listenForMessages();
}

/* ======================
   LOAD MESSAGES
====================== */
export async function loadMessages() {
  if (!activeChatId) return;

  const box = document.getElementById('messagesBox');
  if (!box) return;

  box.innerHTML = '';

  const { data } = await supabase
    .from('messages')
    .select('*')
    .eq('chat_id', activeChatId)
    .order('created_at', { ascending: true });

  data?.forEach(m => {
    let body = '';

    if (m.media_type === 'image') {
      body = `<img src="${m.media_url}" class="msg-img">`;
    } else if (m.media_type === 'video') {
      body = `<video src="${m.media_url}" controls class="msg-video"></video>`;
    } else if (m.media_type === 'audio') {
      body = `<audio src="${m.media_url}" controls></audio>`;
    } else {
      body = `<p>${m.text}</p>`;
    }

    box.innerHTML += `
      <div class="message">
        ${body}
      </div>
    `;
  });

  box.scrollTop = box.scrollHeight;
}

/* ======================
   SEND TEXT MESSAGE
====================== */
export async function sendTextMessage(text) {
  if (!text || !activeChatId) return;

  const user = await getUser();
  if (!user) return alert('Login required');

  await supabase.from('messages').insert([{
    chat_id: activeChatId,
    sender_id: user.id,
    text: text,
    media_type: 'text'
  }]);
}

/* ======================
   SEND MEDIA MESSAGE
====================== */
export async function sendMediaMessage(url, type) {
  if (!url || !activeChatId) return;

  const user = await getUser();
  if (!user) return alert('Login required');

  await supabase.from('messages').insert([{
    chat_id: activeChatId,
    sender_id: user.id,
    media_url: url,
    media_type: type
  }]);
}

/* ======================
   REALTIME LISTENER
====================== */
function listenForMessages() {
  supabase
    .channel('messages-channel')
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'messages' },
      payload => {
        if (payload.new.chat_id === activeChatId) {
          loadMessages();
        }
      }
    )
    .subscribe();
}
