import React, { useState } from 'react';

// Helper function to extract YouTube ID
const extractYouTubeID = (url) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

export default function TheScrapbook({ mainPhoto, albumCover, youtubeLink, songTitle, artist, onBack }) {
  // Safe Fallbacks
  const finalMainPhoto = mainPhoto || "/images/polaroid.jpg";
  const finalAlbumCover = albumCover || "/images/album-cover.jpg";
  const finalYoutubeLink = youtubeLink || "https://www.youtube.com/watch?v=W01L70IGBgE";
  const finalSongTitle = songTitle || "أغنيتنا";
  const finalArtist = artist || "صوت الحب";

  // States
  const [isPlaying, setIsPlaying] = useState(false);
  const [isIframeLoaded, setIsIframeLoaded] = useState(false);

  // Extract ID and construct embed URL
  const videoId = extractYouTubeID(finalYoutubeLink);
  const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1&playsinline=1&controls=0` : null;

  // Prevent default button behavior and handle deferred loading
  const togglePlay = (e) => {
    e.preventDefault();
    if (!isIframeLoaded) {
      setIsIframeLoaded(true); // Load iframe on first user click
      setIsPlaying(true);
    } else {
      setIsPlaying(prev => !prev); // Toggle playing state
    }
  };

  return (
    <>
      {/* 1. THE NATIVE IFRAME PLAYER - Loaded deferred on user click to bypass autoplay block */}
      {/* We use isPlaying to mount/unmount the iframe as a simple way to pause/play the raw iframe */}
      {isIframeLoaded && isPlaying && embedUrl && (
        <iframe
          className="absolute w-0 h-0 opacity-0 pointer-events-none -z-50"
          src={embedUrl}
          allow="autoplay; encrypted-media"
          allowFullScreen
          title="Background Audio"
        ></iframe>
      )}

      {/* 2. THE UI - The rest of the scrapbook goes here */}
      <div className="relative w-full min-h-screen bg-[url('/images/bg.jpg')] bg-cover bg-center overflow-hidden flex flex-col items-center justify-center font-arabic" dir="rtl">
        
        {/* Top Bar */}
        <div className="absolute top-8 left-8 z-50">
          <button onClick={onBack} className="bg-white/90 border-2 border-pink-200 text-rose-600 font-bold text-xl px-8 py-2 rounded-full shadow-md hover:scale-105 transition-transform">
            التالي ➔
          </button>
        </div>

        {/* STRICT CENTRAL CLUSTER */}
        <div className="relative w-[95vw] max-w-[900px] h-[600px] flex items-center justify-center mt-12">
          
          {/* Background Scrapbook Elements */}
          <img src="/images/torn-paper.png" className="absolute -top-10 -right-10 w-[350px] h-[120%] object-cover opacity-90 z-0 pointer-events-none" alt="paper" />
          <img src="/images/ticket-vintage.png" className="absolute top-4 -left-10 w-[180px] -rotate-12 z-10 drop-shadow-md" alt="ticket" />
          <img src="/images/ticket-pink.png" className="absolute top-20 left-10 w-[180px] -rotate-6 z-10 drop-shadow-md" alt="ticket" />
          <img src="/images/envelope.png" className="absolute -bottom-16 -left-16 w-[300px] -rotate-12 z-10 drop-shadow-xl" alt="envelope" />
          <img src="/images/lily.png" className="absolute -bottom-6 left-12 w-[220px] z-20 drop-shadow-2xl" alt="lily" />
          <img src="/images/heart-note.png" className="absolute -bottom-10 right-32 w-[150px] -rotate-12 z-10 drop-shadow-lg" alt="heart note" />
          <img src="/images/butterfly.png" className="absolute -top-6 right-24 w-[110px] rotate-12 z-40 drop-shadow-md animate-pulse" alt="butterfly" />

          {/* The Polaroid */}
          <div className="relative z-30 bg-[#fdfbf7] p-5 pb-20 shadow-2xl rotate-2 w-[450px] h-[500px] rounded-sm flex flex-col">
            <img 
              src={finalMainPhoto} 
              className="w-full h-full object-cover" 
              alt="polaroid" 
              onError={(e) => { e.target.src = "/images/polaroid.jpg" }} 
            />
          </div>

          {/* The Music Player */}
          <div className="absolute -bottom-12 -right-8 w-[380px] bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-5 flex flex-col gap-4 border border-pink-100 z-50">
            
            {/* Track Info */}
            <div className="flex items-center gap-4">
              <img 
                src={finalAlbumCover} 
                className="w-16 h-16 rounded-md shadow-md object-cover" 
                alt="album cover"
                onError={(e) => { e.target.src = "/images/album-cover.jpg" }}
              />
              <div className="flex flex-col">
                <h3 className="font-bold text-rose-800 text-lg truncate w-48" dir="rtl">{finalSongTitle}</h3>
                <p className="text-rose-500 text-sm truncate w-48" dir="rtl">{finalArtist}</p>
              </div>
            </div>

            {/* Progress & Controls */}
            <div className="flex flex-col gap-2">
              <div className="w-full bg-pink-100 h-2 rounded-full overflow-hidden" dir="ltr">
                 {/* Visual progress simulation since native iframe lacks API progress tracking */}
                 <div className="bg-rose-400 h-full transition-all ease-linear" style={{ width: isPlaying ? '100%' : '0%', transitionDuration: isPlaying ? '200s' : '0s' }}></div>
              </div>
              <div className="flex justify-center items-center gap-6 mt-2" dir="ltr">
                <button type="button" className="text-rose-400 hover:text-rose-600 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M11 18V6l-8.5 6 8.5 6zm.5-6l8.5 6V6l-8.5 6z"/></svg>
                </button>
                <button 
                  type="button"
                  onClick={togglePlay} 
                  className="w-12 h-12 flex items-center justify-center bg-rose-500 text-white rounded-full shadow-md hover:scale-110 transition-transform text-xl"
                >
                  {isPlaying ? (
                     <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
                  ) : (
                     <svg className="w-6 h-6 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                  )}
                </button>
                <button type="button" className="text-rose-400 hover:text-rose-600 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M4 18l8.5-6L4 6v12zm9-12v12l8.5-6L13 6z"/></svg>
                </button>
              </div>
              <p className="text-center text-xs text-rose-600 mt-1 font-bold">
                 {!isIframeLoaded ? "اضغطي تشغيل لسماع الأغنية 🤍" : "أحبكِ جداً ✨"}
              </p>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
