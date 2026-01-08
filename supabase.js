import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const SUPABASE_URL = "https://aiwigwfsajdnwfpcziqf.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFpd2lnd2ZzYWpkbndmcGN6aXFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ5NzExMTksImV4cCI6MjA4MDU0NzExOX0.7Mk1IUVbxhCnwQ4HYo-02G4W2pNoBtSbRe8X4UizstA";

export const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);

export function authInit() {
  const email = document.getElementById('signupEmail') || document.getElementById('loginEmail');
  const password = document.getElementById('signupPassword') || document.getElementById('loginPassword');

  document.getElementById('signupBtn').onclick = async () => {
    const { error } = await supabase.auth.signUp({
      email: document.getElementById('signupEmail').value,
      password: document.getElementById('signupPassword').value
    });
    if (error) {
      alert('Error signing up: ' + error.message);
    } else {
      alert('Signed up successfully');
    }
  };

  document.getElementById('loginBtn').onclick = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email: document.getElementById('loginEmail').value,
      password: document.getElementById('loginPassword').value
    });
    if (error) {
      alert('Error logging in: ' + error.message);
    } else {
      alert('Logged in successfully');
    }
  };
}
