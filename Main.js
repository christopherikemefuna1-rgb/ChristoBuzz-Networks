import { supabase } from './supabase.js';

// Admin credentials
const adminUser = "CRISTOKING";
const adminPass = "2580";

// Sign up function
window.signup = async () => {
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const { data, error } = await supabase.auth.signUp({ email, password });
    if(error) {
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

    const { error, data } = await supabase.auth.signInWithPassword({ email, password });
    if(error) {
        document.getElementById('msg').innerText = error.message;
        return;
    }
    document.getElementById('msg').innerText = 'Login successful!';
    showPostSection();
};

// Admin login
window.adminLogin = () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    if(username === adminUser && password === adminPass){
        alert("Admin logged in!");
    } else {
        alert("Wrong admin credentials");
    }
};

// Show post section after login/signup
function showPostSection(){
    document.getElementById('auth-section').style.display='none';
    document.getElementById('post-section').style.display='block';
}

// Post creation
window.sendPost = async () => {
    const content = document.getElementById('post-content').value;
    if(!content) return;
    const div = document.createElement('div');
    div.className = 'post';
    div.innerText = content;
    document.getElementById('feed-posts').prepend(div);
    document.getElementById('post-content').value='';
};
