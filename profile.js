import { supabase } from "./supabase.js";

const profileView = document.getElementById("profileView");
const profileUsername = document.getElementById("profileUsername");
const profileBio = document.getElementById("profileBio");
const profileAvatar = document.getElementById("profileAvatar");

export async function loadProfile() {
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) return;

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (error || !data) {
    // create profile if missing
    await supabase.from("profiles").insert({
      id: user.id,
      username: user.user_metadata.username || "user",
      bio: "",
      avatar_url: ""
    });
    return loadProfile();
  }

  profileUsername.textContent = data.username;
  profileBio.textContent = data.bio || "No bio yet";
  profileAvatar.src =
    data.avatar_url ||
    "https://api.dicebear.com/7.x/identicon/svg?seed=bee";
    }
