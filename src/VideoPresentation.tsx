import { motion } from 'framer-motion'
import { useState } from 'react'

type Language = 'vn' | 'en' | 'ko' | null

const languages = [
  { code: 'vn' as const, name: 'Tiếng Việt', flag: '🇻🇳', video: '/video-vn.mov' },
  { code: 'en' as const, name: 'English', flag: '🇬🇧', video: '/video-en.mov' },
  { code: 'ko' as const, name: '한국어', flag: '🇰🇷', video: '/video-ko.mov' },
]

interface VideoPresentationProps {
  onClose?: () => void
}

export default function VideoPresentation({ onClose }: VideoPresentationProps) {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [videoError, setVideoError] = useState(false)

  const selectedVideo = languages.find(lang => lang.code === selectedLanguage)

  const handleLanguageSelect = (code: Language) => {
    setSelectedLanguage(code)
    setIsPlaying(true)
    setVideoError(false)
  }

  const handleBack = () => {
    setSelectedLanguage(null)
    setIsPlaying(false)
    setVideoError(false)
  }

  const handleVideoError = () => {
    setVideoError(true)
  }

  return (
    <div 
      className="fixed inset-0 z-[100] flex flex-col bg-white bg-cover bg-center bg-no-repeat" 
      style={{ 
        backgroundImage: window.innerWidth < 768 
          ? "url('/bg-video-mobile.jpg')" 
          : "url('/bg-video.jpg')" 
      }}
    >
      {/* Header Bar */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-md"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 py-4">
          {/* Logo */}
          <motion.div
            className="flex items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0, duration: 0.5 }}
          >
            <img
              src="/logo-green.png"
              alt="Anis Villa"
              className="h-10 sm:h-12 md:h-16 w-auto object-contain"
            />
          </motion.div>

          {/* Close Button */}
          {onClose && (
            <motion.button
              onClick={onClose}
              className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full text-[#3C3B40] hover:bg-gray-100 transition-all hover:scale-105"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </motion.button>
          )}
        </div>
      </motion.header>

      {/* Main Content Area */}
      <div className="flex-1 flex items-center justify-center pt-20 sm:pt-24 md:pt-28 overflow-y-auto">
        {/* Language Selection */}
        {!selectedLanguage && (
          <motion.div
            className="mx-auto max-w-4xl px-4 sm:px-6 text-center py-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Pet Character */}
            <motion.div
              className="mb-0 flex justify-center overflow-hidden"
              initial={{ opacity: 0, y: -20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.8, ease: 'easeOut' }}
            >
              <img
                src="/pet-video.png"
                alt="Anis Villa Pet"
                className="h-24 w-auto max-w-[120px] sm:h-32 sm:max-w-[160px] md:h-40 md:max-w-[200px] lg:h-48 lg:max-w-none object-contain drop-shadow-lg"
              />
            </motion.div>

            <motion.h1
              className="hero-title mb-4 sm:mb-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-[#3C3B40]"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
            >
              Welcome to Anis Villa
            </motion.h1>
            
            <motion.p
              className="mb-10 sm:mb-14 text-base sm:text-lg md:text-xl text-gray-600 italic"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8, ease: 'easeOut' }}
            >
              Please select your preferred language
            </motion.p>

            <div className="grid grid-cols-1 gap-3 sm:gap-4 md:gap-6 md:grid-cols-3 max-w-sm sm:max-w-md md:max-w-4xl mx-auto">
              {languages.map((lang, index) => (
                <motion.button
                  key={lang.code}
                  onClick={() => handleLanguageSelect(lang.code)}
                  className="group relative overflow-hidden rounded-xl sm:rounded-2xl bg-gray-50 p-5 sm:p-6 md:p-8 transition-all duration-300 hover:bg-[#8BC349] active:bg-[#8BC349] hover:scale-105 active:scale-95 border-2 border-gray-200 hover:border-[#8BC349] active:border-[#8BC349] shadow-sm hover:shadow-lg"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
                  whileHover={{ y: -8 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="mb-3 sm:mb-4 text-4xl sm:text-5xl md:text-6xl">{lang.flag}</div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-[#3C3B40] group-hover:text-white group-active:text-white transition-colors duration-300">{lang.name}</h3>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Video Player */}
        {selectedLanguage && selectedVideo && (
          <motion.div
            className="relative h-full w-full flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {/* Back Button */}
            <motion.button
              onClick={handleBack}
              className="fixed left-4 top-24 sm:left-6 md:left-auto md:right-24 md:top-6 z-[60] flex items-center gap-2 rounded-full bg-[#8BC349] px-4 py-2.5 sm:px-5 sm:py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#7AB239] hover:scale-105 shadow-lg"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
              Back
            </motion.button>

            {/* Video Container */}
            <div className="flex h-full w-full items-center justify-center p-4 sm:p-6 md:p-6">
              <motion.div
                className="relative aspect-video w-full max-w-6xl overflow-hidden rounded-2xl bg-black shadow-2xl border border-white/10"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              >
                {!videoError ? (
                  <video
                    key={selectedVideo.video}
                    className="h-full w-full object-contain"
                    controls
                    autoPlay={isPlaying}
                    controlsList="nodownload"
                    onError={handleVideoError}
                    playsInline
                  >
                    <source src={selectedVideo.video} type="video/mp4" />
                    <source src={selectedVideo.video} type="video/quicktime" />
                    Your browser does not support the video tag.
                  </video>
                  ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center p-4 sm:p-8 text-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="48"
                      height="48"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mb-4 text-[#8BC349] sm:w-16 sm:h-16"
                    >
                      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                      <path d="M12 9v4" />
                      <path d="M12 17h.01" />
                    </svg>
                    <h3 className="mb-2 text-lg sm:text-xl font-bold text-[#3C3B40]">Video Cannot Play</h3>
                    <p className="mb-6 max-w-md text-xs sm:text-sm text-gray-600 px-2">
                      Your browser doesn't support .MOV format. Please convert the video files to .MP4 format for better compatibility.
                    </p>
                    <button
                      onClick={handleBack}
                      className="rounded-full bg-[#8BC349] px-6 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#7AB239] hover:scale-105"
                    >
                      Choose Another Language
                    </button>
                  </div>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

