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
    /* OUTER: Full-screen background + absolute corner decorations */
    <div 
      dir="rtl" 
      className="relative w-full min-h-screen min-h-[100dvh] bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{ backgroundImage: "url('/images/bg.jpg')" }}
    >
      {/* Decorative Corner Images — pinned to actual screen corners */}
      <img src="/images/plane.png" alt="" className="absolute -bottom-4 -left-4 sm:bottom-0 sm:left-0 md:bottom-4 md:left-4 lg:bottom-8 lg:left-8 w-64 sm:w-80 lg:w-96 h-auto object-contain pointer-events-none drop-shadow-xl -rotate-12 opacity-90 z-0" />
      <img src="/images/bird.png" alt="" className="absolute -top-2 -right-2 sm:top-0 sm:right-0 md:top-4 md:right-4 lg:top-8 lg:right-8 w-64 sm:w-80 lg:w-96 h-auto object-contain pointer-events-none drop-shadow-lg opacity-90 z-0" />

      {/* INNER: Centered content wrapper */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-4xl mx-auto min-h-screen min-h-[100dvh] gap-6 px-4 py-6">

        {/* Dynamic GIF Display — Massive & Prominent */}
        <motion.div
          className="w-[220px] h-[220px] sm:w-[280px] sm:h-[280px] relative flex items-center justify-center"
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
          className="text-[40px] sm:text-[50px] font-bold text-rose-900 text-center"
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
            className="text-[28px] sm:text-[34px] text-rose-700 font-semibold text-center"
            style={{ fontFamily: "'Quicksand', sans-serif" }}
          >
            {text}
          </motion.p>
        </AnimatePresence>

        {/* Percentage Display */}
        <motion.div
          className="text-[50px] sm:text-[60px] font-black text-rose-900 tabular-nums tracking-wide leading-none"
          style={{ fontFamily: "'Quicksand', sans-serif" }}
          key={value}
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.1 }}
        >
          {value}%
        </motion.div>

        {/* Gauge and Slider Container (Forced LTR so 0% is left, 100% is right) */}
        <div dir="ltr" className="w-[350px] sm:w-[450px] flex flex-col items-center">
          
          {/* SVG Custom Speedometer Gauge — Scaled Up */}
          <svg viewBox="0 0 420 200" className="w-full drop-shadow-lg overflow-visible">
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
            className="custom-love-slider w-full px-2 mt-1"
          />
        </div>

        {/* Next Button */}
        <div dir="rtl" className="h-20 mt-2 flex items-center justify-center">
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

      </div>{/* End Inner Content Wrapper */}

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
          height: 10px;
          background: #fbcfe8;
          border-radius: 9999px;
          border: none;
        }
        .custom-love-slider::-webkit-slider-thumb {
          appearance: none;
          width: 40px;
          height: 40px;
          background: #831843;
          border-radius: 50%;
          margin-top: -15px;
          box-shadow: 0 4px 14px rgba(131, 24, 67, 0.5);
          transition: transform 0.1s ease;
        }
        .custom-love-slider::-webkit-slider-thumb:active {
          transform: scale(1.18);
        }

        /* Firefox */
        .custom-love-slider::-moz-range-track {
          width: 100%;
          height: 10px;
          background: #fbcfe8;
          border-radius: 9999px;
          border: none;
        }
        .custom-love-slider::-moz-range-thumb {
          width: 40px;
          height: 40px;
          background: #831843;
          border-radius: 50%;
          border: none;
          box-shadow: 0 4px 14px rgba(131, 24, 67, 0.5);
          transition: transform 0.1s ease;
        }
        .custom-love-slider::-moz-range-thumb:active {
          transform: scale(1.18);
        }
      `}} />
    </div>
  )
}
