import { Assets } from 'premid'

const presence = new Presence({
  clientId: '1567069351717376011',
})

// Paste the direct imgur link of your logo here (https://i.imgur.com/xxxx.png)
const LOGO = 'https://i.imgur.com/8dfMgfZ.png'

const levels: Record<string, string> = {
  easy: 'Easy',
  medium: 'Medium',
  hard: 'Hard',
  expert: 'Expert',
  extreme: 'Extreme',
}

let startTimestamp = Math.floor(Date.now() / 1000)
let lastPath = ''

presence.on('UpdateData', async () => {
  const { pathname } = document.location

  // Reset the timer when changing page/level
  if (pathname !== lastPath) {
    lastPath = pathname
    startTimestamp = Math.floor(Date.now() / 1000)
  }

  // Strip the language prefix (e.g. /jp/extreme/ -> extreme)
  const parts = pathname.split('/').filter(Boolean)
  const first = parts[0]
  if (first && /^[a-z]{2}$/.test(first))
    parts.shift()
  const slug = parts[0] ?? ''

  const presenceData: PresenceData = {
    largeImageKey: LOGO,
    startTimestamp,
  }

  if (slug in levels) {
    presenceData.details = 'Playing Sudoku'
    presenceData.state = `Level: ${levels[slug]}`
  }
  else if (slug.includes('daily')) {
    presenceData.details = 'Doing the Daily Challenge'
  }
  else if (slug === '') {
    presenceData.details = 'On the home page'
  }
  else {
    presenceData.details = 'Browsing Sudoku.com'
  }

  presence.setActivity(presenceData)
})