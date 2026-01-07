let posts = [];

function addPost(text, file) {
  const post = {
    text,
    media: file ? URL.createObjectURL(file) : null,
    type: file?.type.startsWith("video") ? "video" : "image",
    time: Date.now()
  };

  posts.unshift(post);
  renderPosts();
}

function renderPosts() {
  const postsDiv = document.getElementById("posts");
  const videoFeed = document.getElementById("videoFeed");

  postsDiv.innerHTML = "";
  videoFeed.innerHTML = "";

  posts.forEach(post => {
    const div = document.createElement("div");
    div.className = "post";

    if (post.text) {
      const p = document.createElement("p");
      p.textContent = post.text;
      div.appendChild(p);
    }

    if (post.media) {
      if (post.type === "video") {
        const video = document.createElement("video");
        video.src = post.media;
        video.controls = true;
        video.loop = true;
        div.appendChild(video);

        const reel = video.cloneNode(true);
        reel.controls = true;
        videoFeed.appendChild(reel);
      } else {
        const img = document.createElement("img");
        img.src = post.media;
        div.appendChild(img);
      }
    }

    postsDiv.appendChild(div);
  });
}
