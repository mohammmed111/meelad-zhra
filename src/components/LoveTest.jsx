import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/* ──── Helper for Mood and GIFs ──── */
function getMoodState(value, customMessages = {}) {
  let gifSrc = '';
  let text = '';
  let mood = '';

  if (value < 34) {
    gifSrc = '/gif/cat-sad.gif';
    text = customMessages.meterLow || 'Only that much?';
    mood = 'low';
  } else if (value < 67) {
    gifSrc = '/gif/cat-shy.gif';
    text = customMessages.meterMedium || 'Half? Seriously?';
    mood = 'medium';
  } else if (value <= 100) {
    gifSrc = '/gif/cat-love.gif';
    text = customMessages.meterHigh || "Aww, that's more like it!";
    mood = 'high';
  }

  return { gifSrc, text, mood };
}

/* ──── Main Component ──── */
export default function LoveTest({ onPass, messages }) {
  const [value, setValue] = useState(0);
  const { gifSrc, text, mood } = getMoodState(value, messages);
  const showNext = value >= 100;

  // Gauge Segments Math — arc radius 160, half-circle = PI * 160 ≈ 502.65
  const arcLength = 502.65;
  const segmentLength = arcLength / 5;

  return (
    <div 
      dir="rtl" 
      className="relative flex flex-col items-center justify-center min-h-screen min-h-[100dvh] bg-cover bg-center bg-no-repeat px-4 py-6 overflow-hidden"
      style={{ backgroundImage: "url('/images/bg.jpg')" }}
    >
      {/* Decorative Corner Images — Large & Responsive */}
      <img src="/images/plane.png" alt="" className="absolute bottom-2 left-2 sm:bottom-6 sm:left-6 md:bottom-10 md:left-10 lg:bottom-16 lg:left-16 w-48 sm:w-64 md:w-72 lg:w-80 h-auto object-contain pointer-events-none drop-shadow-xl -rotate-12 opacity-90" />
      <img src="/images/bird.png" alt="" className="absolute top-2 right-2 sm:top-6 sm:right-6 md:top-10 md:right-10 lg:top-16 lg:right-16 w-48 sm:w-64 md:w-72 lg:w-80 h-auto object-contain pointer-events-none drop-shadow-lg opacity-90" />

      {/* Dynamic GIF Display — Large & Prominent */}
      <motion.div
        className="w-44 h-44 sm:w-52 sm:h-52 md:w-60 md:h-60 mb-3 relative flex items-center justify-center z-10"
        key={mood}
        initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      >
        <img src={gifSrc} alt="Love Status" className="w-full h-full object-contain drop-shadow-2xl" />
      </motion.div>

      {/* Title — Arabic */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-4xl sm:text-5xl md:text-6xl font-bold text-rose-900 mb-3 text-center z-10"
      >
        شكد النسبة
      </motion.h1>

      {/* Dynamic Custom Message Text */}
      <AnimatePresence mode="wait">
        <motion.p
          key={text}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="text-rose-700 font-semibold text-xl sm:text-2xl md:text-3xl mb-3 text-center h-10 z-10"
          style={{ fontFamily: "'Quicksand', sans-serif" }}
        >
          {text}
        </motion.p>
      </AnimatePresence>

      {/* Percentage Display */}
      <motion.div
        className="text-5xl sm:text-6xl text-rose-900 mb-4 tabular-nums z-10 tracking-wide"
        style={{ fontFamily: "'Quicksand', sans-serif", fontWeight: 600 }}
        key={value}
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.1 }}
      >
        {value}%
      </motion.div>

      {/* Gauge and Slider Container (Forced LTR so 0% is left, 100% is right) */}
      <div dir="ltr" className="w-full max-w-[420px] sm:max-w-[480px] flex flex-col items-center z-10">
        
        {/* SVG Custom Speedometer Gauge — Scaled Up */}
        <svg width="420" height="200" viewBox="0 0 420 200" className="drop-shadow-lg overflow-visible w-full max-w-[420px]">
          {/* Slice 1: #fbcfe8 */}
          <path 
            d="M 50 185 A 160 160 0 0 1 370 185" 
            fill="none" 
            stroke="#fbcfe8" 
            strokeWidth="26" 
            strokeDasharray={`${segmentLength} 600`} 
            strokeDashoffset={0} 
            strokeLinecap="butt"
            opacity={value >= 0 ? 1 : 0.3}
            className="transition-opacity duration-300"
          />
          {/* Slice 2: #f472b6 */}
          <path 
            d="M 50 185 A 160 160 0 0 1 370 185" 
            fill="none" 
            stroke="#f472b6" 
            strokeWidth="26" 
            strokeDasharray={`${segmentLength} 600`} 
            strokeDashoffset={-segmentLength}
            strokeLinecap="butt"
            opacity={value >= 20 ? 1 : 0.3}
            className="transition-opacity duration-300"
          />
          {/* Slice 3: #ec4899 */}
          <path 
            d="M 50 185 A 160 160 0 0 1 370 185" 
            fill="none" 
            stroke="#ec4899" 
            strokeWidth="26" 
            strokeDasharray={`${segmentLength} 600`} 
            strokeDashoffset={-segmentLength * 2}
            strokeLinecap="butt"
            opacity={value >= 40 ? 1 : 0.3}
            className="transition-opacity duration-300"
          />
          {/* Slice 4: #be185d */}
          <path 
            d="M 50 185 A 160 160 0 0 1 370 185" 
            fill="none" 
            stroke="#be185d" 
            strokeWidth="26" 
            strokeDasharray={`${segmentLength} 600`} 
            strokeDashoffset={-segmentLength * 3}
            strokeLinecap="butt"
            opacity={value >= 60 ? 1 : 0.3}
            className="transition-opacity duration-300"
          />
          {/* Slice 5: #831843 */}
          <path 
            d="M 50 185 A 160 160 0 0 1 370 185" 
            fill="none" 
            stroke="#831843" 
            strokeWidth="26" 
            strokeDasharray={`${segmentLength} 600`} 
            strokeDashoffset={-segmentLength * 4}
            strokeLinecap="butt"
            opacity={value >= 80 ? 1 : 0.3}
            className="transition-opacity duration-300"
          />

          {/* Cursive "love" text inside bottom center */}
          <text 
            x="210" 
            y="180" 
            fontSize="44" 
            fill="#831843" 
            textAnchor="middle" 
            style={{ fontFamily: "'Great Vibes', 'Dancing Script', cursive", fontWeight: 400 }}
          >
            love
          </text>
        </svg>

        {/* Custom Range Slider — Wider to match gauge */}
        <input
          type="range"
          min="0"
          max="100"
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          className="custom-love-slider w-[340px] sm:w-[380px] mt-1 z-10"
        />
      </div>

      {/* Next Button */}
      <div dir="rtl" className="h-20 mt-6 flex items-center justify-center z-10">
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
              className="px-10 py-4 bg-[#831843] text-white font-bold rounded-full shadow-xl shadow-pink-900/40 hover:bg-[#9f1239] transition-colors text-2xl"
            >
              التالي
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Internal Custom Styles for the Slider */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-love-slider {
          appearance: none;
          background: transparent;
          outline: none;
          cursor: pointer;
        }
        
        /* WebKit (Chrome, Safari, Edge) */
        .custom-love-slider::-webkit-slider-runnable-track {
          width: 100%;
          height: 6px;
          background: #fbcfe8;
          border-radius: 9999px;
          border: none;
        }
        .custom-love-slider::-webkit-slider-thumb {
          appearance: none;
          width: 32px;
          height: 32px;
          background: #831843;
          border-radius: 50%;
          margin-top: -13px;
          box-shadow: 0 4px 10px rgba(131, 24, 67, 0.45);
          transition: transform 0.1s ease;
        }
        .custom-love-slider::-webkit-slider-thumb:active {
          transform: scale(1.18);
        }

        /* Firefox */
        .custom-love-slider::-moz-range-track {
          width: 100%;
          height: 6px;
          background: #fbcfe8;
          border-radius: 9999px;
          border: none;
        }
        .custom-love-slider::-moz-range-thumb {
          width: 32px;
          height: 32px;
          background: #831843;
          border-radius: 50%;
          border: none;
          box-shadow: 0 4px 10px rgba(131, 24, 67, 0.45);
          transition: transform 0.1s ease;
        }
        .custom-love-slider::-moz-range-thumb:active {
          transform: scale(1.18);
        }
      `}} />
    </div>
  )
}
