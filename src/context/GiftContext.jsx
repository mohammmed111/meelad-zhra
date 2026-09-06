import { createContext, useContext, useState, useCallback } from 'react'

const GiftContext = createContext(null)

/* ──── Default data for pre-filling the form ──── */
export const DEFAULT_GIFT_DATA = {
  bubbleTexts: [
    'You make my heart bloom',
    'Life feels sweeter with you',
    'You make every moment sweeter',
    'I choose you every day',
    'My love for you keeps growing',
    'My heart will always choose you',
  ],
  letterText:
    "My Dearest Love,\n\nThere are not enough words in this world to describe how much you mean to me. From the very first moment our eyes met, I knew that my heart had found its forever home.\n\nYou are my first thought in the morning and my last wish before I sleep. Your laughter is the sweetest melody, and your smile lights up even my darkest days. I am endlessly grateful that the universe brought us together.\n\nEvery day with you feels like a beautiful dream I never want to wake up from. You make me a better person, and I promise to spend every breath making you feel as loved and cherished as you make me feel.\n\nThank you for being my best friend, my partner, my home. I love you more than yesterday, but less than tomorrow.\n\nUntil the stars forget to shine...",
  audioUrl: '',
  trackName: 'BIRDS OF A FEATHER - Billie Eilish',
}

/* ──── Generate a short unique ID ──── */
function generateId() {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789'
  let id = ''
  for (let i = 0; i < 8; i++) {
    id += chars[Math.floor(Math.random() * chars.length)]
  }
  return id
}

/* ──── Provider ──── */
export function GiftProvider({ children }) {
  const [currentGift, setCurrentGift] = useState(null)

  const saveGift = useCallback((data) => {
    const id = generateId()
    const gift = {
      ...data,
      id,
      createdAt: Date.now(),
    }

    // Save to localStorage keyed by ID
    const allGifts = JSON.parse(localStorage.getItem('loveGifts') || '{}')
    allGifts[id] = gift
    localStorage.setItem('loveGifts', JSON.stringify(allGifts))

    setCurrentGift(gift)
    return id
  }, [])

  const loadGift = useCallback((id) => {
    // Check if already loaded
    if (currentGift?.id === id) return currentGift

    const allGifts = JSON.parse(localStorage.getItem('loveGifts') || '{}')
    const gift = allGifts[id] || null
    if (gift) setCurrentGift(gift)
    return gift
  }, [currentGift])

  return (
    <GiftContext.Provider value={{ currentGift, saveGift, loadGift }}>
      {children}
    </GiftContext.Provider>
  )
}

/* ──── Hook ──── */
export function useGift() {
  const context = useContext(GiftContext)
  if (!context) {
    throw new Error('useGift must be used within a GiftProvider')
  }
  return context
}
