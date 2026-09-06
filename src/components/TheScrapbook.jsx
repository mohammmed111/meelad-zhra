import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

/* ──── Butterfly SVG ──── */
function Butterfly({ className, style }) {
  return (
    <motion.div
      className={`absolute ${className}`}
      style={style}
      animate={{ y: [0, -8, 0], rotate: [0, 5, -5, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
    >
      <svg viewBox="0 0 40 40" className="w-10 h-10">
        <ellipse cx="12" cy="15" rx="10" ry="12" fill="#F9A8D4" opacity="0.8" transform="rotate(-15,12,15)" />
        <ellipse cx="28" cy="15" rx="10" ry="12" fill="#F9A8D4" opacity="0.8" transform="rotate(15,28,15)" />
        <ellipse cx="14" cy="26" rx="7" ry="9" fill="#FBCFE8" opacity="0.7" transform="rotate(-10,14,26)" />
        <ellipse cx="26" cy="26" rx="7" ry="9" fill="#FBCFE8" opacity="0.7" transform="rotate(10,26,26)" />
        <line x1="20" y1="8" x2="20" y2="36" stroke="#BE185D" strokeWidth="1.5" />
        <circle cx="16" cy="14" r="2" fill="#EC4899" opacity="0.6" />
        <circle cx="24" cy="14" r="2" fill="#EC4899" opacity="0.6" />
        {/* Antennae */}
        <path d="M20 10 Q16 4 13 2" stroke="#BE185D" strokeWidth="1" fill="none" />
        <path d="M20 10 Q24 4 27 2" stroke="#BE185D" strokeWidth="1" fill="none" />
        <circle cx="13" cy="2" r="1.5" fill="#EC4899" />
        <circle cx="27" cy="2" r="1.5" fill="#EC4899" />
      </svg>
    </motion.div>
  )
}

/* ──── Stamp SVG ──── */
function Stamp({ className, style }) {
  return (
    <motion.div
      className={`absolute ${className}`}
      style={style}
      initial={{ opacity: 0, rotate: -15, scale: 0.5 }}
      animate={{ opacity: 1, rotate: -8, scale: 1 }}
      transition={{ delay: 0.5, type: 'spring' }}
    >
      <div className="border-2 border-dashed border-pink-400 rounded-sm p-1 bg-white/80 shadow-sm" style={{ width: '60px', height: '70px' }}>
        <div className="w-full h-full bg-pink-100 rounded-sm flex flex-col items-center justify-center">
          <span className="text-lg">💌</span>
          <span className="text-[7px] font-bold text-pink-600 mt-0.5">LOVE</span>
          <span className="text-[6px] text-pink-400">MAIL</span>
        </div>
      </div>
    </motion.div>
  )
}

/* ──── Love Pass Ticket ──── */
function LovePass({ className, style }) {
  return (
    <motion.div
      className={`absolute ${className}`}
      style={style}
      initial={{ opacity: 0, rotate: 10, scale: 0.5 }}
      animate={{ opacity: 1, rotate: 5, scale: 1 }}
      transition={{ delay: 0.7, type: 'spring' }}
    >
      <div className="bg-gradient-to-r from-pink-200 to-rose-200 rounded-lg px-3 py-2 shadow-md border border-pink-300 relative overflow-hidden" style={{ width: '110px' }}>
        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-pink-50 rounded-full" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-4 h-4 bg-pink-50 rounded-full" />
        <p className="text-[8px] font-bold text-pink-700 text-center tracking-wider">✈ LOVE PASS ✈</p>
        <p className="text-[7px] text-pink-500 text-center mt-0.5">ADMIT ONE</p>
        <p className="text-[6px] text-pink-400 text-center mt-0.5">NO EXPIRY 💕</p>
      </div>
    </motion.div>
  )
}

/* ──── Music Player ──── */
function MusicPlayer({ audioUrl, trackName }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(210) // default ~3:30
  const intervalRef = useRef(null)
  const audioRef = useRef(null)

  // Determine if we have a real MP3 URL
  const isRealAudio = audioUrl && (audioUrl.endsWith('.mp3') || audioUrl.endsWith('.wav') || audioUrl.endsWith('.ogg') || audioUrl.includes('audio'))

  // Parse track name into title + artist
  const displayName = trackName || 'BIRDS OF A FEATHER - Billie Eilish'
  const parts = displayName.split(' - ')
  const title = parts[0]?.trim() || displayName
  const artist = parts[1]?.trim() || ''

  useEffect(() => {
    if (isRealAudio && audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(() => setIsPlaying(false))
      } else {
        audioRef.current.pause()
      }
    }
  }, [isPlaying, isRealAudio])

  // Handle real audio time updates
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const pct = (audioRef.current.currentTime / audioRef.current.duration) * 100
      setProgress(pct || 0)
    }
  }

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration)
    }
  }

  // Simulated progress for non-real audio
  useEffect(() => {
    if (isRealAudio) return
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setProgress((p) => {
          if (p >= 100) {
            setIsPlaying(false)
            return 0
          }
          return p + 0.5
        })
      }, 100)
    } else {
      clearInterval(intervalRef.current)
    }
    return () => clearInterval(intervalRef.current)
  }, [isPlaying, isRealAudio])

  const formatTime = (pct) => {
    const totalSec = Math.floor((pct / 100) * duration)
    const min = Math.floor(totalSec / 60)
    const sec = totalSec % 60
    return `${min}:${sec.toString().padStart(2, '0')}`
  }

  const formatDuration = (secs) => {
    const min = Math.floor(secs / 60)
    const sec = Math.floor(secs % 60)
    return `${min}:${sec.toString().padStart(2, '0')}`
  }

  const handleSkipBack = () => {
    if (isRealAudio && audioRef.current) {
      audioRef.current.currentTime = Math.max(0, audioRef.current.currentTime - 10)
    } else {
      setProgress(Math.max(0, progress - 10))
    }
  }

  const handleSkipForward = () => {
    if (isRealAudio && audioRef.current) {
      audioRef.current.currentTime = Math.min(audioRef.current.duration, audioRef.current.currentTime + 10)
    } else {
      setProgress(Math.min(100, progress + 10))
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, type: 'spring' }}
      className="w-full max-w-xs mx-auto"
    >
      {/* Hidden audio element for real playback */}
      {isRealAudio && (
        <audio
          ref={audioRef}
          src={audioUrl}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={() => { setIsPlaying(false); setProgress(0) }}
          preload="metadata"
        />
      )}

      <div className="bg-white/80 backdrop-blur-md rounded-2xl p-4 shadow-lg shadow-pink-200/40 border border-pink-100">
        {/* Track info */}
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 bg-gradient-to-br from-pink-300 to-rose-400 rounded-xl flex items-center justify-center shadow-md shrink-0">
            <span className="text-xl">🎵</span>
          </div>
          <div className="min-w-0">
            <p className="text-sm font-bold text-pink-700 truncate">{title}</p>
            {artist && <p className="text-xs text-pink-400 truncate">{artist}</p>}
          </div>
        </div>

        {/* Progress bar */}
        <div className="mb-2">
          <div className="w-full h-1.5 bg-pink-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-pink-400 to-rose-500 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between mt-1 text-[10px] text-pink-400 font-medium">
            <span>{formatTime(progress)}</span>
            <span>{formatDuration(duration)}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-6">
          {/* Prev */}
          <button
            onClick={handleSkipBack}
            className="text-pink-400 hover:text-pink-600 transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
            </svg>
          </button>

          {/* Play/Pause */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-500 rounded-full flex items-center justify-center shadow-lg shadow-pink-300/50 hover:shadow-pink-400/60 transition-shadow active:scale-95"
          >
            {isPlaying ? (
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>

          {/* Next */}
          <button
            onClick={handleSkipForward}
            className="text-pink-400 hover:text-pink-600 transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
            </svg>
          </button>
        </div>
      </div>
    </motion.div>
  )
}

/* ──── Main Component ──── */
export default function TheScrapbook({ onBack, audioUrl, trackName }) {
  return (
    <div className="relative flex flex-col items-center min-h-screen min-h-[100dvh] scrapbook-bg px-5 py-6 overflow-hidden">

      {/* Next button */}
      <motion.button
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        onClick={onBack}
        className="absolute top-5 right-5 z-20 px-4 py-1.5 bg-white/80 backdrop-blur-sm border border-pink-200 text-pink-600 font-semibold text-sm rounded-full shadow-sm hover:bg-pink-50 transition-colors"
      >
        Next →
      </motion.button>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-2xl md:text-3xl font-bold text-pink-700 mb-1 mt-2 font-cursive z-10"
      >
        Our Scrapbook
      </motion.h1>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="w-16 h-0.5 bg-gradient-to-r from-transparent via-pink-400 to-transparent mb-6 z-10"
      />

      {/* Scrapbook area */}
      <div className="relative flex-1 flex flex-col items-center justify-center w-full max-w-sm">

        {/* Scattered decorations */}
        <Butterfly style={{ top: '5%', left: '5%' }} />
        <Stamp style={{ top: '2%', right: '10%' }} />
        <LovePass style={{ bottom: '35%', left: '0%' }} />

        {/* Washi tape decoration - top */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.4 }}
          className="absolute top-[15%] right-[8%] w-16 h-3 bg-pink-300/60 rotate-12 rounded-sm z-20"
        />

        {/* Polaroid */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: -2 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 150, damping: 14 }}
          className="polaroid z-10"
        >
          {/* Landscape placeholder */}
          <div className="w-56 h-56 md:w-64 md:h-64 bg-gradient-to-br from-sky-200 via-rose-100 to-amber-100 rounded-sm overflow-hidden relative">
            {/* Scenic landscape SVG */}
            <svg viewBox="0 0 200 200" className="w-full h-full">
              {/* Sky */}
              <rect width="200" height="200" fill="url(#skyGrad)" />
              <defs>
                <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#BAE6FD" />
                  <stop offset="60%" stopColor="#FDE68A" />
                  <stop offset="100%" stopColor="#FED7AA" />
                </linearGradient>
              </defs>
              {/* Sun */}
              <circle cx="150" cy="60" r="25" fill="#FCD34D" opacity="0.9" />
              <circle cx="150" cy="60" r="30" fill="#FCD34D" opacity="0.2" />
              {/* Mountains */}
              <polygon points="0,160 40,90 80,160" fill="#D1D5DB" opacity="0.6" />
              <polygon points="50,160 100,70 150,160" fill="#9CA3AF" opacity="0.5" />
              <polygon points="110,160 160,80 200,160" fill="#D1D5DB" opacity="0.6" />
              {/* Hills */}
              <ellipse cx="60" cy="170" rx="80" ry="30" fill="#86EFAC" />
              <ellipse cx="160" cy="175" rx="70" ry="25" fill="#4ADE80" opacity="0.8" />
              {/* Trees */}
              <rect x="45" y="140" width="4" height="20" fill="#92400E" />
              <polygon points="35,140 47,110 59,140" fill="#22C55E" />
              <rect x="130" y="145" width="3" height="15" fill="#92400E" />
              <polygon points="122,145 131.5,120 141,145" fill="#16A34A" />
              {/* Flowers */}
              <circle cx="80" cy="165" r="3" fill="#FB7185" />
              <circle cx="95" cy="170" r="2.5" fill="#F472B6" />
              <circle cx="35" cy="172" r="2" fill="#FBBF24" />
              {/* Clouds */}
              <ellipse cx="40" cy="40" rx="20" ry="10" fill="white" opacity="0.7" />
              <ellipse cx="55" cy="38" rx="15" ry="8" fill="white" opacity="0.6" />
              {/* Birds */}
              <path d="M70 30 Q73 27 76 30" stroke="#6B7280" strokeWidth="1" fill="none" />
              <path d="M80 25 Q83 22 86 25" stroke="#6B7280" strokeWidth="1" fill="none" />
            </svg>
          </div>
          {/* Polaroid caption */}
          <p className="text-center text-sm text-pink-600 font-cursive font-semibold mt-2">Our beautiful journey 💕</p>
        </motion.div>

        {/* Small hearts scatter */}
        <motion.div
          className="absolute bottom-[40%] right-[5%]"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <span className="text-2xl opacity-50">💕</span>
        </motion.div>

        {/* Another sticker */}
        <motion.div
          className="absolute top-[50%] left-[3%]"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 0.6, scale: 1 }}
          transition={{ delay: 0.9 }}
        >
          <span className="text-xl">🌸</span>
        </motion.div>
      </div>

      {/* Music Player */}
      <div className="w-full mt-4 mb-4 z-10">
        <MusicPlayer audioUrl={audioUrl} trackName={trackName} />
      </div>
    </div>
  )
}
