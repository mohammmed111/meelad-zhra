export default function TheBouquet({ onBack, bubbleTexts }) {
  const defaultRight = ["أنتِ تجعلين قلبي يزهر.", "الحياة تبدو أحلى معكِ.", "أنتِ تجعلين كل لحظة أجمل."]
  const defaultLeft = ["أختاركِ في كل يوم.", "حبي لكِ يكبر دائماً.", "قلبي سيختاركِ دائماً."]

  const rightTexts = bubbleTexts ? bubbleTexts.slice(0, 3) : defaultRight
  const leftTexts = bubbleTexts ? bubbleTexts.slice(3, 6) : defaultLeft

  const frames = ['/images/frame-1.png', '/images/frame-2.png', '/images/frame-3.png']

  const textStyle = {
    color: '#5a0a18',
    fontSize: '1.3rem',
    fontWeight: '900',
    lineHeight: 1.5,
    textAlign: 'center',
    padding: '0 18px',
    fontStyle: 'italic',
    textShadow: '1px 1px 2px rgba(255,255,255,0.7)',
  }

  /* Frame container — absolutely positioned, NO scale (use raw size) */
  const baseFrame = (frameUrl) => ({
    position: 'absolute',
    width: '32vw',
    minWidth: '420px',
    maxWidth: '460px',
    minHeight: '140px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundImage: `url('${frameUrl}')`,
    backgroundSize: '100% 100%',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.08))',
    padding: '16px 12px',
    zIndex: 5,
  })

  return (
    <div className="relative w-full min-h-screen bg-[url('/images/bg.jpg')] bg-cover bg-center bg-no-repeat" dir="rtl" style={{ overflow: 'clip' }}>

      {/* ── Corner Images ── */}
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

      {/* ── Top Bar ── */}
      <div style={{ position: 'relative', zIndex: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', padding: '32px 32px 0' }}>
        <button onClick={onBack} className="bg-white/90 border-2 border-pink-200 text-rose-600 font-arabic font-bold rounded-full shadow-md hover:scale-110 hover:bg-white transition-all duration-300" style={{ fontSize: '1.25rem', padding: '12px 32px', zIndex: 10 }}>
          التالي ➔
        </button>
        <h1 className="font-arabic text-rose-600 font-black drop-shadow-md" style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}>
          الورد للورد
        </h1>
      </div>

      {/* ===== MAIN AREA ===== */}
      <div style={{
        position: 'relative',
        width: '100%',
        height: 'calc(100vh - 100px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>

        {/* ── CENTER — wavy pink frame + bouquet ── */}
        <div style={{
          position: 'relative',
          width: 'clamp(350px, 45vw, 650px)',
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <img
            src="/images/frame.png"
            alt="frame"
            style={{ width: '100%', maxHeight: '75vh', objectFit: 'contain', filter: 'drop-shadow(0 10px 25px rgba(0,0,0,0.1))' }}
          />
          <img
            src="/images/bouquet.png"
            alt="bouquet"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '100%',
              maxWidth: 'none',
              height: 'auto',
              objectFit: 'contain',
              transform: 'translate(-50%, -50%) scale(1.4)',
              filter: 'drop-shadow(0 8px 20px rgba(0,0,0,0.12))',
            }}
          />
        </div>

        {/* ══════════════════════════════════════
            LEFT SIDE (visual left)
            Zig-zag: top=inward, middle=outward, bottom=inward
        ══════════════════════════════════════ */}

        {/* Left Top — pulled inward */}
        <div style={{
          ...baseFrame(frames[0]),
          top: '12%',
          left: '22%',
          transform: 'scale(1.1) rotate(-2deg)',
        }}>
          <p className="font-arabic" style={textStyle}>{leftTexts[0]}</p>
        </div>

        {/* Left Middle — pushed outward (zig) */}
        <div style={{
          ...baseFrame(frames[1]),
          top: '50%',
          left: '12%',
          transform: 'translateX(-20px) translateY(-50%) scale(1.1) rotate(1deg)',
        }}>
          <p className="font-arabic" style={textStyle}>{leftTexts[1]}</p>
        </div>

        {/* Left Bottom — pulled inward */}
        <div style={{
          ...baseFrame(frames[2]),
          bottom: '10%',
          left: '20%',
          transform: 'scale(1.1) rotate(-1deg)',
        }}>
          <p className="font-arabic" style={textStyle}>{leftTexts[2]}</p>
        </div>

        {/* ══════════════════════════════════════
            RIGHT SIDE (visual right)
            Zig-zag: top=inward, middle=outward, bottom=inward
        ══════════════════════════════════════ */}

        {/* Right Top — pulled inward */}
        <div style={{
          ...baseFrame(frames[0]),
          top: '12%',
          right: '22%',
          transform: 'scale(1.1) rotate(2deg)',
        }}>
          <p className="font-arabic" style={textStyle}>{rightTexts[0]}</p>
        </div>

        {/* Right Middle — pushed outward (zag) */}
        <div style={{
          ...baseFrame(frames[1]),
          top: '50%',
          right: '12%',
          transform: 'translateX(20px) translateY(-50%) scale(1.1) rotate(-1deg)',
        }}>
          <p className="font-arabic" style={textStyle}>{rightTexts[1]}</p>
        </div>

        {/* Right Bottom — pulled inward */}
        <div style={{
          ...baseFrame(frames[2]),
          bottom: '10%',
          right: '20%',
          transform: 'scale(1.1) rotate(1deg)',
        }}>
          <p className="font-arabic" style={textStyle}>{rightTexts[2]}</p>
        </div>

      </div>
    </div>
  )
}
