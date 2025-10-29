import { motion, useScroll } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './App.css'

const navItems = [
  { name: 'About', href: '#' },
  { name: 'Accommodation', href: '#' },
  { name: 'Services', href: '#' },
  { name: 'Gallery', href: '#' },
  { name: 'Video', href: '#video' },
  { name: 'Contact', href: '#' },
]

function App() {
  const [scrolled, setScrolled] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const navigate = useNavigate()
  const { scrollY } = useScroll()

  useEffect(() => {
    const unsubscribe = scrollY.on('change', (latest) => {
      setScrolled(latest > 100)
    })
    return () => unsubscribe()
  }, [scrollY])

  // Loading animation effect
  useEffect(() => {
    const duration = 1500 // 1.5 seconds
    const interval = 50 // Update every 50ms
    const increment = 100 / (duration / interval)
    
    const timer = setInterval(() => {
      setLoadingProgress(prev => {
        const nextProgress = prev + increment
        if (nextProgress >= 100) {
          clearInterval(timer)
          setIsLoading(false)
          // Scroll to top when loading finishes
          window.scrollTo({ top: 0, behavior: 'smooth' })
          return 100
        }
        return nextProgress
      })
    }, interval)

    return () => clearInterval(timer)
  }, [])

  // Không sử dụng transform cho hero nữa

  return (
    <div className="min-h-screen bg-white">
      {/* Loading Screen */}
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Logo */}
          <motion.div
            className="mb-4"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <img
              src="/logo-green.png"
              alt="Anis Villa"
              className="h-20 w-auto object-contain md:h-24"
            />
          </motion.div>

          {/* Progress Bar */}
          <div className="w-52 max-w-sm">
            <div className="mb-2 flex justify-between text-xs text-gray-600">
              <motion.span style={{ opacity: Math.min(1, loadingProgress / 100) }}>
                Welcome to Anis Villa
              </motion.span>
              {/* <span>{Math.round(loadingProgress)}%</span> */}
            </div>
            <div className="relative w-full">
              <div className="h-[1px] w-full overflow-hidden rounded-full bg-gray-100">
                <motion.div
                  className="h-[1px] rounded-full bg-gradient-to-r from-[#8BC349] to-[#7AB239] shadow-sm"
                  initial={{ width: 0 }}
                  animate={{ width: `${loadingProgress}%` }}
                  transition={{ type: 'spring', stiffness: 120, damping: 20, mass: 0.4 }}
                />
              </div>
              <motion.img
                src="/pet.gif"
                alt="Pet"
                className="pointer-events-none absolute -top-[26px] left-0 h-10 w-auto select-none"
                initial={{ left: '0%' }}
                animate={{ left: `${loadingProgress}%` }}
                transition={{ type: 'spring', stiffness: 120, damping: 20, mass: 0.4 }}
                style={{ transform: 'translateX(-50%)' }}
              />
            </div>
          </div>
        </motion.div>
      )}

      {/* Header */}
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-white shadow-md' : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={!isLoading ? { y: 0 } : { y: -100 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          {/* Logo */}
          <motion.div
            className="flex items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={!isLoading ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ delay: 0, duration: 0.5 }}
          >
            <img
              src={scrolled ? '/logo-green.png' : '/logo-white.png'}
              alt="Anis Villa"
              className="h-12 w-auto object-contain transition-opacity duration-500 md:h-16"
            />
          </motion.div>

          {/* Navigation */}
          <motion.nav
            className="hidden md:flex items-center gap-8"
            initial={{ opacity: 0 }}
            animate={!isLoading ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            {navItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  if (item.name === 'Video') {
                    e.preventDefault()
                    navigate('/video')
                  }
                }}
                className={`text-sm font-medium transition-colors duration-300 ${
                  scrolled ? 'text-[#3C3B40] hover:text-[#8BC349]' : 'text-white hover:text-[#8BC349]'
                }`}
                initial={{ opacity: 0, y: -10 }}
                animate={!isLoading ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
                transition={{ delay: 0.1 + index * 0.1, duration: 0.3 }}
              >
                {item.name}
              </motion.a>
            ))}
          </motion.nav>

          {/* CTA Buttons */}
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: 20 }}
            animate={!isLoading ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <a
              href="tel:+84236 3656 293"
              className={`hidden md:block text-sm font-medium transition-colors duration-300 ${
                scrolled ? 'text-[#3C3B40]' : 'text-white'
              }`}
            >
              +84 236 3656 293
            </a>
            <button 
              onClick={() => setIsBookingModalOpen(true)}
              className="hidden sm:block rounded-full bg-[#8BC349] px-4 py-2 text-xs sm:px-6 sm:py-2.5 sm:text-sm font-semibold text-white transition-all duration-300 hover:bg-[#7AB239] hover:scale-105"
            >
              BOOK NOW
            </button>
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden flex h-10 w-10 items-center justify-center rounded-lg transition-colors ${
                scrolled ? 'text-[#3C3B40]' : 'text-white'
              }`}
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
                {isMobileMenuOpen ? (
                  <>
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </>
                ) : (
                  <>
                    <path d="M4 12h16" />
                    <path d="M4 6h16" />
                    <path d="M4 18h16" />
                  </>
                )}
              </svg>
            </button>
          </motion.div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden border-t border-gray-200/10"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className={`px-6 py-4 ${scrolled ? 'bg-white' : 'bg-black/30 backdrop-blur-lg'}`}>
              <nav className="flex flex-col gap-4">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => {
                      if (item.name === 'Video') {
                        e.preventDefault()
                        navigate('/video')
                      }
                      setIsMobileMenuOpen(false)
                    }}
                    className={`text-sm font-medium transition-colors duration-300 ${
                      scrolled ? 'text-[#3C3B40] hover:text-[#8BC349]' : 'text-white hover:text-[#8BC349]'
                    }`}
                  >
                    {item.name}
                  </a>
                ))}
                <a
                  href="tel:+84236 3656 293"
                  className={`text-sm font-medium transition-colors duration-300 ${
                    scrolled ? 'text-[#3C3B40]' : 'text-white'
                  }`}
                >
                  📞 +84 236 3656 293
                </a>
                <button 
                  onClick={() => {
                    setIsBookingModalOpen(true)
                    setIsMobileMenuOpen(false)
                  }}
                  className="w-full rounded-full bg-[#8BC349] px-6 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#7AB239]"
                >
                  BOOK NOW
                </button>
              </nav>
            </div>
          </motion.div>
        )}
      </motion.header>

      {/* Hero Banner */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <div
            className="h-full w-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage:
                "url('https://laretreatdanang.com/wp-content/uploads/elementor/thumbs/DSC03820-HDR-qz67jc318tiyfgslimul53chyi60j2byb1mnan3nsg.jpg')",
            }}
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50" />
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex h-full items-center justify-center px-4 sm:px-6">
          <div className="max-w-4xl text-center">
            <motion.h1
              className="hero-title mb-4 sm:mb-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white"
              initial={{ opacity: 0, y: 40 }}
              animate={!isLoading ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
            >
              “ Where nature embraces peace...”
              <br />

            </motion.h1>

            <motion.p
              className="mb-6 sm:mb-10 text-sm sm:text-base md:text-lg lg:text-xl text-white/90 italic px-4"
              initial={{ opacity: 0, y: 30 }}
              animate={!isLoading ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: 0.6, duration: 0.8, ease: 'easeOut' }}
            >
             Connection - Sustainability - Healing - Mindfulness & Respect - Purposeful Creativity
            </motion.p>


          </div>
        </div>

        {/* Scroll Indicator removed */}
      </section>

      {/* Booking Modal */}
      {isBookingModalOpen && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsBookingModalOpen(false)}
        >
          <motion.div
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-6 sm:p-8 shadow-2xl"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsBookingModalOpen(false)}
              className="absolute right-4 top-4 sm:right-6 sm:top-6 flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
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
            </button>

            {/* Header */}
            <div className="mb-6 sm:mb-8 pr-8">
              <h2 className="mb-2 text-2xl sm:text-3xl font-bold text-[#3C3B40]">Book Your Stay</h2>
              <p className="text-xs sm:text-sm text-gray-600">Fill in the details below to reserve your room</p>
            </div>

            {/* Form */}
            <form className="space-y-4 sm:space-y-6">
              {/* Room Selection */}
              <div>
                <label htmlFor="room" className="mb-2 block text-sm font-semibold text-[#3C3B40]">
                  Room Type <span className="text-red-500">*</span>
                </label>
                <select
                  id="room"
                  required
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-700 transition-all focus:border-[#8BC349] focus:outline-none focus:ring-2 focus:ring-[#8BC349]/20"
                >
                  <option value="">Select a room</option>
                  <option value="deluxe">Deluxe Room</option>
                  <option value="suite">Suite Room</option>
                  <option value="family">Family Room</option>
                  <option value="villa">Private Villa</option>
                </select>
              </div>

              {/* Number of Guests */}
              <div>
                <label htmlFor="guests" className="mb-2 block text-sm font-semibold text-[#3C3B40]">
                  Number of Guests <span className="text-red-500">*</span>
                </label>
                <input
                  id="guests"
                  type="number"
                  min="1"
                  max="10"
                  required
                  placeholder="2"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-700 transition-all focus:border-[#8BC349] focus:outline-none focus:ring-2 focus:ring-[#8BC349]/20"
                />
              </div>

              {/* Check-in & Check-out Dates */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label htmlFor="checkin" className="mb-2 block text-sm font-semibold text-[#3C3B40]">
                    Check-in Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="checkin"
                    type="date"
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-700 transition-all focus:border-[#8BC349] focus:outline-none focus:ring-2 focus:ring-[#8BC349]/20"
                  />
                </div>
                <div>
                  <label htmlFor="checkout" className="mb-2 block text-sm font-semibold text-[#3C3B40]">
                    Check-out Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="checkout"
                    type="date"
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-700 transition-all focus:border-[#8BC349] focus:outline-none focus:ring-2 focus:ring-[#8BC349]/20"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="mb-2 block text-sm font-semibold text-[#3C3B40]">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  id="phone"
                  type="tel"
                  required
                  placeholder="+84 236 3656 293"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-700 transition-all focus:border-[#8BC349] focus:outline-none focus:ring-2 focus:ring-[#8BC349]/20"
                />
              </div>

              {/* Email (Optional) */}
              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-semibold text-[#3C3B40]">
                  Email Address <span className="text-xs text-gray-500">(optional)</span>
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-700 transition-all focus:border-[#8BC349] focus:outline-none focus:ring-2 focus:ring-[#8BC349]/20"
                />
              </div>



              {/* Submit Button */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsBookingModalOpen(false)}
                  className="flex-1 rounded-lg border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-700 transition-all hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-lg bg-[#8BC349] px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-[#7AB239] hover:shadow-lg"
                >
                  Confirm Booking
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}

      {/* Placeholder content for scrolling */}
      <section className="min-h-screen bg-white px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-8 text-4xl font-bold text-[#3C3B40]">
            Welcome to Anis Villa
          </h2>
          <p className="text-lg text-gray-600">
            Experience luxurious accommodation in the heart of nature...
          </p>
        </div>
      </section>
    </div>
  )
}

export default App
