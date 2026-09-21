export default function TheBouquet({ onBack, bubbleTexts }) {
  const rightTexts = bubbleTexts
    ? bubbleTexts.slice(0, 3)
    : ["أنتِ تجعلين قلبي يزهر.", "الحياة تبدو أحلى معكِ.", "أنتِ تجعلين كل لحظة أجمل."]

  const leftTexts = bubbleTexts
    ? bubbleTexts.slice(3, 6)
    : ["أختاركِ في كل يوم.", "حبي لكِ يكبر دائماً.", "قلبي سيختاركِ دائماً."]

  return (
    <div className="relative w-full min-h-screen bg-[url('/images/bg.jpg')] bg-cover bg-center bg-no-repeat overflow-hidden flex flex-col" dir="rtl">

      {/* Corner Images */}
      <img
        src="/images/COVERR-1.png"
        alt="cover-lily"
        style={{ position: 'fixed', top: '-30px', left: '-30px', width: '500px', maxWidth: 'none', opacity: 0.85, zIndex: 1, pointerEvents: 'none' }}
      />
      <img
        src="/images/COVER-1.png"
        alt="cover-swan"
        style={{ position: 'fixed', bottom: '-30px', right: '-30px', width: '500px', maxWidth: 'none', opacity: 0.85, zIndex: 1, pointerEvents: 'none' }}
      />

      {/* Top Bar */}
      <div style={{ position: 'relative', zIndex: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', padding: '32px 32px 0' }}>
        <button onClick={onBack} className="bg-white/90 border-2 border-pink-200 text-rose-600 font-arabic font-bold rounded-full shadow-md hover:scale-110 hover:bg-white transition-all duration-300" style={{ fontSize: '1.25rem', padding: '12px 32px', zIndex: 10 }}>
          التالي ➔
        </button>
        <h1 className="font-arabic text-rose-600 font-black drop-shadow-md" style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}>
          الورد للورد
        </h1>
      </div>

      {/* ===== MAIN 3-COLUMN LAYOUT — 95vw wide, max 1600px ===== */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        width: '95vw',
        maxWidth: '1600px',
        margin: '0 auto',
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px 0',
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>

          {/* Right bubbles in RTL — pushed to far edge */}
          <div style={{ width: '22%', display: 'flex', flexDirection: 'column', gap: '64px', flexShrink: 0, alignItems: 'flex-end' }}>
            {rightTexts.map((text, i) => (
              <div key={`right-${i}`} style={{
                position: 'relative',
                width: '250px',
                padding: '20px 22px',
                backgroundColor: '#fdfbf7',
                border: '2px solid #fbcfe8',
                borderRadius: '1.5rem',
                boxShadow: '0 3px 10px rgba(0,0,0,0.06)',
                marginLeft: i === 1 ? '-48px' : '0',
              }}>
                <div style={{ position: 'absolute', top: '50%', left: '-10px', width: '18px', height: '18px', backgroundColor: '#fdfbf7', borderLeft: '2px solid #fbcfe8', borderBottom: '2px solid #fbcfe8', transform: 'translateY(-50%) rotate(45deg)' }}></div>
                <p className="font-arabic" style={{ color: '#9f1239', fontSize: '1.25rem', fontWeight: 700, textAlign: 'center', lineHeight: 1.6, position: 'relative', zIndex: 10, fontStyle: 'italic' }}>{text}</p>
              </div>
            ))}
          </div>

          {/* ===== CENTER — 45% width, frame fills 80vh, bouquet scale(1.4) ===== */}
          <div style={{ width: '45%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <div style={{ position: 'relative', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img
                src="/images/frame.png"
                alt="frame"
                style={{ width: '100%', maxHeight: '80vh', objectFit: 'contain', filter: 'drop-shadow(0 10px 25px rgba(0,0,0,0.1))' }}
              />
              <img
                src="/images/bouquet.png"
                alt="bouquet"
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  transform: 'translate(-50%, -50%) scale(1.4)',
                  transformOrigin: 'center',
                  filter: 'drop-shadow(0 8px 20px rgba(0,0,0,0.12))',
                }}
              />
            </div>
          </div>

          {/* Left bubbles in RTL — pushed to far edge */}
          <div style={{ width: '22%', display: 'flex', flexDirection: 'column', gap: '64px', flexShrink: 0, alignItems: 'flex-start' }}>
            {leftTexts.map((text, i) => (
              <div key={`left-${i}`} style={{
                position: 'relative',
                width: '250px',
                padding: '20px 22px',
                backgroundColor: '#fdfbf7',
                border: '2px solid #fbcfe8',
                borderRadius: '1.5rem',
                boxShadow: '0 3px 10px rgba(0,0,0,0.06)',
                marginRight: i === 1 ? '-48px' : '0',
              }}>
                <div style={{ position: 'absolute', top: '50%', right: '-10px', width: '18px', height: '18px', backgroundColor: '#fdfbf7', borderRight: '2px solid #fbcfe8', borderTop: '2px solid #fbcfe8', transform: 'translateY(-50%) rotate(45deg)' }}></div>
                <p className="font-arabic" style={{ color: '#9f1239', fontSize: '1.25rem', fontWeight: 700, textAlign: 'center', lineHeight: 1.6, position: 'relative', zIndex: 10, fontStyle: 'italic' }}>{text}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  )
}
