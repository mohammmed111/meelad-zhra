import { motion } from 'framer-motion'

/* ──── Cat Holding Heart SVG ──── */
function CatWithHeart() {
  return (
    <svg viewBox="0 0 80 90" className="w-20 h-24">
      {/* Body */}
      <ellipse cx="40" cy="60" rx="22" ry="25" fill="#FFD5DC" />
      {/* Head */}
      <circle cx="40" cy="35" r="18" fill="#FFD5DC" />
      {/* Ears */}
      <polygon points="26,22 18,5 35,18" fill="#FFD5DC" stroke="#F9A8D4" strokeWidth="1.5" />
      <polygon points="54,22 62,5 45,18" fill="#FFD5DC" stroke="#F9A8D4" strokeWidth="1.5" />
      <polygon points="27,21 21,9 33,19" fill="#FECDD3" />
      <polygon points="53,21 59,9 47,19" fill="#FECDD3" />
      {/* Eyes - happy */}
      <path d="M30 33 Q35 28 40 33" stroke="#4A3728" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M40 33 Q45 28 50 33" stroke="#4A3728" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* Blush */}
      <circle cx="27" cy="38" r="4" fill="#F9A8D4" opacity="0.4" />
      <circle cx="53" cy="38" r="4" fill="#F9A8D4" opacity="0.4" />
      {/* Mouth */}
      <path d="M36 40 Q40 45 44 40" stroke="#BE185D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* Whiskers */}
      <line x1="15" y1="35" x2="28" y2="37" stroke="#F9A8D4" strokeWidth="1" />
      <line x1="15" y1="40" x2="28" y2="40" stroke="#F9A8D4" strokeWidth="1" />
      <line x1="52" y1="37" x2="65" y2="35" stroke="#F9A8D4" strokeWidth="1" />
      <line x1="52" y1="40" x2="65" y2="40" stroke="#F9A8D4" strokeWidth="1" />
      {/* Arms holding heart */}
      <path d="M22 55 Q20 48 28 50" stroke="#FFD5DC" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M58 55 Q60 48 52 50" stroke="#FFD5DC" strokeWidth="4" fill="none" strokeLinecap="round" />
      {/* Heart being held */}
      <path d="M32 52 C32 48 28 44 34 44 C37 44 40 48 40 48 C40 48 43 44 46 44 C52 44 48 48 48 52 C48 58 40 63 40 63 C40 63 32 58 32 52 Z" fill="#E11D48" />
      {/* Tail */}
      <path d="M58 70 Q70 65 68 52" stroke="#FFD5DC" strokeWidth="4" fill="none" strokeLinecap="round" />
    </svg>
  )
}

/* ──── Main Component ──── */
export default function TheLetter({ onBack, letterContent }) {
  const defaultLetter = [
    "My Dearest Love,",
    "",
    "There are not enough words in this world to describe how much you mean to me. From the very first moment our eyes met, I knew that my heart had found its forever home.",
    "",
    "You are my first thought in the morning and my last wish before I sleep. Your laughter is the sweetest melody, and your smile lights up even my darkest days. I am endlessly grateful that the universe brought us together.",
    "",
    "Every day with you feels like a beautiful dream I never want to wake up from. You make me a better person, and I promise to spend every breath making you feel as loved and cherished as you make me feel.",
    "",
    "Thank you for being my best friend, my partner, my home. I love you more than yesterday, but less than tomorrow.",
    "",
    "Until the stars forget to shine..."
  ]

  // Parse custom letter content: split by double newlines for paragraphs, single newlines become separate lines
  const letterText = letterContent
    ? letterContent.split('\n').map((line) => line.trim() === '' ? '' : line)
    : defaultLetter

  return (
    <div className="relative flex flex-col items-center min-h-screen min-h-[100dvh] watercolor-bg px-5 py-6 overflow-hidden">

      {/* Next button */}
      <motion.button
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        onClick={onBack}
        className="absolute top-5 right-5 z-20 px-4 py-1.5 bg-white/80 backdrop-blur-sm border border-pink-200 text-pink-600 font-semibold text-sm rounded-full shadow-sm hover:bg-pink-50 transition-colors"
      >
        Next →
      </motion.button>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-2xl md:text-3xl font-bold text-pink-700 mb-1 mt-2 font-cursive z-10"
      >
        A Letter From My Heart
      </motion.h1>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="w-16 h-0.5 bg-gradient-to-r from-transparent via-pink-400 to-transparent mb-4 z-10"
      />

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-pink-400 text-xs mb-4 z-10"
      >
        💌 Written just for you
      </motion.p>

      {/* Letter card */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.3, type: 'spring', stiffness: 120, damping: 14 }}
        className="relative w-full max-w-md mx-auto flex-1 z-10"
      >
        <div className="bg-white/70 backdrop-blur-md rounded-3xl p-6 md:p-8 shadow-xl shadow-pink-200/30 border border-pink-100/60 relative overflow-hidden">
          {/* Decorative corner flourishes */}
          <div className="absolute top-3 left-3 text-pink-200 opacity-40 text-lg">❦</div>
          <div className="absolute top-3 right-3 text-pink-200 opacity-40 text-lg rotate-90">❦</div>

          {/* Letter text */}
          <div className="space-y-0">
            {letterText.map((line, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.06 }}
                className={`font-cursive leading-relaxed ${
                  i === 0
                    ? 'text-xl text-pink-700 font-bold mb-2'
                    : line === ''
                    ? 'h-3'
                    : 'text-sm md:text-base text-pink-700/80 font-medium'
                }`}
              >
                {line}
              </motion.p>
            ))}
          </div>

          {/* Decorative line before signature */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="w-20 h-px bg-pink-300 mx-auto my-4"
          />
        </div>
      </motion.div>

      {/* Bottom section */}
      <div className="w-full max-w-md flex items-end justify-between mt-4 mb-4 px-2 z-10">
        {/* Cat with heart - bottom left */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1, type: 'spring' }}
        >
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <CatWithHeart />
          </motion.div>
        </motion.div>

        {/* Signature - bottom right */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.2, type: 'spring' }}
          className="text-right"
        >
          <p className="font-cursive text-lg text-pink-600 font-semibold">
            Always, forever. ❤️
          </p>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.4, duration: 0.4 }}
            className="w-24 h-px bg-pink-300 ml-auto mt-1"
          />
        </motion.div>
      </div>
    </div>
  )
}
