import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { QRCodeSVG } from 'qrcode.react'
import { useGift, DEFAULT_GIFT_DATA } from '../context/GiftContext'
import { useNavigate } from 'react-router-dom'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../firebase'

/* ──── Section wrapper ──── */
function FormSection({ title, icon, delay, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, type: 'spring', stiffness: 120, damping: 16 }}
      className="w-full"
    >
      <div className="bg-white/60 backdrop-blur-md rounded-2xl p-5 md:p-6 shadow-lg shadow-pink-100/40 border border-pink-100/50">
        <h2 className="text-lg font-bold text-pink-700 mb-4 flex items-center gap-2">
          <span className="text-xl">{icon}</span>
          {title}
        </h2>
        {children}
      </div>
    </motion.div>
  )
}

/* ──── Input field ──── */
function InputField({ label, value, onChange, placeholder, index }) {
  return (
    <div>
      {label && (
        <label className="block text-sm font-semibold text-pink-600 mb-1.5">{label}</label>
      )}
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-4 py-2.5 bg-white/80 border-2 border-pink-100 rounded-xl text-pink-800 placeholder-pink-300 focus:border-pink-400 focus:ring-2 focus:ring-pink-200 focus:outline-none transition-all text-sm font-medium"
      />
    </div>
  )
}

/* ──── QR Code Result Card ──── */
function QRResult({ giftId }) {
  const [copied, setCopied] = useState(false)
  const navigate = useNavigate()
  const fullUrl = `https://meelad-zhraa.web.app/view/${giftId}`

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback for older browsers
      const input = document.createElement('input')
      input.value = fullUrl
      document.body.appendChild(input)
      input.select()
      document.execCommand('copy')
      document.body.removeChild(input)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 150, damping: 14 }}
      className="w-full"
    >
      <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 md:p-8 shadow-xl shadow-pink-200/40 border border-pink-100/50 text-center">
        {/* Success icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="w-16 h-16 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-pink-300/40"
        >
          <span className="text-2xl">💝</span>
        </motion.div>

        <h2 className="text-xl font-bold text-pink-700 font-cursive mb-1">Gift Created!</h2>
        <p className="text-pink-500 text-sm mb-6">Share this QR code with your special someone 💕</p>

        {/* QR Code */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, type: 'spring' }}
          className="relative inline-block p-4 bg-white rounded-2xl shadow-md shadow-pink-100/50 border border-pink-50 mb-6"
        >
          <QRCodeSVG
            value={fullUrl}
            size={200}
            level="H"
            fgColor="#BE185D"
            bgColor="#FFFFFF"
            includeMargin={false}
            imageSettings={{
              src: "data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23ec4899'%3E%3Cpath d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'/%3E%3C/svg%3E",
              height: 40,
              width: 40,
              excavate: true,
            }}
          />
        </motion.div>

        {/* URL display */}
        <div className="bg-pink-50/80 rounded-xl px-4 py-3 mb-4 flex items-center gap-2">
          <p className="text-pink-600 text-xs font-mono flex-1 truncate text-left">{fullUrl}</p>
          <button
            onClick={handleCopy}
            className="shrink-0 px-3 py-1.5 bg-white border border-pink-200 text-pink-600 rounded-lg text-xs font-semibold hover:bg-pink-50 active:scale-95 transition-all"
          >
            {copied ? '✓ Copied!' : 'Copy'}
          </button>
        </div>

        {/* Preview button */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate(`/view/${giftId}`)}
          className="w-full py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold rounded-xl shadow-lg shadow-pink-300/50 hover:shadow-pink-400/60 transition-shadow text-sm"
        >
          Preview My Gift →
        </motion.button>

        {/* Create another */}
        <button
          onClick={() => window.location.reload()}
          className="mt-3 text-pink-400 text-xs font-medium hover:text-pink-600 transition-colors"
        >
          ← Create another gift
        </button>
      </div>
    </motion.div>
  )
}

/* ──── Main Component ──── */
export default function CreatorDashboard() {
  const { saveGift } = useGift()
  const [generatedId, setGeneratedId] = useState(null)

  // Form state
  const [bubbleTexts, setBubbleTexts] = useState([...DEFAULT_GIFT_DATA.bubbleTexts])
  const [letterText, setLetterText] = useState(DEFAULT_GIFT_DATA.letterText)
  const [audioUrl, setAudioUrl] = useState(DEFAULT_GIFT_DATA.audioUrl)
  const [trackName, setTrackName] = useState(DEFAULT_GIFT_DATA.trackName)

  const handleBubbleChange = (index, value) => {
    const updated = [...bubbleTexts]
    updated[index] = value
    setBubbleTexts(updated)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const docRef = await addDoc(collection(db, 'gifts'), {
        bubbleTexts,
        letterText,
        audioUrl,
        trackName,
        createdAt: Date.now()
      })
      setGeneratedId(docRef.id)
      // Scroll to top to see QR
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (error) {
      console.error("Error adding document: ", error)
      alert("Failed to create gift. Please try again.")
    }
  }

  return (
    <div className="relative min-h-screen min-h-[100dvh] bg-pink-50 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute -top-32 -right-32 w-80 h-80 bg-pink-100/30 rounded-full blur-3xl" />
      <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-rose-100/30 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-50/50 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-lg mx-auto px-5 py-8 md:py-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
            className="w-16 h-16 bg-gradient-to-br from-pink-400 to-rose-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-pink-300/40 rotate-3"
          >
            <span className="text-2xl">💌</span>
          </motion.div>
          <h1 className="text-3xl md:text-4xl font-bold text-pink-700 font-cursive mb-2">
            Create Your Love Gift
          </h1>
          <p className="text-pink-500 text-sm font-medium">
            Customize every detail and share it with your special someone 💕
          </p>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="w-24 h-0.5 bg-gradient-to-r from-transparent via-pink-300 to-transparent mx-auto mb-8"
        />

        <AnimatePresence mode="wait">
          {generatedId ? (
            <QRResult key="result" giftId={generatedId} />
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-6"
            >
              {/* ── Bubble Texts ── */}
              <FormSection title="Bouquet Messages" icon="🌹" delay={0.15}>
                <p className="text-pink-400 text-xs mb-4">
                  These messages will float around the rose bouquet
                </p>
                <div className="space-y-3">
                  {bubbleTexts.map((text, i) => (
                    <InputField
                      key={i}
                      label={`Bubble ${i + 1}`}
                      value={text}
                      onChange={(e) => handleBubbleChange(i, e.target.value)}
                      placeholder="Enter a sweet message..."
                    />
                  ))}
                </div>
              </FormSection>

              {/* ── Love Letter ── */}
              <FormSection title="Your Love Letter" icon="💌" delay={0.25}>
                <p className="text-pink-400 text-xs mb-4">
                  Write from the heart — use blank lines to separate paragraphs
                </p>
                <textarea
                  value={letterText}
                  onChange={(e) => setLetterText(e.target.value)}
                  rows={10}
                  placeholder="My Dearest Love,&#10;&#10;Write your letter here..."
                  className="w-full px-4 py-3 bg-white/80 border-2 border-pink-100 rounded-xl text-pink-800 placeholder-pink-300 focus:border-pink-400 focus:ring-2 focus:ring-pink-200 focus:outline-none transition-all text-sm font-cursive leading-relaxed resize-none"
                />
              </FormSection>

              {/* ── Audio ── */}
              <FormSection title="Music & Audio" icon="🎵" delay={0.35}>
                <p className="text-pink-400 text-xs mb-4">
                  Add a song that's special to both of you
                </p>
                <div className="space-y-3">
                  <InputField
                    label="Track Name"
                    value={trackName}
                    onChange={(e) => setTrackName(e.target.value)}
                    placeholder="Song Title - Artist"
                  />
                  <InputField
                    label="Audio URL (MP3 link or YouTube)"
                    value={audioUrl}
                    onChange={(e) => setAudioUrl(e.target.value)}
                    placeholder="https://example.com/song.mp3"
                  />
                  <p className="text-pink-300 text-[10px] italic">
                    💡 Direct MP3 links will enable real playback. YouTube links will show as display only.
                  </p>
                </div>
              </FormSection>

              {/* ── Submit ── */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                className="pt-2"
              >
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full py-4 bg-gradient-to-r from-pink-500 via-rose-500 to-pink-500 text-white font-bold rounded-2xl shadow-xl shadow-pink-300/50 hover:shadow-pink-400/60 transition-shadow text-lg relative overflow-hidden group"
                >
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  <span className="relative">Generate My Gift 💕</span>
                </motion.button>
              </motion.div>
            </motion.form>
          )}
        </AnimatePresence>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center text-pink-300 text-xs mt-8"
        >
          Made with ❤️ for the ones we love
        </motion.p>
      </div>
    </div>
  )
}
