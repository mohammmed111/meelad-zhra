import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/* ──── Inline SVG decorations ──── */
function PaperPlane() {
  return (
    <motion.svg
      className="w-10 h-10 text-pink-300"
      animate={{ x: [0, 8, -5, 0], y: [0, -6, 3, 0], rotate: [0, 8, -5, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      viewBox="0 0 24 24" fill="currentColor"
    >
      <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
    </motion.svg>
  )
}

function Birds() {
  return (
    <motion.div
      className="flex gap-1"
      animate={{ y: [0, -5, 0], x: [0, 4, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
    >
      <svg className="w-7 h-7 text-pink-400" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23 11.5C23 10.12 21.88 9 20.5 9c-.24 0-.47.03-.69.09C19.35 7.31 17.76 6 15.84 6c-1.19 0-2.26.5-3.04 1.29A4.49 4.49 0 009.5 6C7.02 6 5 8.02 5 10.5c0 .28.03.55.08.82C3.26 11.91 2 13.57 2 15.5 2 17.99 4.01 20 6.5 20h14c2.49 0 4.5-2.01 4.5-4.5 0-1.78-1.04-3.32-2.55-4.04.03-.16.05-.32.05-.46z" />
      </svg>
      <svg className="w-6 h-6 text-pink-300 mt-1" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23 11.5C23 10.12 21.88 9 20.5 9c-.24 0-.47.03-.69.09C19.35 7.31 17.76 6 15.84 6c-1.19 0-2.26.5-3.04 1.29A4.49 4.49 0 009.5 6C7.02 6 5 8.02 5 10.5c0 .28.03.55.08.82C3.26 11.91 2 13.57 2 15.5 2 17.99 4.01 20 6.5 20h14c2.49 0 4.5-2.01 4.5-4.5 0-1.78-1.04-3.32-2.55-4.04.03-.16.05-.32.05-.46z" />
      </svg>
    </motion.div>
  )
}

/* ──── Cat SVG placeholders for each mood ──── */
function SadCat() {
  return (
    <svg viewBox="0 0 120 120" className="w-full h-full">
      <circle cx="60" cy="65" r="40" fill="#FFD5DC" />
      {/* ears */}
      <polygon points="30,35 20,5 50,25" fill="#FFD5DC" stroke="#F9A8D4" strokeWidth="2" />
      <polygon points="90,35 100,5 70,25" fill="#FFD5DC" stroke="#F9A8D4" strokeWidth="2" />
      <polygon points="32,32 25,12 47,27" fill="#FECDD3" />
      <polygon points="88,32 95,12 73,27" fill="#FECDD3" />
      {/* eyes - sad */}
      <ellipse cx="45" cy="58" rx="6" ry="7" fill="#4A3728" />
      <ellipse cx="75" cy="58" rx="6" ry="7" fill="#4A3728" />
      <circle cx="43" cy="56" r="2" fill="white" />
      <circle cx="73" cy="56" r="2" fill="white" />
      {/* sad mouth */}
      <path d="M48 78 Q60 72 72 78" stroke="#BE185D" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {/* tears */}
      <ellipse cx="40" cy="70" rx="3" ry="5" fill="#93C5FD" opacity="0.7" />
      <ellipse cx="80" cy="70" rx="3" ry="5" fill="#93C5FD" opacity="0.7" />
      {/* whiskers */}
      <line x1="20" y1="62" x2="38" y2="66" stroke="#F9A8D4" strokeWidth="1.5" />
      <line x1="20" y1="70" x2="38" y2="70" stroke="#F9A8D4" strokeWidth="1.5" />
      <line x1="82" y1="66" x2="100" y2="62" stroke="#F9A8D4" strokeWidth="1.5" />
      <line x1="82" y1="70" x2="100" y2="70" stroke="#F9A8D4" strokeWidth="1.5" />
    </svg>
  )
}

function CryingCat() {
  return (
    <svg viewBox="0 0 120 120" className="w-full h-full">
      <circle cx="60" cy="65" r="40" fill="#FFD5DC" />
      <polygon points="30,35 20,5 50,25" fill="#FFD5DC" stroke="#F9A8D4" strokeWidth="2" />
      <polygon points="90,35 100,5 70,25" fill="#FFD5DC" stroke="#F9A8D4" strokeWidth="2" />
      <polygon points="32,32 25,12 47,27" fill="#FECDD3" />
      <polygon points="88,32 95,12 73,27" fill="#FECDD3" />
      {/* closed crying eyes */}
      <path d="M38 57 Q45 52 52 57" stroke="#4A3728" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M68 57 Q75 52 82 57" stroke="#4A3728" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {/* big tears */}
      <ellipse cx="38" cy="68" rx="4" ry="8" fill="#93C5FD" opacity="0.8" />
      <ellipse cx="82" cy="68" rx="4" ry="8" fill="#93C5FD" opacity="0.8" />
      <ellipse cx="36" cy="78" rx="3" ry="5" fill="#93C5FD" opacity="0.5" />
      <ellipse cx="84" cy="78" rx="3" ry="5" fill="#93C5FD" opacity="0.5" />
      {/* wailing mouth */}
      <ellipse cx="60" cy="80" rx="10" ry="7" fill="#4A3728" />
      <ellipse cx="60" cy="78" rx="7" ry="3" fill="#FECDD3" />
      {/* whiskers */}
      <line x1="20" y1="65" x2="35" y2="68" stroke="#F9A8D4" strokeWidth="1.5" />
      <line x1="20" y1="72" x2="35" y2="72" stroke="#F9A8D4" strokeWidth="1.5" />
      <line x1="85" y1="68" x2="100" y2="65" stroke="#F9A8D4" strokeWidth="1.5" />
      <line x1="85" y1="72" x2="100" y2="72" stroke="#F9A8D4" strokeWidth="1.5" />
    </svg>
  )
}

function AnnoyedCat() {
  return (
    <svg viewBox="0 0 120 120" className="w-full h-full">
      <circle cx="60" cy="65" r="40" fill="#FFD5DC" />
      <polygon points="30,35 20,5 50,25" fill="#FFD5DC" stroke="#F9A8D4" strokeWidth="2" />
      <polygon points="90,35 100,5 70,25" fill="#FFD5DC" stroke="#F9A8D4" strokeWidth="2" />
      <polygon points="32,32 25,12 47,27" fill="#FECDD3" />
      <polygon points="88,32 95,12 73,27" fill="#FECDD3" />
      {/* annoyed half-lidded eyes */}
      <line x1="38" y1="54" x2="52" y2="56" stroke="#4A3728" strokeWidth="3" strokeLinecap="round" />
      <line x1="68" y1="56" x2="82" y2="54" stroke="#4A3728" strokeWidth="3" strokeLinecap="round" />
      <ellipse cx="45" cy="60" rx="5" ry="4" fill="#4A3728" />
      <ellipse cx="75" cy="60" rx="5" ry="4" fill="#4A3728" />
      {/* flat annoyed mouth */}
      <line x1="48" y1="78" x2="72" y2="78" stroke="#BE185D" strokeWidth="2.5" strokeLinecap="round" />
      {/* whiskers */}
      <line x1="20" y1="65" x2="38" y2="68" stroke="#F9A8D4" strokeWidth="1.5" />
      <line x1="20" y1="72" x2="38" y2="72" stroke="#F9A8D4" strokeWidth="1.5" />
      <line x1="82" y1="68" x2="100" y2="65" stroke="#F9A8D4" strokeWidth="1.5" />
      <line x1="82" y1="72" x2="100" y2="72" stroke="#F9A8D4" strokeWidth="1.5" />
      {/* sweat drop */}
      <ellipse cx="92" cy="50" rx="3" ry="5" fill="#93C5FD" opacity="0.6" />
    </svg>
  )
}

function ConfusedCat() {
  return (
    <svg viewBox="0 0 120 120" className="w-full h-full">
      <circle cx="60" cy="65" r="40" fill="#FFD5DC" />
      <polygon points="30,35 20,5 50,25" fill="#FFD5DC" stroke="#F9A8D4" strokeWidth="2" />
      <polygon points="90,35 100,5 70,25" fill="#FFD5DC" stroke="#F9A8D4" strokeWidth="2" />
      <polygon points="32,32 25,12 47,27" fill="#FECDD3" />
      <polygon points="88,32 95,12 73,27" fill="#FECDD3" />
      {/* confused eyes - one bigger */}
      <circle cx="45" cy="58" r="7" fill="white" stroke="#4A3728" strokeWidth="2" />
      <circle cx="45" cy="58" r="4" fill="#4A3728" />
      <circle cx="75" cy="58" r="5" fill="white" stroke="#4A3728" strokeWidth="2" />
      <circle cx="75" cy="58" r="3" fill="#4A3728" />
      {/* question mark */}
      <text x="88" y="42" fontSize="16" fill="#BE185D" fontWeight="bold">?</text>
      {/* wavy mouth */}
      <path d="M48 78 Q54 74 60 78 Q66 82 72 78" stroke="#BE185D" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* whiskers */}
      <line x1="20" y1="62" x2="38" y2="66" stroke="#F9A8D4" strokeWidth="1.5" />
      <line x1="20" y1="70" x2="38" y2="70" stroke="#F9A8D4" strokeWidth="1.5" />
      <line x1="82" y1="66" x2="100" y2="62" stroke="#F9A8D4" strokeWidth="1.5" />
      <line x1="82" y1="70" x2="100" y2="70" stroke="#F9A8D4" strokeWidth="1.5" />
    </svg>
  )
}

function HappyCat() {
  return (
    <svg viewBox="0 0 120 120" className="w-full h-full">
      <circle cx="60" cy="65" r="40" fill="#FFD5DC" />
      <polygon points="30,35 20,5 50,25" fill="#FFD5DC" stroke="#F9A8D4" strokeWidth="2" />
      <polygon points="90,35 100,5 70,25" fill="#FFD5DC" stroke="#F9A8D4" strokeWidth="2" />
      <polygon points="32,32 25,12 47,27" fill="#FECDD3" />
      <polygon points="88,32 95,12 73,27" fill="#FECDD3" />
      {/* happy closed eyes */}
      <path d="M38 58 Q45 52 52 58" stroke="#4A3728" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M68 58 Q75 52 82 58" stroke="#4A3728" strokeWidth="3" fill="none" strokeLinecap="round" />
      {/* blush */}
      <circle cx="35" cy="68" r="6" fill="#F9A8D4" opacity="0.5" />
      <circle cx="85" cy="68" r="6" fill="#F9A8D4" opacity="0.5" />
      {/* happy mouth */}
      <path d="M48 75 Q60 88 72 75" stroke="#BE185D" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {/* sparkles */}
      <text x="15" y="45" fontSize="10" opacity="0.8">✨</text>
      <text x="95" y="45" fontSize="10" opacity="0.8">✨</text>
      {/* whiskers */}
      <line x1="20" y1="65" x2="32" y2="68" stroke="#F9A8D4" strokeWidth="1.5" />
      <line x1="20" y1="72" x2="32" y2="72" stroke="#F9A8D4" strokeWidth="1.5" />
      <line x1="88" y1="68" x2="100" y2="65" stroke="#F9A8D4" strokeWidth="1.5" />
      <line x1="88" y1="72" x2="100" y2="72" stroke="#F9A8D4" strokeWidth="1.5" />
    </svg>
  )
}

function SuperHappyCat() {
  return (
    <svg viewBox="0 0 120 120" className="w-full h-full">
      <circle cx="60" cy="65" r="40" fill="#FFD5DC" />
      <polygon points="30,35 20,5 50,25" fill="#FFD5DC" stroke="#F9A8D4" strokeWidth="2" />
      <polygon points="90,35 100,5 70,25" fill="#FFD5DC" stroke="#F9A8D4" strokeWidth="2" />
      <polygon points="32,32 25,12 47,27" fill="#FECDD3" />
      <polygon points="88,32 95,12 73,27" fill="#FECDD3" />
      {/* star eyes */}
      <text x="37" y="64" fontSize="16">⭐</text>
      <text x="67" y="64" fontSize="16">⭐</text>
      {/* big blush */}
      <circle cx="33" cy="70" r="7" fill="#F9A8D4" opacity="0.6" />
      <circle cx="87" cy="70" r="7" fill="#F9A8D4" opacity="0.6" />
      {/* big happy mouth */}
      <path d="M44 76 Q60 95 76 76" stroke="#BE185D" strokeWidth="2.5" fill="#FECDD3" strokeLinecap="round" />
      {/* hearts */}
      <text x="8" y="40" fontSize="12">💕</text>
      <text x="95" y="38" fontSize="12">💖</text>
      <text x="52" y="20" fontSize="10">✨</text>
      {/* whiskers */}
      <line x1="18" y1="68" x2="30" y2="70" stroke="#F9A8D4" strokeWidth="1.5" />
      <line x1="18" y1="74" x2="30" y2="74" stroke="#F9A8D4" strokeWidth="1.5" />
      <line x1="90" y1="70" x2="102" y2="68" stroke="#F9A8D4" strokeWidth="1.5" />
      <line x1="90" y1="74" x2="102" y2="74" stroke="#F9A8D4" strokeWidth="1.5" />
    </svg>
  )
}

/* ──── Slider Mood Logic ──── */
function getCatState(value, customMessages = {}) {
  let CatComp, mood;
  if (value <= 2) { CatComp = SadCat; mood = 'sad' }
  else if (value <= 4) { CatComp = CryingCat; mood = 'crying' }
  else if (value <= 6) { CatComp = AnnoyedCat; mood = 'annoyed' }
  else if (value <= 9) { CatComp = ConfusedCat; mood = 'confused' }
  else if (value <= 20) { CatComp = HappyCat; mood = 'happy' }
  else { CatComp = SuperHappyCat; mood = 'superhappy' }

  let text = '';
  if (value < 34) text = customMessages.meterLow || 'Only that much?';
  else if (value < 67) text = customMessages.meterMedium || 'Half? Seriously?';
  else if (value < 100) text = customMessages.meterHigh || "Aww, that's more like it!";
  else text = 'Correct answer!';

  return { Cat: CatComp, text, mood }
}

/* ──── Heart Thumb Overlay ──── */
function HeartThumb({ value, max, sliderRef }) {
  const [pos, setPos] = useState(0)

  useEffect(() => {
    if (!sliderRef.current) return
    const slider = sliderRef.current
    const rect = slider.getBoundingClientRect()
    const ratio = value / max
    // Account for thumb width
    const thumbHalf = 16
    const trackWidth = rect.width - thumbHalf * 2
    setPos(thumbHalf + ratio * trackWidth)
  }, [value, max, sliderRef])

  return (
    <div
      className="absolute pointer-events-none"
      style={{
        left: `${pos}px`,
        top: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <motion.span
        className="text-2xl select-none drop-shadow-md"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut' }}
      >
        ❤️
      </motion.span>
    </div>
  )
}

/* ──── Main Component ──── */
export default function LoveTest({ onPass, messages }) {
  const [value, setValue] = useState(0)
  const sliderRef = useRef(null)
  const { Cat, text, mood } = getCatState(value, messages)
  const showNext = value >= 100

  // Display percentage directly as value%
  const displayPercent = `${value}%`

  // Calculate fill percentage for the track (since max is 100, it's just the value)
  const fillPercent = value

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen min-h-[100dvh] bg-pink-50 px-6 py-8 overflow-hidden">

      {/* Top decorations */}
      <div className="absolute top-6 left-6 z-10">
        <PaperPlane />
      </div>
      <div className="absolute top-6 right-6 z-10">
        <Birds />
      </div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-2xl md:text-3xl font-bold text-pink-700 mb-2 text-center font-cursive"
      >
        How much do you love me?
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-pink-400 text-sm mb-6"
      >
        Be honest... 💕
      </motion.p>

      {/* Cat emoji area */}
      <motion.div
        className="w-32 h-32 md:w-40 md:h-40 mb-4 relative"
        key={mood}
        initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      >
        {mood === 'superhappy' ? (
          <motion.div
            animate={{ y: [0, -8, 0], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, ease: 'easeInOut' }}
            className="w-full h-full"
          >
            <Cat />
          </motion.div>
        ) : mood === 'happy' ? (
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
            className="w-full h-full"
          >
            <Cat />
          </motion.div>
        ) : (
          <Cat />
        )}
      </motion.div>

      {/* Dynamic text */}
      <AnimatePresence mode="wait">
        <motion.p
          key={text}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="text-pink-600 font-semibold text-lg mb-2 text-center"
        >
          {text}
        </motion.p>
      </AnimatePresence>

      {/* Percentage display */}
      <motion.div
        className="text-5xl md:text-6xl font-bold text-pink-700 mb-8 tabular-nums"
        key={value}
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.1 }}
      >
        {displayPercent}
      </motion.div>

      {/* Slider area */}
      <div className="w-full max-w-sm relative">
        {/* Fill track */}
        <div
          className="absolute top-1/2 left-0 h-[10px] bg-pink-500 rounded-full -translate-y-1/2 pointer-events-none z-[1]"
          style={{ width: `${fillPercent}%` }}
        />

        {/* Slider */}
        <div className="relative">
          <input
            ref={sliderRef}
            type="range"
            min="0"
            max="100"
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
            className="love-slider w-full relative z-[2]"
          />
          <HeartThumb value={value} max={100} sliderRef={sliderRef} />
        </div>

        {/* Min/Max labels */}
        <div className="flex justify-between mt-2 text-xs text-pink-400 font-medium">
          <span>0%</span>
          <span>100%</span>
        </div>
      </div>

      {/* Next button */}
      <AnimatePresence>
        {showNext && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onPass}
            className="mt-8 px-8 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold rounded-full shadow-lg shadow-pink-300/50 hover:shadow-pink-400/60 transition-shadow text-lg"
          >
            Next →
          </motion.button>
        )}
      </AnimatePresence>

      {/* Decorative bottom hearts */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3 text-pink-200 opacity-40">
        {['💗', '💕', '💖', '💗', '💕'].map((h, i) => (
          <motion.span
            key={i}
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
            className="text-lg"
          >
            {h}
          </motion.span>
        ))}
      </div>
    </div>
  )
}
