import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const SUPABASE_URL = "https://aiwigwfsajdnwfpcziqf.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFpd2lnd2ZzYWpkbndmcGN6aXFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ5NzExMTksImV4cCI6MjA4MDU0NzExOX0.7Mk1IUVbxhCnwQ4HYo-02G4W2pNoBtSbRe8X4UizstA";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export function authInit() {
  document.getElementById('signupBtn').onclick = async () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    await supabase.auth.signUp({ email, password });
    alert('Signed up');
    showHome();
  };

  document.getElementById('loginBtn').onclick = async () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    await supabase.auth.signInWithPassword({ email, password });
    alert('Logged in');
    showHome();
  };
    }
