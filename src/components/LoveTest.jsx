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
          className="text-[40px] sm:text-[50px] font-bold text-rose-900 text-center font-arabic"
        >
          كم النسبة؟
        </motion.h1>

        {/* Dynamic Custom Message Text */}
        <AnimatePresence mode="wait">
          <motion.p
            key={text}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="text-[28px] sm:text-[34px] text-rose-700 font-semibold text-center font-arabic"
          >
            {text}
          </motion.p>
        </AnimatePresence>

        {/* Percentage Readout */}
        <motion.div
          className="love-meter-readout"
          key={value}
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.1 }}
          style={{ direction: 'ltr' }}
        >
          {value}%
        </motion.div>

        {/* Gauge and Slider Container (Forced LTR so 0% is left, 100% is right) */}
        <div dir="ltr" className="w-[350px] sm:w-[450px] flex flex-col items-center">

          {/* SVG Love Meter Gauge */}
          <svg viewBox="0 0 400 250" className="w-full overflow-visible" style={{ touchAction: 'none', cursor: 'pointer' }}>
            <defs>
              {/* Soft shadow for inner disc */}
              <filter id="soft" x="-30%" y="-30%" width="160%" height="160%">
                <feDropShadow dx="0" dy="3" stdDeviation="5" floodColor="#C11B4B" floodOpacity=".16" />
              </filter>
              {/* Heart symbol */}
              <symbol id="heart" viewBox="0 0 32 30">
                <path d="M16 28C16 28 2 19.6 2 10.4 2 5.6 5.8 2 10.2 2c2.6 0 4.8 1.3 5.8 3.2C17 3.3 19.2 2 21.8 2 26.2 2 30 5.6 30 10.4 30 19.6 16 28 16 28z" />
              </symbol>
            </defs>

            {/* 6 Annular Segments */}
            {(() => {
              const CX = 200, CY = 210;
              const R_IN = 96, R_OUT = 152;
              const SEGMENTS = 6;
              const STEP = 180 / SEGMENTS;
              const GAP = 1.3;
              const COLORS = ['#F8C8D4', '#F3A0B7', '#ED7796', '#E44E73', '#CE2151', '#A6103D'];

              const polar = (angle, r) => {
                const a = angle * Math.PI / 180;
                return [CX + r * Math.cos(a), CY - r * Math.sin(a)];
              };

              const sectorPath = (a0, a1) => {
                const [x1, y1] = polar(a0, R_OUT);
                const [x2, y2] = polar(a1, R_OUT);
                const [x3, y3] = polar(a1, R_IN);
                const [x4, y4] = polar(a0, R_IN);
                return `M${x1} ${y1} A${R_OUT} ${R_OUT} 0 0 1 ${x2} ${y2} L${x3} ${y3} A${R_IN} ${R_IN} 0 0 0 ${x4} ${y4} Z`;
              };

              const reached = value / 100 * SEGMENTS;

              const segments = [];
              for (let i = 0; i < SEGMENTS; i++) {
                const start = 180 - i * STEP - GAP / 2;
                const end = 180 - (i + 1) * STEP + GAP / 2;
                const active = reached >= i + 0.5;
                segments.push(
                  <path
                    key={`seg-${i}`}
                    d={sectorPath(start, end)}
                    fill={COLORS[i]}
                    stroke={COLORS[i]}
                    strokeWidth="7"
                    strokeLinejoin="round"
                    style={{
                      opacity: active ? 1 : 0.28,
                      transform: active ? 'scale(1)' : 'scale(0.985)',
                      transformOrigin: `${CX}px ${CY}px`,
                      transition: 'transform .45s cubic-bezier(.34,1.3,.5,1), opacity .3s ease',
                    }}
                  />
                );
              }

              // Hearts at arc ends
              const heartData = [
                { angle: 166, opacity: 0.55, fill: '#E98AA6' },
                { angle: 14, opacity: 1, fill: '#fff' },
              ];
              const hearts = heartData.map((h, i) => {
                const [x, y] = polar(h.angle, 124);
                return (
                  <use
                    key={`heart-${i}`}
                    href="#heart"
                    width="26"
                    height="24"
                    x={x - 13}
                    y={y - 12}
                    fill={h.fill}
                    opacity={h.opacity}
                    transform={`rotate(${90 - h.angle} ${x} ${y})`}
                  />
                );
              });

              // Needle rotation: 0% = -90deg (left), 100% = +90deg (right)
              const needleRotation = (value / 100) * 180 - 90;

              return (
                <>
                  <g>{segments}</g>
                  <g>{hearts}</g>

                  {/* Inner half-disc */}
                  <path d="M108 210 A92 92 0 0 1 292 210 Z" fill="#FFF7F9" filter="url(#soft)" />
                  <text x="200" y="196" textAnchor="middle"
                    fontFamily="'Great Vibes', cursive" fontSize="62" fill="#C11B4B">love</text>

                  {/* Needle */}
                  <g style={{
                    transform: `rotate(${needleRotation}deg)`,
                    transformOrigin: `${CX}px ${CY}px`,
                    transition: 'transform .45s cubic-bezier(.34,1.3,.5,1)',
                  }}>
                    <path d={`M197 ${CY} L200 74 L203 ${CY} Z`} fill="#C11B4B" />
                    <circle cx="200" cy={CY} r="13" fill="#fff" stroke="#C11B4B" strokeWidth="4" />
                  </g>
                </>
              );
            })()}
          </svg>

          {/* Custom Range Slider */}
          <input
            type="range"
            min="0"
            max="100"
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
            className="love-meter-slider"
            style={{ '--fill': `${value}%` }}
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
                className="px-10 py-4 bg-[#831843] text-white font-bold rounded-full shadow-xl shadow-pink-900/40 hover:bg-[#9f1239] transition-colors text-2xl font-arabic"
              >
                التالي
              </motion.button>
            )}
          </AnimatePresence>
        </div>

      </div>{/* End Inner Content Wrapper */}

      {/* Internal Custom Styles for the Love Meter */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@600;800&family=Great+Vibes&display=swap');

        .love-meter-readout {
          font-family: 'Baloo 2', system-ui, sans-serif;
          font-size: clamp(34px, 11vw, 46px);
          font-weight: 800;
          color: #C11B4B;
          line-height: 1;
          letter-spacing: 0.5px;
          margin-bottom: 6px;
          font-variant-numeric: tabular-nums;
        }

        .love-meter-slider {
          -webkit-appearance: none;
          appearance: none;
          width: 100%;
          height: 26px;
          margin-top: 14px;
          background: transparent;
          direction: ltr;
          cursor: grab;
        }
        .love-meter-slider:active { cursor: grabbing; }

        /* Track */
        .love-meter-slider::-webkit-slider-runnable-track {
          height: 6px;
          border-radius: 99px;
          background: linear-gradient(to right,
            #C11B4B 0% var(--fill, 0%), #F6CCD7 var(--fill, 0%) 100%);
        }
        .love-meter-slider::-moz-range-track {
          height: 6px;
          border-radius: 99px;
          background: #F6CCD7;
        }
        .love-meter-slider::-moz-range-progress {
          height: 6px;
          border-radius: 99px;
          background: #C11B4B;
        }

        /* Thumb */
        .love-meter-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 18px;
          height: 18px;
          margin-top: -6px;
          border-radius: 50%;
          background: #C11B4B;
          border: 3px solid #fff;
          box-shadow: 0 2px 6px rgba(166, 16, 61, 0.35);
        }
        .love-meter-slider::-moz-range-thumb {
          width: 18px;
          height: 18px;
          border: 3px solid #fff;
          border-radius: 50%;
          background: #C11B4B;
          box-shadow: 0 2px 6px rgba(166, 16, 61, 0.35);
        }
        .love-meter-slider:focus-visible { outline: none; }
        .love-meter-slider:focus-visible::-webkit-slider-thumb {
          box-shadow: 0 0 0 4px rgba(193, 27, 75, 0.28);
        }
        .love-meter-slider:focus-visible::-moz-range-thumb {
          box-shadow: 0 0 0 4px rgba(193, 27, 75, 0.28);
        }

        @media (prefers-reduced-motion: reduce) {
          .love-meter-slider, svg path, svg g { transition: none !important; }
        }
      `}} />
    </div>
  )
}
