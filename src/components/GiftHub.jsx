import { motion } from 'framer-motion'

/* ──── Main Component ──── */
export default function GiftHub({ onSelectGift }) {
  const gifts = [
    { key: 'bouquet', label: '🌹 باقة ورد' },
    { key: 'scrapbook', label: '📸 ألبوم صور' },
    { key: 'letter', label: '💌 رسالة' },
  ]

  return (
    <div
      dir="rtl"
      className="relative w-full min-h-screen min-h-[100dvh] bg-cover bg-center bg-no-repeat flex flex-col items-center overflow-hidden"
      style={{ backgroundImage: "url('/images/bg.jpg')" }}
    >
      {/* Decorative Corner Images */}
      <img src="/images/bird.png" alt="" className="absolute top-0 right-0 w-48 sm:w-64 md:w-80 lg:w-96 h-auto object-contain pointer-events-none drop-shadow-lg opacity-80 z-0" />
      <img src="/images/flowers.png" alt="" className="absolute bottom-0 left-0 w-48 sm:w-64 md:w-80 lg:w-96 h-auto object-contain pointer-events-none drop-shadow-xl opacity-80 z-0" />

      {/* Content — title at top, gifts fill remaining space */}
      <div className="relative z-10 flex flex-col items-center w-full flex-1">

        {/* Title Block */}
        <div className="pt-[6vh] sm:pt-[8vh] flex flex-col items-center gap-8">
          <motion.h1
            initial={{ opacity: 0, y: -30, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.15, type: 'spring', stiffness: 160, damping: 14 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-pink-500 text-center drop-shadow-lg font-arabic whitespace-nowrap px-4"
          >
            لقد نجحتِ في الاختبار!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-rose-800 mt-2 sm:mt-4 text-center font-arabic"
          >
            مفاجآتكِ في انتظاركِ ✨
          </motion.p>
        </div>

        {/* Gifts — centered in remaining space, edge-to-edge */}
        <div className="flex-1 flex items-center justify-center w-full px-4 sm:px-8 md:px-12 py-4">
          <div className="flex flex-row justify-between items-center w-full max-w-[1400px] gap-6 sm:gap-8 md:gap-12">
            {gifts.map((gift, i) => (
              <motion.div
                key={gift.key}
                initial={{ opacity: 0, y: 60, scale: 0.6 }}
                animate={{
                  opacity: 1, y: 0, scale: 1,
                  transition: { delay: 0.4 + i * 0.18, type: 'spring', stiffness: 300, damping: 20 }
                }}
                whileHover={{ scale: 1.08, y: -15, transition: { type: 'tween', duration: 0.15, ease: 'easeOut' } }}
                whileTap={{ scale: 0.95, transition: { type: 'tween', duration: 0.1 } }}
                transition={{ type: 'tween', duration: 0.15, ease: 'easeOut' }}
                onClick={() => onSelectGift(gift.key)}
                className="cursor-pointer flex items-center justify-center flex-1"
              >
                <img
                  src="/images/gift.png"
                  alt={gift.label}
                  className="w-full max-w-[195px] sm:max-w-[240px] md:max-w-[285px] lg:max-w-[315px] h-auto object-contain drop-shadow-2xl"
                />
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
