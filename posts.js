// posts.js — ChristoBuzz Posts System (Phase 3)

const posts = []; // demo storage (later Supabase)

function addPost(text) {
  if (!text.trim()) return;

  const post = {
    id: Date.now(),
    user: "Demo User",
    content: text,
    time: new Date().toLocaleTimeString()
  };

  posts.unshift(post);
  renderPosts();
}

function renderPosts() {
  const feed = document.getElementById("feedPosts");
  if (!feed) return;

  feed.innerHTML = "";

  posts.forEach(post => {
    const div = document.createElement("div");
    div.className = "feed-post";
    div.innerHTML = `
      <strong>${post.user}</strong>
      <p>${post.content}</p>
      <small>${post.time}</small>
    `;
    feed.appendChild(div);
  });
}
