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
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gradient-to-br from-[#3C3B40] via-[#2a2930] to-black">
      {/* Close Button */}
      {onClose && (
        <button
          onClick={onClose}
          className="fixed right-4 top-4 sm:right-6 sm:top-6 z-[110] flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-all hover:bg-white/20"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
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
        </button>
      )}

      {/* Logo */}
      <motion.div
        className="fixed left-4 top-4 sm:left-6 sm:top-6 z-[110]"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <img
          src="/logo-white.png"
          alt="Anis Villa"
          className="h-10 sm:h-12 md:h-16 w-auto object-contain"
        />
      </motion.div>

      {/* Language Selection */}
      {!selectedLanguage && (
        <motion.div
          className="mx-auto max-w-4xl px-4 sm:px-6 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="mb-3 sm:mb-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Welcome to Anis Villa
          </motion.h1>
          
          <motion.p
            className="mb-8 sm:mb-12 text-base sm:text-lg md:text-xl text-white/80"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Please select your preferred language
          </motion.p>

          <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-3">
            {languages.map((lang, index) => (
              <motion.button
                key={lang.code}
                onClick={() => handleLanguageSelect(lang.code)}
                className="group relative overflow-hidden rounded-xl sm:rounded-2xl bg-white/10 p-6 sm:p-8 backdrop-blur-sm transition-all hover:bg-white/20 hover:scale-105"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.6 }}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="mb-3 sm:mb-4 text-4xl sm:text-5xl md:text-6xl">{lang.flag}</div>
                <h3 className="text-xl sm:text-2xl font-semibold text-white">{lang.name}</h3>
                
                {/* Hover Effect */}
                <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#8BC349]/20 to-[#7AB239]/20 opacity-0 transition-opacity group-hover:opacity-100" />
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Video Player */}
      {selectedLanguage && selectedVideo && (
        <motion.div
          className="relative h-full w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {/* Back Button */}
          <button
            onClick={handleBack}
            className="fixed left-4 top-20 sm:left-6 sm:top-24 md:left-24 md:top-6 z-[110] flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 sm:px-4 text-xs sm:text-sm font-medium text-white backdrop-blur-sm transition-all hover:bg-white/20"
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
              <path d="m15 18-6-6 6-6" />
            </svg>
            Back
          </button>

          {/* Video Container */}
          <div className="flex h-full w-full items-center justify-center p-4 sm:p-6 md:p-12">
            <motion.div
              className="relative aspect-video w-full max-w-6xl overflow-hidden rounded-xl sm:rounded-2xl bg-black shadow-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
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
                    className="mb-3 sm:mb-4 text-white/50 sm:w-16 sm:h-16"
                  >
                    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                    <path d="M12 9v4" />
                    <path d="M12 17h.01" />
                  </svg>
                  <h3 className="mb-2 text-lg sm:text-xl font-semibold text-white">Video Cannot Play</h3>
                  <p className="mb-4 max-w-md text-xs sm:text-sm text-white/70 px-2">
                    Your browser doesn't support .MOV format. Please convert the video files to .MP4 format for better compatibility.
                  </p>
                  <button
                    onClick={handleBack}
                    className="rounded-lg bg-[#8BC349] px-4 py-2 sm:px-6 sm:py-2.5 text-xs sm:text-sm font-semibold text-white transition-all hover:bg-[#7AB239]"
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
  )
}

