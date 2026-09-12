import { motion } from 'framer-motion'

/* ──── Main Component ──── */
export default function GiftHub({ onSelectGift }) {
  const gifts = [
    { key: 'bouquet', label: '🌹 باقة ورد' },
    { key: 'scrapbook', label: '📸 ألبوم صور' },
    { key: 'letter', label: '💌 رسالة' },
  ]

  return (
    /* Full-screen watercolor background — matches LoveTest page */
    <div
      dir="rtl"
      className="relative w-full min-h-screen min-h-[100dvh] bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center overflow-hidden px-2 py-6"
      style={{ backgroundImage: "url('/images/bg.jpg')" }}
    >
      {/* Decorative Corner Images — flowers & birds, subtle and coordinated */}
      <img
        src="/images/flowers.png"
        alt=""
        className="absolute bottom-0 left-0 w-64 sm:w-80 md:w-96 lg:w-[28rem] h-auto object-contain pointer-events-none drop-shadow-xl opacity-80 z-0"
      />
      <img
        src="/images/bird.png"
        alt=""
        className="absolute top-0 right-0 w-64 sm:w-80 md:w-96 lg:w-[28rem] h-auto object-contain pointer-events-none drop-shadow-lg opacity-80 z-0"
      />

      {/* Content wrapper — vertically centered, full width */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-6xl mx-auto">

        {/* Main Title — Extra Large */}
        <motion.h1
          initial={{ opacity: 0, y: -30, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.15, type: 'spring', stiffness: 160, damping: 14 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-pink-500 mb-4 md:mb-6 text-center drop-shadow-lg font-arabic"
        >
          لقد نجحتِ في الاختبار!
        </motion.h1>

        {/* Subtitle — Large and clear */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-rose-800 mb-12 md:mb-20 text-center font-arabic"
        >
          مفاجآتكِ في انتظاركِ ✨
        </motion.p>

        {/* Giant Gift Boxes Row — spread across full width */}
        <div className="flex flex-row justify-center items-end gap-2 sm:gap-4 md:gap-8 w-full px-2 sm:px-8 mt-4 md:mt-8">
          {gifts.map((gift, i) => {
            const isCenter = i === 1
            return (
              <motion.div
                key={gift.key}
                initial={{ opacity: 0, y: 60, scale: 0.6 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  delay: 0.4 + i * 0.18,
                  type: 'spring',
                  stiffness: 170,
                  damping: 14,
                }}
                whileHover={{ scale: 1.08, y: -15, transition: { duration: 0.1 } }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onSelectGift(gift.key)}
                className={`cursor-pointer flex flex-col items-center flex-1 ${isCenter ? 'z-10' : '-translate-y-6 md:-translate-y-12 lg:-translate-y-16 z-0'}`}
              >
                {/* Gift Image — MASSIVE, filling available space */}
                <img
                  src="/images/gift.png"
                  alt={gift.label}
                  className={`w-full h-auto object-contain cursor-pointer transition-all duration-75 ease-in-out drop-shadow-2xl ${isCenter ? 'max-w-[280px] sm:max-w-[360px] md:max-w-[460px] lg:max-w-[560px]' : 'max-w-[220px] sm:max-w-[280px] md:max-w-[360px] lg:max-w-[420px]'}`}
                />
              </motion.div>
            )
          })}
        </div>

        {/* Tap hint — subtle pulsing, below gifts */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0.5, 1] }}
          transition={{ delay: 1.4, duration: 2, repeat: Infinity }}
          className="mt-8 md:mt-12 text-rose-700 text-lg md:text-xl font-semibold font-arabic"
        >
          اضغطي على الهدية لفتحها 🎁
        </motion.p>

      </div>{/* End Content Wrapper */}
    </div>
  )
}
