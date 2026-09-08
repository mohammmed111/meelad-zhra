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
      className="relative w-full min-h-screen min-h-[100dvh] bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center overflow-hidden px-4 py-10"
      style={{ backgroundImage: "url('/images/bg.jpg')" }}
    >
      {/* Decorative Corner Images — same as page 1 */}
      <img src="/images/flowers.png" alt="" className="absolute -bottom-4 -left-4 sm:bottom-0 sm:left-0 md:bottom-4 md:left-4 lg:bottom-8 lg:left-8 w-52 sm:w-72 lg:w-80 h-auto object-contain pointer-events-none drop-shadow-xl opacity-80 z-0" />
      <img src="/images/bird.png" alt="" className="absolute -top-2 -right-2 sm:top-0 sm:right-0 md:top-4 md:right-4 lg:top-8 lg:right-8 w-52 sm:w-72 lg:w-80 h-auto object-contain pointer-events-none drop-shadow-lg opacity-80 z-0" />

      {/* Content wrapper */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-5xl mx-auto gap-4">

        {/* Main Title — Massive */}
        <motion.h1
          initial={{ opacity: 0, y: -30, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.15, type: 'spring', stiffness: 160, damping: 14 }}
          className="text-5xl md:text-7xl font-black text-pink-500 mb-4 text-center drop-shadow-lg font-arabic"
        >
          لقد نجحتِ في الاختبار!
        </motion.h1>

        {/* Subtitle — Prominent */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="text-2xl md:text-3xl font-bold text-rose-800 mb-12 text-center font-arabic"
        >
          مفاجآتكِ في انتظاركِ ✨
        </motion.p>

        {/* Giant Gift Boxes Row */}
        <div className="flex flex-row justify-center items-center gap-6 md:gap-12">
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
                onClick={() => onSelectGift(gift.key)}
                className="cursor-pointer flex flex-col items-center"
              >
                {/* Gift Image — MASSIVE */}
                <img
                  src="/images/gift.png"
                  alt={gift.label}
                  className={`w-40 h-40 sm:w-56 sm:h-56 md:w-72 md:h-72 object-contain cursor-pointer transform transition-transform duration-150 ease-in-out hover:scale-110 active:scale-95 ${
                    isCenter ? '-translate-y-4' : ''
                  }`}
                />

                {/* Gift Label */}
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 + i * 0.15 }}
                  className="mt-3 inline-block px-5 py-2 bg-white/70 backdrop-blur-sm rounded-full text-rose-700 font-bold text-sm md:text-base shadow-md border border-pink-200 font-arabic"
                >
                  {gift.label}
                </motion.span>
              </motion.div>
            )
          })}
        </div>

        {/* Tap hint — pulsing */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0.5, 1] }}
          transition={{ delay: 1.4, duration: 2, repeat: Infinity }}
          className="mt-10 text-rose-700 text-lg md:text-xl font-semibold font-arabic"
        >
          اضغطي على الهدية لفتحها 🎁
        </motion.p>

      </div>{/* End Content Wrapper */}
    </div>
  )
}
