import { supabase } from './Supabase.js';

// Signup function
window.signup = async () => {
  const username = document.getElementById('username').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  if(!username || !email || !password){
    document.getElementById('msg').innerText = 'Please fill all fields.';
    return;
  }

  const { data, error } = await supabase.auth.signUp({ email, password });
  if(error){
    document.getElementById('msg').innerText = error.message;
    return;
  }

  // Insert into profiles table
  await supabase.from('profiles').insert([{ id: data.user.id, username, hobbies: [] }]);
  document.getElementById('msg').innerText = 'Signup successful! Please log in.';
};

// Login function
window.login = async () => {
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  if(!email || !password){
    document.getElementById('msg').innerText = 'Please enter email and password.';
    return;
  }

  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if(error){
    document.getElementById('msg').innerText = error.message;
    return;
  }

  document.getElementById('msg').innerText = 'Login successful!';
  // TODO: Redirect to feed page or show main app
};
