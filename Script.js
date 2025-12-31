import { supabase } from "./supabase.js";
import "./posts.js";

/* AUTH */

window.signup = async function () {
  const email = emailInput();
  const password = passwordInput();

  const { error } = await supabase.auth.signUp({ email, password });
  if (error) alert(error.message);
  else alert("Signup successful");
};

window.login = async function () {
  const email = emailInput();
  const password = passwordInput();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) alert(error.message);
  else loadPosts();
};

function emailInput() {
  return document.getElementById("email").value;
}
function passwordInput() {
  return document.getElementById("password").value;
}
