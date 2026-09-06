import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useGift, DEFAULT_GIFT_DATA } from '../context/GiftContext'
import LoveTest from './LoveTest'
import GiftHub from './GiftHub'
import TheBouquet from './TheBouquet'
import TheScrapbook from './TheScrapbook'
import TheLetter from './TheLetter'

const pageVariants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.3, ease: 'easeIn' } },
}

export default function ViewerExperience() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { loadGift } = useGift()

  const [giftData, setGiftData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [currentView, setCurrentView] = useState('loveTest')

  useEffect(() => {
    const data = loadGift(id)
    if (data) {
      setGiftData(data)
    } else {
      setError(true)
    }
    setLoading(false)
  }, [id, loadGift])

  const navigateTo = (view) => setCurrentView(view)

  // Merge loaded data with defaults as fallback
  const mergedData = giftData
    ? {
        bubbleTexts: giftData.bubbleTexts || DEFAULT_GIFT_DATA.bubbleTexts,
        letterText: giftData.letterText || DEFAULT_GIFT_DATA.letterText,
        audioUrl: giftData.audioUrl || DEFAULT_GIFT_DATA.audioUrl,
        trackName: giftData.trackName || DEFAULT_GIFT_DATA.trackName,
      }
    : DEFAULT_GIFT_DATA

  // Loading state
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen min-h-[100dvh] bg-pink-50">
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-5xl mb-4"
        >
          💕
        </motion.div>
        <p className="text-pink-500 font-semibold font-cursive text-lg">Loading your gift...</p>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen min-h-[100dvh] bg-pink-50 px-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
          className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center mb-6"
        >
          <span className="text-3xl">💔</span>
        </motion.div>
        <h1 className="text-2xl font-bold text-pink-700 font-cursive mb-2">Gift Not Found</h1>
        <p className="text-pink-500 text-sm text-center mb-6 max-w-xs">
          This gift link may have expired or doesn't exist. Ask your special someone for a new link!
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/')}
          className="px-6 py-2.5 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold rounded-full shadow-lg shadow-pink-300/50 text-sm"
        >
          Create Your Own Gift →
        </motion.button>
      </div>
    )
  }

  // Render the multi-step experience
  const renderView = () => {
    switch (currentView) {
      case 'loveTest':
        return (
          <motion.div key="loveTest" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="w-full min-h-screen min-h-[100dvh]">
            <LoveTest onPass={() => navigateTo('giftHub')} />
          </motion.div>
        )
      case 'giftHub':
        return (
          <motion.div key="giftHub" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="w-full min-h-screen min-h-[100dvh]">
            <GiftHub onSelectGift={(gift) => navigateTo(gift)} />
          </motion.div>
        )
      case 'bouquet':
        return (
          <motion.div key="bouquet" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="w-full min-h-screen min-h-[100dvh]">
            <TheBouquet onBack={() => navigateTo('giftHub')} bubbleTexts={mergedData.bubbleTexts} />
          </motion.div>
        )
      case 'scrapbook':
        return (
          <motion.div key="scrapbook" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="w-full min-h-screen min-h-[100dvh]">
            <TheScrapbook onBack={() => navigateTo('giftHub')} audioUrl={mergedData.audioUrl} trackName={mergedData.trackName} />
          </motion.div>
        )
      case 'letter':
        return (
          <motion.div key="letter" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="w-full min-h-screen min-h-[100dvh]">
            <TheLetter onBack={() => navigateTo('giftHub')} letterContent={mergedData.letterText} />
          </motion.div>
        )
      default:
        return null
    }
  }

  return (
    <AnimatePresence mode="wait">
      {renderView()}
    </AnimatePresence>
  )
}
