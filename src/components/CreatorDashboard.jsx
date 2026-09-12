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

/* ──── File Upload Field ──── */
function FileUploadField({ label, onChange }) {
  return (
    <div>
      {label && <label className="block text-sm font-semibold text-pink-600 mb-1.5">{label}</label>}
      <input
        type="file"
        accept="image/*"
        onChange={onChange}
        className="w-full px-4 py-2 bg-white/80 border-2 border-dashed border-pink-300 rounded-xl text-pink-700 hover:bg-pink-50 focus:outline-none transition-all text-sm font-medium cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-pink-100 file:text-pink-700 hover:file:bg-pink-200"
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

        <h2 className="text-xl font-bold text-pink-700 mb-1">تم إنشاء الهدية!</h2>
        <p className="text-pink-500 text-sm mb-6">شارك رمز الاستجابة هذا أو الرابط مع من تحب 💕</p>

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
        <div className="bg-pink-50/80 rounded-xl px-4 py-3 mb-4 flex items-center justify-between gap-2" dir="ltr">
          <p className="text-pink-600 text-xs font-mono truncate">{fullUrl}</p>
          <button
            onClick={handleCopy}
            className="shrink-0 px-3 py-1.5 bg-white border border-pink-200 text-pink-600 rounded-lg text-xs font-semibold hover:bg-pink-50 active:scale-95 transition-all font-arabic"
          >
            {copied ? '✓ تم النسخ!' : 'نسخ'}
          </button>
        </div>

        {/* Preview button */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate(`/view/${giftId}`)}
          className="w-full py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold rounded-xl shadow-lg shadow-pink-300/50 hover:shadow-pink-400/60 transition-shadow text-sm font-arabic"
        >
          معاينة الهدية ➔
        </motion.button>

        {/* Create another */}
        <button
          onClick={() => window.location.reload()}
          className="mt-3 text-pink-400 text-xs font-medium hover:text-pink-600 transition-colors font-arabic"
        >
          ➔ إنشاء هدية أخرى
        </button>
      </div>
    </motion.div>
  )
}

/* ──── Main Component ──── */
export default function CreatorDashboard() {
  const [generatedId, setGeneratedId] = useState(null)

  // Form state
  const [bubbleTexts, setBubbleTexts] = useState([...DEFAULT_GIFT_DATA.bubbleTexts])
  const [letterText, setLetterText] = useState(DEFAULT_GIFT_DATA.letterText)
  const [meterLow, setMeterLow] = useState(DEFAULT_GIFT_DATA.meterLow)
  const [meterMedium, setMeterMedium] = useState(DEFAULT_GIFT_DATA.meterMedium)
  const [meterHigh, setMeterHigh] = useState(DEFAULT_GIFT_DATA.meterHigh)
  const [audioUrl, setAudioUrl] = useState(DEFAULT_GIFT_DATA.audioUrl)
  const [trackName, setTrackName] = useState(DEFAULT_GIFT_DATA.trackName)
  const [mainPhoto, setMainPhoto] = useState(DEFAULT_GIFT_DATA.mainPhoto || '')
  const [albumCover, setAlbumCover] = useState(DEFAULT_GIFT_DATA.albumCover || '')

  const handleImageUpload = (e, setPhotoState) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPhotoState(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleBubbleChange = (index, value) => {
    const updated = [...bubbleTexts]
    updated[index] = value
    setBubbleTexts(updated)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validate and format YouTube URL
    let finalAudioUrl = audioUrl.trim();
    if (finalAudioUrl.includes('youtu.be/')) {
      const id = finalAudioUrl.split('youtu.be/')[1]?.split('?')[0];
      if (id) {
        finalAudioUrl = `https://www.youtube.com/watch?v=${id}`;
      }
    }
    
    // Basic validation to ensure it's a valid watch link (if it's a youtube link)
    if (finalAudioUrl && !finalAudioUrl.includes('youtube.com/watch') && !finalAudioUrl.endsWith('.mp3')) {
      alert("يرجى إدخال رابط يوتيوب صحيح (يجب أن يحتوي على youtube.com/watch?v=)");
      return;
    }

    try {
      const docRef = await addDoc(collection(db, 'gifts'), {
        bubbleTexts,
        letterText,
        meterLow,
        meterMedium,
        meterHigh,
        audioUrl: finalAudioUrl,
        trackName,
        mainPhoto,
        albumCover,
        createdAt: Date.now()
      })
      setGeneratedId(docRef.id)
      // Scroll to top to see QR
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (error) {
      console.error("Error adding document: ", error)
      alert("حدث خطأ أثناء إنشاء الهدية. يرجى المحاولة مرة أخرى.")
    }
  }

  return (
    <div className="relative min-h-screen min-h-[100dvh] bg-pink-50 overflow-hidden font-arabic" dir="rtl">
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
          <h1 className="text-3xl md:text-4xl font-bold text-pink-700 mb-2">
            اصنع هديتك الرومانسية
          </h1>
          <p className="text-pink-500 text-sm font-medium">
            خصص كل التفاصيل وشاركها مع من تحب 💕
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
              <FormSection title="رسائل باقة الورد" icon="🌹" delay={0.15}>
                <p className="text-pink-400 text-xs mb-4">
                  هذه الرسائل ستظهر حول باقة الورد
                </p>
                <div className="space-y-3">
                  {bubbleTexts.map((text, i) => (
                    <InputField
                      key={i}
                      label={`الفقاعة ${i + 1}`}
                      value={text}
                      onChange={(e) => handleBubbleChange(i, e.target.value)}
                      placeholder="اكتب رسالة لطيفة..."
                    />
                  ))}
                </div>
              </FormSection>

              {/* ── Memory Photos ── */}
              <FormSection title="صور الذكريات" icon="📸" delay={0.18}>
                <p className="text-pink-400 text-xs mb-4">
                  اختر أجمل صورك لإضافتها في سجل القصاصات
                </p>
                <div className="space-y-4">
                  <FileUploadField
                    label="ارفع الصورة الرئيسية (تظهر في إطار البولارويد)"
                    onChange={(e) => handleImageUpload(e, setMainPhoto)}
                  />
                  <FileUploadField
                    label="ارفع صورة غلاف الأغنية (تظهر في مشغل الموسيقى)"
                    onChange={(e) => handleImageUpload(e, setAlbumCover)}
                  />
                </div>
              </FormSection>

              {/* ── Love Meter Messages ── */}
              <FormSection title="رسائل مقياس الحب" icon="🌡️" delay={0.2}>
                <p className="text-pink-400 text-xs mb-4">
                  الرسائل التي تظهر عند سحب مقياس الحب
                </p>
                <div className="space-y-3">
                  <InputField
                    label="منخفض (0% - 33%)"
                    value={meterLow}
                    onChange={(e) => setMeterLow(e.target.value)}
                    placeholder="لهذه الدرجة فقط؟"
                  />
                  <InputField
                    label="متوسط (34% - 66%)"
                    value={meterMedium}
                    onChange={(e) => setMeterMedium(e.target.value)}
                    placeholder="النصف؟ بجدية؟"
                  />
                  <InputField
                    label="مرتفع (67% - 100%)"
                    value={meterHigh}
                    onChange={(e) => setMeterHigh(e.target.value)}
                    placeholder="هذا أفضل بكثير!"
                  />
                </div>
              </FormSection>

              {/* ── Love Letter ── */}
              <FormSection title="رسالة حبك" icon="💌" delay={0.25}>
                <p className="text-pink-400 text-xs mb-4">
                  اكتب من القلب — استخدم أسطر فارغة للفصل بين الفقرات
                </p>
                <textarea
                  value={letterText}
                  onChange={(e) => setLetterText(e.target.value)}
                  rows={10}
                  placeholder="حبيبتي الغالية،&#10;&#10;اكتب رسالتك هنا..."
                  className="w-full px-4 py-3 bg-white/80 border-2 border-pink-100 rounded-xl text-pink-800 placeholder-pink-300 focus:border-pink-400 focus:ring-2 focus:ring-pink-200 focus:outline-none transition-all text-sm leading-relaxed resize-none font-arabic"
                />
              </FormSection>

              {/* ── Audio ── */}
              <FormSection title="الموسيقى والصوت" icon="🎵" delay={0.35}>
                <p className="text-pink-400 text-xs mb-4">
                  أضف أغنية مميزة لكما
                </p>
                <div className="space-y-3">
                  <InputField
                    label="اسم الأغنية"
                    value={trackName}
                    onChange={(e) => setTrackName(e.target.value)}
                    placeholder="عنوان الأغنية - الفنان"
                  />
                  <InputField
                    label="رابط أغنية يوتيوب"
                    value={audioUrl}
                    onChange={(e) => setAudioUrl(e.target.value)}
                    placeholder="https://www.youtube.com/watch?v=..."
                  />
                  <p className="text-pink-500 font-bold text-[11px]">
                    ⚡ سيتم تشغيل روابط اليوتيوب وملفات MP3 تلقائياً في صفحة الموسيقى.
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
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-full group-hover:-translate-x-full transition-transform duration-700" />
                  <span className="relative">إنشاء هديتي 💕</span>
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
          className="text-center text-pink-400 text-xs mt-8"
        >
          صُنع بحب ❤️ لمن نحب
        </motion.p>
      </div>
    </div>
  )
}
