export default function TheBouquet({ onBack, bubbleTexts }) {
  const rightTexts = bubbleTexts
    ? bubbleTexts.slice(0, 3)
    : ["أنتِ تجعلين قلبي يزهر.", "الحياة تبدو أحلى معكِ.", "أنتِ تجعلين كل لحظة أجمل."]

  const leftTexts = bubbleTexts
    ? bubbleTexts.slice(3, 6)
    : ["أختاركِ في كل يوم.", "حبي لكِ يكبر دائماً.", "قلبي سيختاركِ دائماً."]

  return (
    <div className="relative w-full min-h-screen bg-[url('/images/bg.jpg')] bg-cover bg-center bg-no-repeat overflow-hidden flex flex-col" dir="rtl">
      {/* Absolute Corners */}
      <img src="/images/corner.png" className="absolute top-0 right-0 w-64 md:w-96 lg:w-[450px] object-contain transform rotate-180 z-0 pointer-events-none animate-pulse duration-1000" alt="corner" />
      <img src="/images/corner.png" className="absolute bottom-0 left-0 w-64 md:w-96 lg:w-[450px] object-contain z-0 pointer-events-none animate-pulse duration-1000" alt="corner" />

      {/* Top Bar - Title exactly centered with animation, Next button on the side */}
      <div className="relative z-20 flex justify-between items-center w-full max-w-[1600px] mx-auto px-8 pt-10 h-24">
        <button onClick={onBack} className="bg-white/90 border-2 border-pink-200 text-rose-600 font-arabic text-xl font-bold px-8 py-3 rounded-full shadow-md hover:scale-110 transition-transform duration-300 z-10">التالي ➔</button>
        <h1 className="absolute left-1/2 transform -translate-x-1/2 text-4xl sm:text-6xl md:text-7xl font-arabic text-rose-600 font-black drop-shadow-md">الورد للورد</h1>
      </div>

      {/* Main Content Grid - Massive Spacing */}
      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-4 py-8 flex-1 flex items-center justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-16 w-full items-center justify-items-center">

          {/* Column 1 (Visual Right in RTL - Tails point Left to bouquet) */}
          <div className="flex flex-col gap-10 w-full max-w-[300px] lg:max-w-[400px]">
            {rightTexts.map((text, i) => (
              <div key={`right-${i}`} className="relative bg-[#fdfbf7] border-2 border-pink-200 rounded-[2rem] p-6 lg:p-8 shadow-lg w-full hover:scale-105 transition-transform duration-300">
                <div className="absolute top-1/2 -left-3 w-6 h-6 bg-[#fdfbf7] border-l-2 border-b-2 border-pink-200 transform -translate-y-1/2 rotate-45 z-0"></div>
                <p className="relative z-10 font-arabic text-rose-800 text-xl lg:text-3xl text-center font-bold leading-relaxed">{text}</p>
              </div>
            ))}
          </div>

          {/* Column 2 (Center - MASSIVE Frame & Floating Bouquet) */}
          <div className="relative flex items-center justify-center w-[350px] h-[450px] lg:w-[550px] lg:h-[750px] mx-4">
            <img src="/images/frame.png" className="absolute w-full h-full object-contain drop-shadow-xl z-0" alt="frame" />
            <img src="/images/bouquet.png" className="relative z-10 w-[280px] lg:w-[450px] object-contain drop-shadow-2xl hover:scale-110 transition-transform duration-300" alt="bouquet" />
          </div>

          {/* Column 3 (Visual Left in RTL - Tails point Right to bouquet) */}
          <div className="flex flex-col gap-10 w-full max-w-[300px] lg:max-w-[400px]">
            {leftTexts.map((text, i) => (
              <div key={`left-${i}`} className="relative bg-[#fdfbf7] border-2 border-pink-200 rounded-[2rem] p-6 lg:p-8 shadow-lg w-full hover:scale-105 transition-transform duration-300">
                <div className="absolute top-1/2 -right-3 w-6 h-6 bg-[#fdfbf7] border-r-2 border-t-2 border-pink-200 transform -translate-y-1/2 rotate-45 z-0"></div>
                <p className="relative z-10 font-arabic text-rose-800 text-xl lg:text-3xl text-center font-bold leading-relaxed">{text}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  )
}
