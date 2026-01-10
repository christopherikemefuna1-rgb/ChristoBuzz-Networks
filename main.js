import { showAuth, showHome, showGuestHome } from './app.js';

document.addEventListener('DOMContentLoaded', () => {
  const guestViews = Number(localStorage.getItem('guestViews') || 0);

  if (guestViews < 5) {
    showGuestHome(); // allow limited guest browsing
  } else {
    showAuth(); // force login/signup
  }
});
