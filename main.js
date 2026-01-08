import { authInit } from './supabase.js'
import { loadPosts } from './posts.js'
import { loadStories } from './stories.js'
import { loadReels } from './reels.js'
import { loadMessages } from './messages.js'
import { loadMarketplace } from './marketplace.js'
import { loadProfile } from './profile.js'

authInit()

document.querySelectorAll('nav button').forEach(btn => {
  btn.onclick = () => {
    const page = btn.dataset.page
    if (page === 'home') {
      loadStories()
      loadPosts()
    }
    if (page === 'reels') loadReels()
    if (page === 'messages') loadMessages()
    if (page === 'marketplace') loadMarketplace()
    if (page === 'profile') loadProfile()
  }
})
