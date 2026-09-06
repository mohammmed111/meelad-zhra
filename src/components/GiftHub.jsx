import { motion } from 'framer-motion'

/* ──── Gift Box SVG ──── */
function GiftBox({ index, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.7 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.3 + delay, type: 'spring', stiffness: 180, damping: 14 }}
      whileHover={{ scale: 1.1, y: -8 }}
      whileTap={{ scale: 0.95 }}
      className="cursor-pointer group"
    >
      <div className="relative">
        {/* Gift box body */}
        <svg viewBox="0 0 100 110" className="w-24 h-24 md:w-28 md:h-28 drop-shadow-lg">
          {/* Box base */}
          <rect x="10" y="45" width="80" height="55" rx="6" fill="#BAE6FD" stroke="#7DD3FC" strokeWidth="2" />
          {/* Box lid */}
          <rect x="5" y="35" width="90" height="18" rx="5" fill="#BAE6FD" stroke="#7DD3FC" strokeWidth="2" />
          {/* Vertical ribbon */}
          <rect x="44" y="35" width="12" height="65" rx="2" fill="#F9A8D4" />
          {/* Horizontal ribbon */}
          <rect x="5" y="40" width="90" height="10" rx="2" fill="#F9A8D4" />
          {/* Bow - left loop */}
          <ellipse cx="40" cy="32" rx="12" ry="10" fill="#F472B6" stroke="#EC4899" strokeWidth="1.5" transform="rotate(-15,40,32)" />
          {/* Bow - right loop */}
          <ellipse cx="60" cy="32" rx="12" ry="10" fill="#F472B6" stroke="#EC4899" strokeWidth="1.5" transform="rotate(15,60,32)" />
          {/* Bow - center */}
          <circle cx="50" cy="35" r="5" fill="#EC4899" />
          {/* Sparkle */}
          <text x="75" y="30" fontSize="12" className="animate-sparkle">✨</text>
        </svg>

        {/* Label */}
        <motion.div
          className="mt-2 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 + delay }}
        >
          <span className="inline-block px-3 py-1 bg-white/70 backdrop-blur-sm rounded-full text-pink-600 font-semibold text-xs shadow-sm border border-pink-100">
            {index === 0 ? '🌹 Bouquet' : index === 1 ? '📸 Scrapbook' : '💌 Letter'}
          </span>
        </motion.div>
      </div>
    </motion.div>
  )
}

/* ──── Main Component ──── */
export default function GiftHub({ onSelectGift }) {
  const gifts = [
    { key: 'bouquet', label: 'The Bouquet' },
    { key: 'scrapbook', label: 'The Scrapbook' },
    { key: 'letter', label: 'The Letter' },
  ]

  return (
    <div className="flex flex-col items-center justify-center min-h-screen min-h-[100dvh] bg-pink-50 px-6 py-10 relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute -top-20 -right-20 w-60 h-60 bg-pink-100/40 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-rose-100/40 rounded-full blur-3xl" />

      {/* Trophy / check icon */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 12 }}
        className="w-20 h-20 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full flex items-center justify-center shadow-lg shadow-pink-300/50 mb-6"
      >
        <span className="text-3xl">💝</span>
      </motion.div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-2xl md:text-3xl font-bold text-pink-700 mb-2 text-center font-cursive"
      >
        You passed the love test
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="text-pink-500 mb-10 text-center font-medium"
      >
        Your surprises are waiting for you ✨
      </motion.p>

      {/* Divider */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="w-24 h-0.5 bg-gradient-to-r from-transparent via-pink-300 to-transparent mb-10"
      />

      {/* Gift boxes */}
      <div className="flex gap-6 md:gap-10 items-end">
        {gifts.map((gift, i) => (
          <div key={gift.key} onClick={() => onSelectGift(gift.key)}>
            <GiftBox index={i} delay={i * 0.15} />
          </div>
        ))}
      </div>

      {/* Tap hint */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0.5, 1] }}
        transition={{ delay: 1.2, duration: 2, repeat: Infinity }}
        className="mt-10 text-pink-400 text-sm font-medium"
      >
        Tap a gift to open it 🎁
      </motion.p>

      {/* Bottom decorative hearts */}
      <div className="absolute bottom-6 flex gap-4">
        {['🌸', '💕', '🌸'].map((e, i) => (
          <motion.span
            key={i}
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 2, delay: i * 0.4, repeat: Infinity }}
            className="text-xl opacity-30"
          >
            {e}
          </motion.span>
        ))}
      </div>
    </div>
  )
}
