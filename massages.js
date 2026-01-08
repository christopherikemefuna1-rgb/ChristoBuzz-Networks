import { supabase } from './supabase.js';

export async function loadMessages(currentUserId, chatWithUserId) {
  const app = document.getElementById('app');
  app.innerHTML = `
    <h2>Messages</h2>
    <div id="messagesContainer" style="max-height:400px; overflow-y:auto; border:1px solid #ddd; padding:10px; margin-bottom:10px;"></div>
    <input type="text" id="messageInput" placeholder="Type a message..." style="width:70%; padding:8px;">
    <input type="file" id="fileInput" style="width:25%;">
    <button id="sendBtn" style="width:100%; margin-top:5px;">Send</button>
  `;

  const messagesContainer = document.getElementById('messagesContainer');

  // Load existing messages
  async function loadAllMessages() {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .or(`sender_id.eq.${currentUserId},receiver_id.eq.${currentUserId}`)
      .order('created_at', { ascending: true });

    if (error) {
      console.error(error);
      return;
    }

    messagesContainer.innerHTML = '';
    data?.forEach(m => {
      let content = '';
      if (m.type === 'text') content = `<p>${m.text}</p>`;
      if (m.type === 'image') content = `<img src="${m.url}" width="150" />`;
      if (m.type === 'video') content = `<video width="200" controls><source src="${m.url}" type="video/mp4"></video>`;
      if (m.type === 'link') content = `<a href="${m.url}" target="_blank">${m.url}</a>`;
      if (m.type === 'sticker') content = `<img src="${m.url}" width="80" />`;

      const align = m.sender_id === currentUserId ? 'right' : 'left';
      messagesContainer.innerHTML += `<div style="text-align:${align}; margin:5px 0;">${content}</div>`;
    });

    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  await loadAllMessages();

  // Send message
  document.getElementById('sendBtn').onclick = async () => {
    const textInput = document.getElementById('messageInput');
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    let messageType = 'text';
    let fileUrl = '';

    if (file) {
      const fileExt = file.name.split('.').pop();
      messageType = ['png','jpg','jpeg','gif'].includes(fileExt.toLowerCase()) ? 'image' : 'video';
      const { data: uploadData, error: uploadError } = await supabase
        .storage
        .from('messages-files')
        .upload(`${Date.now()}_${file.name}`, file);

      if (uploadError) {
        alert('Upload failed: ' + uploadError.message);
        return;
      }

      fileUrl = `https://aiwigwfsajdnwfpcziqf.supabase.co/storage/v1/object/public/messages-files/${uploadData.path}`;
    }

    const message = file ? { type: messageType, url: fileUrl } : { type: 'text', text: textInput.value };

    const { error } = await supabase.from('messages').insert([{
      sender_id: currentUserId,
      receiver_id: chatWithUserId,
      ...message,
      created_at: new Date()
    }]);

    if (error) {
      alert('Error sending message: ' + error.message);
      return;
    }

    textInput.value = '';
    fileInput.value = '';
    await loadAllMessages();
  };
      }
