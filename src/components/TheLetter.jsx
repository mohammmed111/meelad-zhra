export default function TheLetter({ onBack, letterContent }) {
  const defaultText = [
    "أنتِ تجعلين حياتي أجمل وذات معنى أعمق، وأشعر بأنني محظوظ جداً بوجودكِ. أحبكِ من كل قلبي، ولا أطيق الانتظار لأكمل عمري كله في حبكِ.",
    "أنتِ تزرعين الابتسامة على وجهي، وتمنحينني الأمان، وتملئين عالمي بالسعادة. أعلم أنني أخبركِ بهذا كل يوم، ولكنكِ حقاً أجمل إنسانة في عيني.",
    "شكراً لكونكِ أنتِ، ولأنكِ تملئين قلبي بهذا القدر من الحب. مهما حدث، سأختاركِ دائماً وأبداً."
  ];

  const paragraphs = letterContent 
    ? letterContent.split('\n').filter(p => p.trim() !== '') 
    : defaultText;
  return (
    <div className="relative w-full min-h-screen bg-[url('/images/bg.jpg')] bg-cover bg-center bg-no-repeat overflow-hidden flex items-center justify-center">
      
      {/* Title - Top Left */}
      <div className="absolute top-4 left-6 md:top-8 md:left-10 z-20">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-arabic text-rose-500 font-black drop-shadow-md">
          رسالة من قلبي
        </h1>
      </div>

      {/* Next Button - Bottom Right */}
      <div className="absolute bottom-4 right-6 md:bottom-8 md:right-10 z-20">
        <button onClick={onBack} className="bg-white/90 border-2 border-pink-200 text-rose-500 font-arabic text-2xl lg:text-3xl font-bold px-10 lg:px-14 py-4 lg:py-5 rounded-full shadow-md hover:scale-105 transition-transform duration-200">
          التالي ➔
        </button>
      </div>

      {/* Flower Branch - Right Edge */}
      <img src="/images/flower-branch.png" className="absolute right-0 top-1/2 transform -translate-y-1/2 w-64 md:w-80 lg:w-[500px] object-contain z-10 drop-shadow-xl" alt="flowers" />

      {/* Cute Cat - Bottom Left */}
      <img src="/gif/cat-heart.gif" className="absolute left-0 md:left-[2%] lg:left-[4%] bottom-[-2%] w-64 md:w-96 lg:w-[500px] object-contain z-30 drop-shadow-lg" alt="cute cat" />

      {/* The Letter Paper */}
      <div className="relative w-[92vw] max-w-[1400px] h-[85vh] min-h-[700px] flex items-center justify-center z-20 mt-4">
        <img src="/images/letter-bg.png" className="absolute top-0 left-0 w-full h-full object-fill drop-shadow-2xl z-0 rounded-xl" alt="letter paper" />
        
        {/* The Text Content */}
        <div className="relative z-10 w-full h-full flex flex-col justify-center gap-6 md:gap-12 font-arabic text-amber-950 text-2xl md:text-[34px] leading-relaxed md:leading-[2.2] font-bold px-16 md:px-32 py-20 overflow-y-auto" dir="rtl">
          {paragraphs.map((text, index) => (
            <p key={index}>{text}</p>
          ))}
          <p className="text-left text-rose-500 text-4xl md:text-6xl mt-6 md:mt-12 drop-shadow-md font-black">
            دائماً، وإلى الأبد. ❤️
          </p>
        </div>
      </div>

    </div>
  )
}
