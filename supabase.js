import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm"

const SUPABASE_URL = "https://aiwigwfsajdnwfpcziqf.supabase.co"
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFpd2lnd2ZzYWpkbndmcGN6aXFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ5NzExMTksImV4cCI6MjA4MDU0NzExOX0.7Mk1IUVbxhCnwQ4HYo-02G4W2pNoBtSbRe8X4UizstA"

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

export function authInit() {
  const loginEmail = document.getElementById('loginEmail');
  const loginPassword = document.getElementById('loginPassword');
  const signupEmail = document.getElementById('signupEmail');
  const signupPassword = document.getElementById('signupPassword');
  const signupUsername = document.getElementById('signupUsername');

  document.getElementById('loginBtn')?.addEventListener('click', async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: loginEmail.value,
      password: loginPassword.value
    });
    if(error){ alert(error.message); return; }
    alert('Logged in'); location.reload();
  });

  document.getElementById('signupBtn')?.addEventListener('click', async () => {
    const { data, error } = await supabase.auth.signUp({
      email: signupEmail.value,
      password: signupPassword.value
    });
    if(error){ alert(error.message); return; }
    alert('Signed up'); location.reload();
  });
    }
