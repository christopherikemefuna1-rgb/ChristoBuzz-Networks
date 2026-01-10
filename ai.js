import { supabase } from './supabase.js';

export async function loadAI(container) {
  container.innerHTML = '<h2>AI Assistant</h2>';
  
  // Placeholder for AI interface
  container.innerHTML += `
    <div class="ai-chat">
      <p>Type your question to the AI assistant:</p>
      <input type="text" id="aiInput" placeholder="Ask me anything...">
      <button id="aiSend">Send</button>
      <div id="aiResponses"></div>
    </div>
  `;

  const input = container.querySelector('#aiInput');
  const sendBtn = container.querySelector('#aiSend');
  const responses = container.querySelector('#aiResponses');

  sendBtn.addEventListener('click', () => {
    const question = input.value.trim();
    if (!question) return;
    responses.innerHTML += `<p><b>You:</b> ${question}</p>`;
    responses.innerHTML += `<p><b>AI:</b> Placeholder response for "${question}"</p>`;
    input.value = '';
  });
}
