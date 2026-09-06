import { motion } from 'framer-motion'

/* ──── Rose Bouquet SVG ──── */
function RoseBouquet() {
  return (
    <svg viewBox="0 0 200 280" className="w-52 h-72 md:w-64 md:h-80 drop-shadow-xl">
      {/* Wrapping paper */}
      <path d="M60 280 L100 140 L140 280 Z" fill="#F9A8D4" opacity="0.8" />
      <path d="M55 280 L100 150 L145 280 Z" fill="none" stroke="#EC4899" strokeWidth="1.5" />

      {/* Stems */}
      <line x1="100" y1="140" x2="80" y2="60" stroke="#4ADE80" strokeWidth="3" />
      <line x1="100" y1="140" x2="100" y2="40" stroke="#4ADE80" strokeWidth="3" />
      <line x1="100" y1="140" x2="120" y2="55" stroke="#4ADE80" strokeWidth="3" />
      <line x1="100" y1="140" x2="60" y2="80" stroke="#4ADE80" strokeWidth="2.5" />
      <line x1="100" y1="140" x2="140" y2="75" stroke="#4ADE80" strokeWidth="2.5" />

      {/* Leaves */}
      <ellipse cx="85" cy="110" rx="8" ry="14" fill="#4ADE80" transform="rotate(-20,85,110)" opacity="0.8" />
      <ellipse cx="115" cy="105" rx="8" ry="14" fill="#4ADE80" transform="rotate(25,115,105)" opacity="0.8" />
      <ellipse cx="70" cy="90" rx="6" ry="12" fill="#86EFAC" transform="rotate(-30,70,90)" opacity="0.7" />
      <ellipse cx="130" cy="95" rx="6" ry="12" fill="#86EFAC" transform="rotate(30,130,95)" opacity="0.7" />

      {/* Roses - center */}
      <circle cx="100" cy="38" r="20" fill="#E11D48" />
      <path d="M92 30 Q100 22 108 30 Q100 38 92 30" fill="#BE123C" />
      <path d="M88 38 Q100 28 112 38 Q100 48 88 38" fill="#F43F5E" opacity="0.7" />
      <circle cx="100" cy="36" r="6" fill="#BE123C" />

      {/* Rose - left */}
      <circle cx="78" cy="58" r="16" fill="#E11D48" />
      <path d="M72 52 Q78 46 84 52 Q78 58 72 52" fill="#BE123C" />
      <path d="M69 58 Q78 50 87 58 Q78 66 69 58" fill="#F43F5E" opacity="0.7" />
      <circle cx="78" cy="56" r="5" fill="#BE123C" />

      {/* Rose - right */}
      <circle cx="122" cy="53" r="16" fill="#E11D48" />
      <path d="M116 47 Q122 41 128 47 Q122 53 116 47" fill="#BE123C" />
      <path d="M113 53 Q122 45 131 53 Q122 61 113 53" fill="#F43F5E" opacity="0.7" />
      <circle cx="122" cy="51" r="5" fill="#BE123C" />

      {/* Rose - far left */}
      <circle cx="58" cy="78" r="14" fill="#FB7185" />
      <path d="M52 73 Q58 68 64 73 Q58 78 52 73" fill="#E11D48" />
      <circle cx="58" cy="76" r="4" fill="#BE123C" />

      {/* Rose - far right */}
      <circle cx="142" cy="73" r="14" fill="#FB7185" />
      <path d="M136 68 Q142 63 148 68 Q142 73 136 68" fill="#E11D48" />
      <circle cx="142" cy="71" r="4" fill="#BE123C" />

      {/* Baby's breath (small white flowers) */}
      <circle cx="68" cy="50" r="3" fill="white" opacity="0.8" />
      <circle cx="65" cy="45" r="2" fill="white" opacity="0.6" />
      <circle cx="135" cy="45" r="3" fill="white" opacity="0.8" />
      <circle cx="138" cy="40" r="2" fill="white" opacity="0.6" />
      <circle cx="95" cy="25" r="2.5" fill="white" opacity="0.7" />
      <circle cx="108" cy="22" r="2.5" fill="white" opacity="0.7" />
      <circle cx="50" cy="70" r="2" fill="white" opacity="0.6" />
      <circle cx="150" cy="65" r="2" fill="white" opacity="0.6" />

      {/* Ribbon bow on wrapping */}
      <ellipse cx="90" cy="155" rx="12" ry="8" fill="#EC4899" transform="rotate(-15,90,155)" />
      <ellipse cx="110" cy="155" rx="12" ry="8" fill="#EC4899" transform="rotate(15,110,155)" />
      <circle cx="100" cy="157" r="4" fill="#BE185D" />
      {/* Ribbon tails */}
      <path d="M96 160 Q85 180 80 190" stroke="#EC4899" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M104 160 Q115 180 120 190" stroke="#EC4899" strokeWidth="3" fill="none" strokeLinecap="round" />
    </svg>
  )
}

/* ──── Floating Text Bubble ──── */
function Bubble({ text, delay, style }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5 + delay, type: 'spring', stiffness: 180, damping: 14 }}
      className="absolute z-10"
      style={style}
    >
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3 + delay, repeat: Infinity, ease: 'easeInOut' }}
        className="bg-white/90 backdrop-blur-sm border-2 border-pink-200 rounded-2xl px-3 py-2 shadow-md shadow-pink-100/50 max-w-[140px]"
      >
        <p className="text-pink-600 text-xs font-cursive font-semibold text-center leading-tight">
          {text}
        </p>
      </motion.div>
    </motion.div>
  )
}

/* ──── Main Component ──── */
export default function TheBouquet({ onBack, bubbleTexts }) {
  const defaultTexts = [
    'You make my heart bloom',
    'Life feels sweeter with you',
    'You make every moment sweeter',
    'I choose you every day',
    'My love for you keeps growing',
    'My heart will always choose you',
  ]

  const texts = bubbleTexts || defaultTexts
  const positions = [
    { top: '8%', left: '5%' },
    { top: '12%', right: '5%' },
    { top: '35%', left: '2%' },
    { top: '38%', right: '2%' },
    { bottom: '22%', left: '5%' },
    { bottom: '18%', right: '5%' },
  ]

  const bubbles = texts.map((text, i) => ({
    text,
    style: positions[i] || positions[i % positions.length],
  }))

  return (
    <div className="relative flex flex-col items-center min-h-screen min-h-[100dvh] bg-gradient-to-b from-pink-50 via-rose-50 to-pink-100 px-4 py-6 overflow-hidden lace-bg">

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
        className="text-2xl md:text-3xl font-bold text-pink-700 mb-2 mt-2 font-cursive z-10"
      >
        Your Bouquet
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
        className="text-pink-500 text-sm font-medium mb-4 z-10"
      >
        Each petal carries a whisper of love 🌹
      </motion.p>

      {/* Bouquet container with bubbles */}
      <div className="relative flex-1 flex items-center justify-center w-full max-w-md">
        {/* Floating bubbles */}
        {bubbles.map((b, i) => (
          <Bubble key={i} text={b.text} delay={i * 0.12} style={b.style} />
        ))}

        {/* Bouquet */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 150, damping: 14 }}
          className="relative z-[5]"
        >
          <motion.div
            animate={{ rotate: [-1, 1, -1] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <RoseBouquet />
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom decoration */}
      <div className="flex gap-3 mt-4 mb-2 opacity-40">
        {['🌸', '🌹', '💐', '🌹', '🌸'].map((e, i) => (
          <motion.span
            key={i}
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
            className="text-lg"
          >
            {e}
          </motion.span>
        ))}
      </div>
    </div>
  )
}
