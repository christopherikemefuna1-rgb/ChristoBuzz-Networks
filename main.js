import { supabase } from './supabase.js';

// Sign up function
window.signup = async () => {
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const { data, error } = await supabase.auth.signUp({ email, password });
    if(error){
        document.getElementById('msg').innerText = error.message;
        return;
    }

    // Insert into profiles table
    await supabase.from('profiles').insert([{ id: data.user.id, username, hobbies: [] }]);
    document.getElementById('msg').innerText = 'Signup successful!';
    showPostSection();
};

// Login function
window.login = async () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if(error){
        document.getElementById('msg').innerText = error.message;
        return;
    }
    document.getElementById('msg').innerText = 'Login successful!';
    showPostSection();
};

// Show post section after login/signup
function showPostSection(){
    document.getElementById('auth-section').style.display='none';
    document.getElementById('post-section').style.display='block';
      }
