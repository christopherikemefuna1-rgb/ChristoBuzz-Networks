import { supabase } from "./supabase.js";

window.createPost = async function () {
  const content = document.getElementById("postContent").value;
  const media = document.getElementById("postMedia").value;

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return alert("Login required");

  const { error } = await supabase.from("posts").insert({
    user_id: user.id,
    content,
    media_url: media
  });

  if (!error) loadPosts();
};

window.loadPosts = async function () {
  const { data } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });

  const feed = document.getElementById("feed");
  feed.innerHTML = "";

  data?.forEach(post => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `
      <p>${post.content || ""}</p>
      ${post.media_url ? `<img src="${post.media_url}" style="width:100%;border-radius:6px">` : ""}
    `;
    feed.appendChild(div);
  });
};
