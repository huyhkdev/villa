import { motion, useScroll } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import './App.css'

const navItems = [
  { name: 'About', href: '#about' },
  { name: 'Accommodation', href: '#accommodation' },
  { name: 'Services', href: '#services' },
  { name: 'Gallery', href: '#gallery' },
  { name: 'Our Team', href: '#team' },
  { name: 'Contact', href: '#contact' },
]

function App() {
  const [scrolled, setScrolled] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('about')
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

  // Scroll spy: detect active section
  useEffect(() => {
    const sectionIds = ['about', 'accommodation', 'services', 'gallery', 'team', 'contact']

    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 4

      let currentSection = 'about'

      for (const id of sectionIds) {
        const el = document.getElementById(id)
        if (!el) continue
        const rect = el.getBoundingClientRect()
        const top = rect.top + window.scrollY
        const bottom = top + el.offsetHeight

        if (scrollPosition >= top && scrollPosition < bottom) {
          currentSection = id
          break
        }
      }

      setActiveSection(currentSection)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-[#313131] shadow-md' : 'bg-transparent'
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
              src={'/logo-white.png'}
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
                  const isHashLink = item.href.startsWith('#')
                  if (isHashLink) {
                    e.preventDefault()
                    const targetId = item.href.replace('#', '')
                    const el = document.getElementById(targetId)
                    if (el) {
                      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
                    }
                  }
                  if (item.name === 'Video') {
                    e.preventDefault()
                    navigate('/video')
                  }
                }}
                className={`text-base font-medium transition-colors duration-300 ${activeSection === item.href.replace('#', '')
                    ? 'text-[#8BC349]'
                    : scrolled
                      ? 'text-white hover:text-[#8BC349]'
                      : 'text-white hover:text-[#8BC349]'
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
            {/* Book Now Button */}
            <motion.a
              href="#contact"
              onClick={(e) => {
                e.preventDefault()
                const el = document.getElementById('contact')
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }
              }}
              className={`hidden md:flex items-center justify-center px-6 py-2.5 rounded-full border border-white/80 bg-white/10 backdrop-blur-sm text-white text-sm font-semibold uppercase tracking-wide transition-all duration-300 hover:bg-white/20 hover:border-white ${scrolled ? 'border-white/80 bg-white/10 hover:bg-[#8BC349] hover:border-[#8BC349]' : ''
                }`}
            >
              BOOK NOW
            </motion.a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden flex h-10 w-10 items-center justify-center rounded-lg transition-colors text-white`}
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
            <div className={`px-6 py-4 ${scrolled ? 'bg-[#313131]' : 'bg-black/30 backdrop-blur-lg'}`}>
              <nav className="flex flex-col gap-4">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => {
                      const isHashLink = item.href.startsWith('#')
                      if (isHashLink) {
                        e.preventDefault()
                        const targetId = item.href.replace('#', '')
                        const el = document.getElementById(targetId)
                        if (el) {
                          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
                        }
                      }
                      if (item.name === 'Video') {
                        e.preventDefault()
                        navigate('/video')
                      }
                      setIsMobileMenuOpen(false)
                    }}
                    className={`text-sm font-medium transition-colors duration-300 ${activeSection === item.href.replace('#', '')
                        ? 'text-[#8BC349]'
                        : 'text-white hover:text-[#8BC349]'
                      }`}
                  >
                    {item.name}
                  </a>
                ))}
                <a
                  href="tel:+84236365629"
                  className="text-sm font-medium transition-colors duration-300 text-white"
                >
                  📞 +84 236 3656 293
                </a>
              </nav>
            </div>
          </motion.div>
        )}
      </motion.header>

      {/* Hero Banner */}
      <section className="relative h-[98vh] w-full overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0">
          <video
            className="h-full w-full object-cover"
            src="/video-herobanner.mp4"
            autoPlay
            loop
            muted
            playsInline
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex h-full items-end pb-12 md:pb-16 px-4 sm:px-6 md:px-12">
          <div className="max-w-4xl">
            <motion.p
              className=" sm:mb-2 text-sm sm:text-base md:text-lg lg:text-xl text-white/90 italic "
              initial={{ opacity: 0, y: 30 }}
              animate={!isLoading ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: 0.6, duration: 0.8, ease: 'easeOut' }}
            >
              Connection - Sustainability - Healing - Mindfulness & Respect - Purposeful Creativity
            </motion.p>
            <motion.h1
              className="text-4xl sm:text-5xl md:text-[45px] font-light uppercase text-white leading-tight"
              style={{
                fontFamily: '"Barlow", sans-serif',
                fontWeight: 400,
                textTransform: 'uppercase',
                letterSpacing: '5px',
                textAlign: 'left',
              }}
              initial={{ opacity: 0, y: 40 }}
              animate={!isLoading ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
            >
              Where nature embraces peace
              <br />
            </motion.h1>




          </div>
        </div>

        {/* Scroll Indicator removed */}
      </section>



      {/* About / Our Story */}
      <section id="about" className="relative bg-[#F7F4EB] px-4 sm:px-6 py-12 md:py-[50px] overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#8BC349]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#7AB239]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

        <div className="mx-auto max-w-7xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              viewport={{ once: true }}
            >
              <span className="inline-block text-xs font-semibold tracking-[0.2em] text-[#8BC349] uppercase mb-4 px-4 py-2 bg-[#8BC349]/10 rounded-full">
                Our Journey
              </span>
              <h2
                className="mb-6 md:mb-8 leading-tight text-3xl md:text-[48px]"
                style={{
                  fontFamily: '"Playfair Display", sans-serif',
                  fontWeight: 300,
                  letterSpacing: '0.5px',
                  color: '#3C3B40',
                }}
              >
                Our Story
              </h2>
              <p
                className="mb-4 md:mb-6 leading-relaxed"
                style={{
                  fontSize: '14px',
                  color: '#3C3B40',
                }}
              >
                Nestled in the heart of nature, Anis Villa was born from a vision to create a sanctuary where modern comfort meets timeless tranquility.
              </p>
              <p
                className="mb-4 md:mb-6 leading-relaxed"
                style={{
                  fontSize: '14px',
                  color: '#3C3B40',
                }}
              >
                We believe in sustainable living, mindful experiences, and the healing power of nature. Every detail is crafted to help you reconnect with what truly matters.
              </p>
              <p
                className="mb-4 md:mb-6 leading-relaxed"
                style={{
                  fontSize: '14px',
                  color: '#3C3B40',
                }}
              >
                Our philosophy is built on five core values: Connection, Sustainability, Healing, Mindfulness & Respect, and Purposeful Creativity. These principles guide every aspect of your stay, from the locally sourced materials in our architecture to the thoughtfully curated experiences we offer.
              </p>
              <p
                className="mb-4 md:mb-6 leading-relaxed"
                style={{
                  fontSize: '14px',
                  color: '#3C3B40',
                }}
              >
                Whether you seek a peaceful retreat, an inspiring workspace, or a meaningful connection with nature, Anis Villa provides the perfect setting. Our team is dedicated to ensuring your stay is not just comfortable, but transformative.
              </p>
              <p
                className="leading-relaxed"
                style={{
                  fontSize: '14px',
                  color: '#3C3B40',
                }}
              >
                Join us in this journey of discovery, where every moment is an opportunity to embrace tranquility, find inspiration, and create lasting memories in harmony with nature.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-[#8BC349] via-[#7AB239] to-[#8BC349]  blur opacity-20 group-hover:opacity-30 transition-opacity duration-500" />
              <div className="relative h-[300px] sm:h-[400px] md:h-[450px] lg:h-[500px] overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800"
                  alt="Villa exterior"
                  className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Accommodation Overview */}
      <section id="accommodation" className="relative bg-[#FBF9F5] px-4 sm:px-6 py-12 md:py-[50px]">
        {/* Decorative background */}
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%238BC349' fill-opacity='0.02'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />

        <div className="mx-auto max-w-7xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="flex items-start gap-3 md:gap-4 mb-2 md:mb-3">
              <div className="w-2 h-2 bg-[#E8A87C] mt-1" />
              <p
                className="text-xs uppercase tracking-[5px]"
                style={{
                  fontFamily: '"Barlow", sans-serif',
                  letterSpacing: '5px',
                  color: '#3C3B40',
                }}
              >
                EXPERIENCE ANIS VILLA
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-start mb-8 md:mb-12">
              <h2
                className="mb-0 text-3xl md:text-[48px]"
                style={{
                  fontFamily: '"Playfair Display", sans-serif',
                  fontWeight: 300,
                  letterSpacing: '0.5px',
                  color: '#3C3B40',
                }}
              >
                Accommodations
              </h2>
              <p
                className="leading-relaxed"
                style={{
                  fontSize: '14px',
                  color: '#3C3B40',
                  fontFamily: '"Barlow", sans-serif',
                }}
              >
                The resort houses 33 exclusive villas designed for optimal privacy and comfort. All Villas are well design with highest comfort and completed by luxury amenities. Taste of traditional Balinese Design and concepts.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Swiper
              modules={[Pagination, Navigation, Autoplay]}
              spaceBetween={24}
              pagination={{ clickable: true }}
              navigation
              loop
              autoHeight={false}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              breakpoints={{
                0: { slidesPerView: 1 },
                640: { slidesPerView: 1.2 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
                1280: { slidesPerView: 3 },
              }}
              className="pb-12 accommodation-swiper"
            >
              {[
                {
                  name: 'One Bedroom Private Pool Villas',
                  image: 'photo-1582268611958-ebfd161ef9cf',
                  description: 'Experience luxury and tranquility in our One Bedroom Private Pool Villas. As the second-villa category, these exclusive retreats offer all the elegance of our Garden View Villas, with the added indulgence of a private pool.'
                },
                {
                  name: 'Beach Front Sunrise Two Bedroom Pool Villa',
                  image: 'photo-1564013799919-ab600027ffc6',
                  description: 'The Beach Front Sunrise Two Bedroom Pool Villa at ANIS VILLA Resort is a sophisticated beachfront haven designed for families or couples seeking a spacious and private retreat. Set right on the beach, this villa offers sweeping views of the ocean, blending luxury with the beauty of Nusa Penida\'s stunning coastline.'
                },
                {
                  name: 'Beach Front Signature President Three Bedroom Pool Villa',
                  image: 'photo-1613490493576-7fde63acd811',
                  description: 'Step into island elegance with our Beach Front Signature President Three Bedroom Pool Villa sanctuary designed for families or groups seeking refined comfort and privacy.'
                },
                {
                  name: 'Garden View Villa',
                  image: 'photo-1512917774080-9991f1c4c750',
                  description: 'Surrounded by lush tropical gardens, our Garden View Villas offer a serene escape with beautiful natural surroundings. These elegantly designed villas provide comfort and tranquility in a peaceful setting.'
                },
                {
                  name: 'Ocean View Villa',
                  image: 'photo-1600596542815-ffad4c1539a9',
                  description: 'Wake up to breathtaking ocean views in our Ocean View Villas. These spacious retreats feature large windows and private balconies, allowing you to enjoy the stunning coastal scenery from the comfort of your villa.'
                },
                {
                  name: 'Luxury Pool Villa',
                  image: 'photo-1600607687920-4e2a09cf159d',
                  description: 'Indulge in ultimate luxury with our Luxury Pool Villas. Featuring private infinity pools, premium amenities, and exquisite design, these villas offer an unparalleled experience of comfort and sophistication.'
                },
              ].map((villa) => (
                <SwiperSlide key={villa.name} className="h-auto">
                  <div className="bg-white overflow-hidden group h-full flex flex-col">
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={`https://images.unsplash.com/${villa.image}?w=800`}
                        alt={villa.name}
                        className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <h3
                        className="mb-4 font-bold"
                        style={{
                          fontFamily: '"Barlow", sans-serif',
                          fontSize: '18px',
                          color: '#3C3B40',
                        }}
                      >
                        {villa.name}
                      </h3>
                      <p
                        className="mb-4 flex-1 leading-relaxed"
                        style={{
                          fontSize: '14px',
                          color: '#3C3B40',
                          fontFamily: '"Barlow", sans-serif',
                        }}
                      >
                        {villa.description}
                      </p>
                      <a
                        href="#"
                        className="text-[#E8A87C] uppercase tracking-wide text-sm font-medium hover:underline inline-flex items-center gap-2"
                        style={{
                          fontFamily: '"Barlow", sans-serif',
                        }}
                      >
                        <span className="w-8 h-px bg-[#E8A87C]"></span>
                        DISCOVER MORE
                      </a>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        </div>
      </section>

      {/* Experiences / Services */}
      <section id="services" className="relative bg-[#F7F4EB] px-4 sm:px-6 py-12 md:py-[50px] overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-20 left-0 w-72 h-72 bg-[#8BC349]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-0 w-72 h-72 bg-[#7AB239]/5 rounded-full blur-3xl" />

        <div className="mx-auto max-w-7xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Swiper
              modules={[Pagination, Navigation, Autoplay]}
              spaceBetween={24}
              pagination={{ clickable: true }}
              navigation
              loop
              autoHeight={false}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              breakpoints={{
                0: { slidesPerView: 1 },
                768: { slidesPerView: 1 },
                1024: { slidesPerView: 1 },
              }}
              className="pb-12 services-swiper"
            >
              {[
                {
                  title: 'Activities & Cultural Exploration',
                  desc: 'The resort is designed to be a destination, with curated day trips and activities that immerse guests in the island\'s unique culture and natural beauty. Staff, with their deep local knowledge, provide guidance on excursions that reflect the authentic essence of Nusa Penida, ensuring a memorable connection with the surroundings.',
                  image: 'photo-1544367567-0f2fcb009e0b',
                },
                {
                  title: 'Morning Yoga',
                  desc: 'Start your day with peaceful yoga sessions surrounded by nature. Our experienced instructors guide you through mindful practices that harmonize body and spirit.',
                  image: 'photo-1544367567-0f2fcb009e0b',
                },
                {
                  title: 'Organic Garden',
                  desc: 'Explore our sustainable garden where we grow fresh herbs, vegetables, and fruits. Learn about organic farming and harvest ingredients for your meals.',
                  image: 'photo-1464226184884-fa280b87c399',
                },
                {
                  title: 'Tea Meditation',
                  desc: 'Experience the ancient art of mindful tea ceremony. Slow down, savor each moment, and find peace in the simple ritual of preparing and drinking tea.',
                  image: 'photo-1564890369478-c89ca6d9cde9',
                },
                {
                  title: 'Private BBQ',
                  desc: 'Enjoy exclusive barbecue dinners under the stars with locally sourced ingredients. Perfect for special occasions or intimate family gatherings.',
                  image: 'photo-1555939594-58d7cb561ad1',
                },
                {
                  title: 'Bike Tours',
                  desc: 'Discover the beauty of the surrounding countryside on our guided bike tours. Explore local villages, rice fields, and hidden scenic spots.',
                  image: 'photo-1571068316344-75bc76f77890',
                },
                {
                  title: 'Art Workshops',
                  desc: 'Express your creativity through local crafts and traditional art forms. Learn from skilled artisans and create your own unique souvenirs.',
                  image: 'photo-1513364776144-60967b0f800f',
                }
              ].map((exp) => (
                <SwiperSlide key={exp.title}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center">
                    {/* Image Left */}
                    <div className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
                      <img
                        src={`https://images.unsplash.com/${exp.image}?w=1200`}
                        alt={exp.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Content Right */}
                    <div className="flex flex-col justify-center">
                      <div className="flex items-start gap-3 md:gap-4 mb-2 md:mb-3">
                        <div className="w-2 h-2 bg-[#E8A87C] mt-1" />
                        <p
                          className="text-xs uppercase tracking-[5px]"
                          style={{
                            fontFamily: '"Barlow", sans-serif',
                            letterSpacing: '5px',
                            color: '#3C3B40',
                          }}
                        >
                          EXPERIENCE ANIS VILLA
                        </p>
                      </div>
                      <h2
                        className="mb-6 text-3xl md:text-[48px]"
                        style={{
                          fontFamily: '"Playfair Display", sans-serif',
                          fontWeight: 300,
                          letterSpacing: '0.5px',
                          color: '#3C3B40',
                        }}
                      >
                        {exp.title}
                      </h2>
                      <p
                        className="mb-4 md:mb-6 leading-relaxed"
                        style={{
                          fontSize: '14px',
                          color: '#3C3B40',
                          fontFamily: '"Barlow", sans-serif',
                        }}
                      >
                        {exp.desc}
                      </p>
                      <a
                        href="#"
                        className="text-[#E8A87C] uppercase tracking-wide text-sm font-medium hover:underline inline-flex items-center gap-2"
                        style={{
                          fontFamily: '"Barlow", sans-serif',
                        }}
                      >
                        <span className="w-8 h-px bg-[#E8A87C]"></span>
                        DISCOVER MORE
                      </a>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="relative bg-[#FBF9F5] px-4 sm:px-6 py-12 md:py-[50px]">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-8 md:mb-16"
          >
            <div className="flex items-start gap-3 md:gap-4 mb-2 md:mb-3">
              <div className="w-2 h-2 bg-[#E8A87C] mt-1" />
              <p
                className="text-xs uppercase tracking-[5px]"
                style={{
                  fontFamily: '"Barlow", sans-serif',
                  letterSpacing: '5px',
                  color: '#3C3B40',
                }}
              >
                EXPERIENCE ANIS VILLA
              </p>
            </div>
            <h2
              className="mb-4 md:mb-6 text-3xl md:text-[48px]"
              style={{
                fontFamily: '"Playfair Display", sans-serif',
                fontWeight: 300,
                letterSpacing: '0.5px',
                color: '#3C3B40',
              }}
            >
              Gallery
            </h2>
            <p
              className="leading-relaxed"
              style={{
                fontSize: '14px',
                color: '#3C3B40',
                fontFamily: '"Barlow", sans-serif',
              }}
            >
              Discover the vibrant activities and experiences that await you at our villa. From morning yoga sessions to cultural explorations, each moment is captured in our gallery of memories.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
            {[
              { image: 'photo-1544367567-0f2fcb009e0b', title: 'Morning Yoga' },
              { image: 'photo-1464226184884-fa280b87c399', title: 'Organic Garden' },
              { image: 'photo-1564890369478-c89ca6d9cde9', title: 'Tea Meditation' },
              { image: 'photo-1555939594-58d7cb561ad1', title: 'Private BBQ' },
              { image: 'photo-1571068316344-75bc76f77890', title: 'Bike Tours' },
              { image: 'photo-1513364776144-60967b0f800f', title: 'Art Workshops' },
              { image: 'photo-1600596542815-ffad4c1539a9', title: 'Snorkeling' },
              { image: 'photo-1600607687939-ce8a6c25118c', title: 'Island Exploration' },
              { image: 'photo-1615874959474-d609969a20ed', title: 'Beach Activities' },
              { image: 'photo-1600607687644-c7171b42498f', title: 'Sunset Views' },
              { image: 'photo-1600566753086-00f18fb6b3ea', title: 'Cultural Tours' },
              { image: 'photo-1600585154340-be6161a56a0c', title: 'Nature Walks' },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="relative aspect-square overflow-hidden group cursor-pointer"
              >
                <img
                  src={`https://images.unsplash.com/${item.image}?w=600`}
                  alt={item.title}
                  className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <p
                    className="text-white text-sm font-medium"
                    style={{
                      fontFamily: '"Barlow", sans-serif',
                    }}
                  >
                    {item.title}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section id="team" className="relative bg-[#FBF9F5] px-4 sm:px-6 py-12 md:py-[50px] overflow-hidden">
        <div className="mx-auto max-w-7xl relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-8 md:mb-16"
          >
            <div className="flex items-start gap-3 md:gap-4 mb-2 md:mb-3">
              <div className="w-2 h-2 bg-[#E8A87C] mt-1" />
              <p
                className="text-xs uppercase tracking-[5px]"
                style={{
                  fontFamily: '"Barlow", sans-serif',
                  letterSpacing: '5px',
                  color: '#3C3B40',
                }}
              >
                EXPERIENCE ANIS VILLA
              </p>
            </div>
            <h2
              className="mb-4 md:mb-6 text-3xl md:text-[48px]"
              style={{
                fontFamily: '"Playfair Display", sans-serif',
                fontWeight: 300,
                letterSpacing: '0.5px',
                color: '#3C3B40',
              }}
            >
              Our Dedicated Team
            </h2>
            <p
              className="leading-relaxed max-w-3xl"
              style={{
                fontSize: '14px',
                color: '#3C3B40',
                fontFamily: '"Barlow", sans-serif',
              }}
            >
              A group of hosts, creators, and caretakers who design every detail so that your stay feels personal, calm, and truly memorable.
            </p>
          </motion.div>

          {/* Team Photo */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden"
          >
            <img
              src="/our-team.jpg"
              alt="Our Dedicated Team"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative bg-white px-4 sm:px-6 py-8 md:py-[25px]">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-4 gap-6 md:gap-12 lg:gap-16 items-start"
          >
            {/* Left: Rating Summary */}
            <div className="flex flex-col lg:col-span-1">
              <h2
                className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6"
                style={{
                  fontFamily: '"Barlow", sans-serif',
                  color: '#3C3B40',
                }}
              >
                EXCELLENT
              </h2>
              <div className="flex gap-2 mb-4">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-[#8BC349] border-2 border-white"
                  />
                ))}
              </div>
              <p
                className="mb-8"
                style={{
                  fontSize: '14px',
                  color: '#3C3B40',
                  fontFamily: '"Barlow", sans-serif',
                }}
              >
                Based on 51 reviews
              </p>

            </div>

            {/* Right: Reviews Carousel */}
            <div className="w-full lg:col-span-3">
              <Swiper
                modules={[Pagination, Navigation, Autoplay]}
                spaceBetween={20}
                pagination={{ clickable: true }}
                navigation
                loop
                autoplay={{
                  delay: 4000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                breakpoints={{
                  0: { slidesPerView: 1 },
                  640: { slidesPerView: 1.2 },
                  768: { slidesPerView: 2 },
                  1024: { slidesPerView: 4 },
                }}
                className="pb-12 reviews-swiper"
              >
                {[
                  {
                    name: 'Cati N',
                    time: '2 weeks ago',
                    text: 'An amazing resort! If you are spending some days in Nusa Penida and you are looking for a...',
                    avatar: 'photo-1507003211169-0a1dd7228f2d'
                  },
                  {
                    name: 'carmen',
                    time: '3 weeks ago',
                    text: 'Un havre de paix et de luxe au Seven Dream Nusa Penida Notre séjour au Seven...',
                    avatar: 'photo-1494790108377-be9c29b29330'
                  },
                  {
                    name: 'Jet12456809198',
                    time: '3 weeks ago',
                    text: 'Best ever Every thing was perfect the staff (especially artana ), the room, the view,...',
                    avatar: 'photo-1500648767791-00dcc994a43e'
                  },
                  {
                    name: 'Efinda A',
                    time: '3 weeks ago',
                    text: 'Excellent I had an amazing stay at ANIS VILLA Villa! The resort is absolutely stunnin...',
                    avatar: 'photo-1438761681033-6461ffad8d80'
                  },
                  {
                    name: 'Sarah Johnson',
                    time: '1 month ago',
                    text: 'An absolute paradise! The villa was immaculate.',
                    avatar: 'photo-1544005313-94ddf0286df2'
                  },
                  {
                    name: 'Michael Chen',
                    time: '1 month ago',
                    text: 'Incredible hospitality and attention to detail.',
                    avatar: 'photo-1506794778202-cad84cf45f1d'
                  },
                ].map((review) => (
                  <SwiperSlide key={review.name}>
                    <div className="bg-white border border-gray-200 p-6 h-full flex flex-col max-h-[250px]">
                      <div className="flex items-start gap-4 mb-4">
                        <img
                          src={`https://images.unsplash.com/${review.avatar}?w=100`}
                          alt={review.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <p
                            className="font-semibold mb-1"
                            style={{
                              fontSize: '14px',
                              color: '#3C3B40',
                              fontFamily: '"Barlow", sans-serif',
                            }}
                          >
                            {review.name}
                          </p>
                          <p
                            className="text-gray-500"
                            style={{
                              fontSize: '12px',
                              fontFamily: '"Barlow", sans-serif',
                            }}
                          >
                            {review.time}
                          </p>
                        </div>
                        <div className="relative">
                          <div className="w-6 h-6 rounded-full bg-[#8BC349] flex items-center justify-center">
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10S15.523 0 10 0zm4.293 7.293l-4 4a1 1 0 01-1.414 0l-2-2a1 1 0 111.414-1.414L9 9.586l3.293-3.293a1 1 0 011.414 1.414z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-1 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className="w-4 h-4 rounded-full bg-[#8BC349]"
                          />
                        ))}
                        <svg className="w-4 h-4 text-blue-500 ml-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p
                        className="mb-4 flex-1 review-text"
                        style={{
                          fontSize: '14px',
                          color: '#3C3B40',
                          fontFamily: '"Barlow", sans-serif',
                          lineHeight: '1.6',
                        }}
                      >
                        {review.text}
                      </p>
                      <a
                        href="#"
                        className="text-gray-500 text-sm hover:underline"
                        style={{
                          fontFamily: '"Barlow", sans-serif',
                        }}
                      >
                        Read more
                      </a>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer / Contact */}
      <footer id="contact" className="bg-gray-100 px-4 sm:px-6 py-8 md:py-12">
        <div className="mx-auto max-w-7xl">
          {/* Top Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-6 md:mb-8">
            {/* Left: Brand */}
            <div>
              <h3
                className="text-3xl md:text-4xl font-bold mb-2"
                style={{
                  fontFamily: '"Barlow", sans-serif',
                  color: '#3C3B40',
                }}
              >
                ANIS VILLA
              </h3>
              <p
                className="text-sm uppercase tracking-wide"
                style={{
                  fontFamily: '"Barlow", sans-serif',
                  color: '#3C3B40',
                }}
              >
                CONTACT US & BOOK NOW
              </p>
            </div>

            {/* Middle: Contact */}
            <div>
              <p
                className="mb-4"
                style={{
                  fontSize: '14px',
                  color: '#3C3B40',
                  fontFamily: '"Barlow", sans-serif',
                }}
              >
                Da nang, Vietnam
              </p>
              <p
                className="mb-2 flex items-center gap-2"
                style={{
                  fontSize: '14px',
                  color: '#3C3B40',
                  fontFamily: '"Barlow", sans-serif',
                }}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                +62 361-6202877
              </p>
              <p
                className="flex items-center gap-2"
                style={{
                  fontSize: '14px',
                  color: '#3C3B40',
                  fontFamily: '"Barlow", sans-serif',
                }}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                info@anisvilla.com
              </p>
            </div>

            {/* Right: Links & Social */}
            <div>
              <a
                href="#"
                className="block mb-3 underline"
                style={{
                  fontSize: '14px',
                  color: '#3C3B40',
                  fontFamily: '"Barlow", sans-serif',
                }}
              >
                CONTACT US
              </a>
              <a
                href="#"
                className="block mb-6 underline"
                style={{
                  fontSize: '14px',
                  color: '#3C3B40',
                  fontFamily: '"Barlow", sans-serif',
                }}
              >
                GET DIRECTIONS
              </a>
              <div className="flex gap-3">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-300 hover:bg-gray-400 transition-all"
                  aria-label="Facebook"
                >
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-300 hover:bg-gray-400 transition-all"
                  aria-label="Instagram"
                >
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-300 my-8"></div>

          {/* Bottom Section: Copyright */}
          <div className="text-center pt-8">
            <p
              style={{
                fontSize: '14px',
                color: '#3C3B40',
                fontFamily: '"Barlow", sans-serif',
              }}
            >
              &copy; {new Date().getFullYear()} Anis Villa. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
