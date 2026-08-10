import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { IMAGES } from '../data';
import { ChevronLeft, ChevronRight, X as CloseIcon, Instagram, Facebook, Twitter, ArrowLeft } from 'lucide-react';

const SLIDES = [
  {
    subtitle: "ROYAL BRIDAL EXPERIENCE",
    title: "Crafting Unforgettable Grace for Your Special Day",
    linkText: "READ MORE >",
    image: IMAGES.heroSlides[0]
  },
  {
    subtitle: "CELEBRITY & EDITORIAL",
    title: "Dramatic Allure Designed for the Spotlight",
    linkText: "READ MORE >",
    image: IMAGES.heroSlides[4]
  },
  {
    subtitle: "SIGNATURE HD GLOW",
    title: "Soft Elegance Crafted for Every Radiant Angle",
    linkText: "READ MORE >",
    image: IMAGES.heroSlides[1]
  },
  {
    subtitle: "GLOBAL DESTINATION",
    title: "Bespoke Luxury Beauty Wherever You Say I Do",
    linkText: "READ MORE >",
    image: IMAGES.heroSlides[3]
  }
];

const CATEGORIES = [
  { 
    title: "Luxury Bridal Makeup", 
    landscape: "https://drive.google.com/thumbnail?id=11bTisad9hk9muFThyIgJ9YY_75byZLLO&sz=w800",
    mobile: "https://drive.google.com/thumbnail?id=1EYedjnAAVlsRq5YDHUFqLDfexJG-ejns&sz=w1080",
    position: "object-[80%_center]",
    mobilePosition: "object-[center_top]"
  },
  { 
    title: "HD Bridal Makeup", 
    landscape: "https://drive.google.com/thumbnail?id=1TkYZRkx6Bft1SKiE1LvKH4c3CwZdTNVo&sz=w800",
    mobile: "https://drive.google.com/thumbnail?id=1MN7DdCWXD-xdkkJm6yonq0Sba2ZHt9BJ&sz=w1080",
    position: "object-[center_top]",
    mobilePosition: "object-[center_35%]"
  },
  { 
    title: "Airbrush Bridal Makeup", 
    landscape: "https://drive.google.com/thumbnail?id=173Zi3jXZkDhDghrvzhCsYUD-8mirpmAA&sz=w800",
    mobile: "https://drive.google.com/thumbnail?id=11RAjl2b5DWq8b65MgHw45DVsNBGkcAaw&sz=w1080",
    position: "object-[65%_top]",
    mobilePosition: "object-[center_35%]"
  },
  { 
    title: "Engagement & Reception Styling", 
    landscape: "https://drive.google.com/thumbnail?id=1j1jVNPVbMysukBukRXcxOTYKs2NwDgNg&sz=w800",
    mobile: "https://drive.google.com/thumbnail?id=1kUqsH-Fh-XD9HAXhv0A6Dabt5tIP377d&sz=w1080",
    position: "object-center",
    mobilePosition: "object-[center_12%]"
  },
  { 
    title: "Destination Bridal Experience", 
    landscape: "https://drive.google.com/thumbnail?id=1sl2XSexbz5oJvsiHNS5ClvZikh3vIu_g&sz=w800",
    mobile: "https://drive.google.com/thumbnail?id=14kKbtmD8rU-oJzjnQm_o44E0Z8RL5zBg&sz=w1080",
    position: "object-[30%_center]",
    mobilePosition: "object-[center_12%]"
  }
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activePanel, setActivePanel] = useState<'none' | 'categories' | 'about'>('none');
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  useEffect(() => {
    // Prevent global scrolling to match the fixed slider layout constraint
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Preload all 5 hero slider images (landscape & mobile) in browser memory immediately
  useEffect(() => {
    SLIDES.forEach((slide) => {
      const imgLandscape = new Image();
      imgLandscape.src = slide.image.landscape;
      const imgMobile = new Image();
      imgMobile.src = slide.image.mobile;
    });
  }, []);

  // Manual slide navigation (auto-scroll disabled)

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);

  const minSwipeDistance = 50;
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > minSwipeDistance) {
      nextSlide();
    } else if (distance < -minSwipeDistance) {
      prevSlide();
    }
  };

  return (
    <div className="fixed top-20 md:top-24 h-[calc(100dvh-5rem)] md:h-[calc(100vh-6rem)] left-0 right-0 bg-[#0b0c10] text-white flex z-40 overflow-hidden font-sans">
      <Helmet>
        <title>Global Luxury Bridal Makeup Artist for HNI Weddings | Makeovers by Nikki</title>
        <meta name="description" content="Top luxury bridal makeup artist serving HNI clients across India and globally. Bespoke beauty transformations for elite destination weddings worldwide." />
      </Helmet>

      {/* Left Strip */}
      <div className="hidden md:flex md:w-20 border-r border-white/10 flex-col items-center h-full z-50 bg-black/50 backdrop-blur-md justify-center pb-8 shrink-0">
        <div className="flex flex-col items-center space-y-8">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center space-y-4 text-white/50 hover:text-white transition-colors group" aria-label="Twitter">
            <Twitter size={16} className="group-hover:text-secondary transition-colors" />
            <span className="[writing-mode:vertical-rl] rotate-180 text-[10px] tracking-[0.25em] uppercase group-hover:text-secondary transition-colors">twitter</span>
          </a>
          <div className="w-1 h-1 rounded-full bg-secondary opacity-50"></div>
          <a href="https://www.instagram.com/makeoversbyniki" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center space-y-4 text-white/50 hover:text-white transition-colors group" aria-label="Instagram">
            <Instagram size={16} className="group-hover:text-secondary transition-colors" />
            <span className="[writing-mode:vertical-rl] rotate-180 text-[10px] tracking-[0.25em] uppercase group-hover:text-secondary transition-colors">instagram</span>
          </a>
          <div className="w-1 h-1 rounded-full bg-secondary opacity-50"></div>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center space-y-4 text-white/50 hover:text-white transition-colors group" aria-label="Facebook">
            <Facebook size={16} className="group-hover:text-secondary transition-colors" />
            <span className="[writing-mode:vertical-rl] rotate-180 text-[10px] tracking-[0.25em] uppercase group-hover:text-secondary transition-colors">facebook</span>
          </a>
        </div>
      </div>

      {/* Main Content Area */}
      <div 
        className="flex-1 relative h-full bg-black overflow-hidden touch-pan-y w-full"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Mobile Vertical Right Side Strip (Perfectly aligned in a single straight line along right edge) */}
        <div className="md:hidden absolute right-0 top-1/2 -translate-y-1/2 z-30 flex flex-col items-end space-y-2">
          <button 
            onClick={() => setActivePanel(activePanel === 'categories' ? 'none' : 'categories')}
            className={`[writing-mode:vertical-rl] rotate-180 h-28 w-8 flex items-center justify-center rounded-l-md border-r-0 backdrop-blur-md text-[10px] tracking-[0.25em] uppercase font-bold border transition-colors ${
              activePanel === 'categories' ? 'bg-secondary text-brand-bg border-secondary shadow-2xl' : 'bg-black/85 text-white/90 border-white/20'
            }`}
          >
            {activePanel === 'categories' ? 'Close' : 'Categories'}
          </button>
          <button 
            onClick={() => setActivePanel(activePanel === 'about' ? 'none' : 'about')}
            className={`[writing-mode:vertical-rl] rotate-180 h-28 w-8 flex items-center justify-center rounded-l-md border-r-0 backdrop-blur-md text-[10px] tracking-[0.25em] uppercase font-bold border transition-colors ${
              activePanel === 'about' ? 'bg-secondary text-brand-bg border-secondary shadow-2xl' : 'bg-black/85 text-white/90 border-white/20'
            }`}
          >
            {activePanel === 'about' ? 'Close' : 'About'}
          </button>
        </div>

        <AnimatePresence initial={false} mode="wait">
          <motion.div 
            key={currentSlide} 
            className="absolute inset-0 z-0"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          >
            <img 
              src={SLIDES[currentSlide].image.landscape} 
              alt={SLIDES[currentSlide].title} 
              className="absolute inset-0 w-full h-full object-cover object-[center_top] opacity-100 hidden md:block"
              referrerPolicy="no-referrer"
              loading={currentSlide === 0 ? "eager" : "lazy"}
            />
            <img 
              src={SLIDES[currentSlide].image.mobile} 
              alt={SLIDES[currentSlide].title} 
              className="absolute inset-0 w-full h-full object-cover object-[center_top] opacity-100 block md:hidden"
              referrerPolicy="no-referrer"
              loading={currentSlide === 0 ? "eager" : "lazy"}
            />
            {/* Gradient Overlays: Top-focused dark shadow on mobile for top-centered text; Left-focused shadow on desktop */}
            <div className="absolute top-0 inset-x-0 h-48 bg-gradient-to-b from-black/90 via-black/50 to-transparent block md:hidden pointer-events-none z-[1]" />
            <div className="absolute inset-y-0 left-0 w-3/5 bg-gradient-to-r from-black/85 via-black/50 to-transparent hidden md:block pointer-events-none z-[1]" />
            <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[#0b0c10] via-[#0b0c10]/60 to-transparent pointer-events-none z-[1]" />
          </motion.div>
        </AnimatePresence>

        {/* Text Area for Slider: Top-Centered on Mobile, Bottom-Left on Desktop */}
        <div className="absolute inset-0 flex flex-col justify-start pt-6 md:justify-end md:pb-40 px-6 sm:px-8 md:pl-16 md:pr-24 md:right-32 z-10 pointer-events-none">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.8 }}
              className="pointer-events-auto flex flex-col items-center text-center md:items-start md:text-left"
            >
              <div className="flex items-center justify-center md:justify-start space-x-2.5 md:space-x-4 mb-2 md:mb-6">
                <div className="w-4 md:w-8 h-[1px] bg-secondary" />
                <span className="text-secondary tracking-[0.25em] text-[10px] sm:text-xs md:text-sm uppercase font-medium drop-shadow-md">{SLIDES[currentSlide].subtitle}</span>
                <div className="w-4 h-[1px] bg-secondary md:hidden" />
              </div>
              <h1 className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-sans font-bold leading-[1.2] mb-3 md:mb-8 text-white max-w-xs sm:max-w-xl md:max-w-3xl drop-shadow-2xl tracking-tight [text-shadow:_0_2px_15px_rgb(0_0_0_/_80%)]">
                {SLIDES[currentSlide].title.split('\n').map((line, i) => <div key={i}>{line}</div>) }
              </h1>
              <Link 
                to="/experience" 
                className="inline-flex items-center text-secondary hover:text-white uppercase tracking-[0.2em] text-[11px] md:text-sm font-semibold transition-colors drop-shadow-md py-1"
              >
                {SLIDES[currentSlide].linkText}
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Pagination & Arrows */}
        <div className="absolute bottom-6 right-6 sm:bottom-6 sm:right-10 md:bottom-10 md:right-10 z-10 flex items-center space-x-4 sm:space-x-6 md:space-x-12">
          <div className="flex items-center space-x-2.5 sm:space-x-3 md:space-x-6">
            {SLIDES.map((_, i) => (
              <div 
                key={i} 
                onClick={() => setCurrentSlide(i)}
                className={`flex items-center cursor-pointer transition-colors ${i === currentSlide ? 'text-secondary' : 'text-white/40 hover:text-white/80'}`}
              >
                <span className="text-xs sm:text-sm font-medium tracking-widest">{(i + 1).toString().padStart(2, '0')}</span>
                {i === currentSlide && <div className="hidden md:block w-8 md:w-12 h-[1px] bg-secondary ml-3 md:ml-6" />}
              </div>
            ))}
          </div>
          <div className="flex space-x-1.5 sm:space-x-2">
            <button 
              onClick={prevSlide}
              className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center hover:bg-white/10 rounded-full transition-colors bg-black/30 backdrop-blur-sm md:bg-transparent"
              aria-label="Previous Slide"
            >
              <ChevronLeft size={18} className="text-white/80 hover:text-white" />
            </button>
            <button 
              onClick={nextSlide}
              className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center hover:bg-white/10 rounded-full transition-colors bg-black/30 backdrop-blur-sm md:bg-transparent"
              aria-label="Next Slide"
            >
              <ChevronRight size={18} className="text-white/80 hover:text-white" />
            </button>
          </div>
        </div>

        {/* Categories Overlay Panel */}
        <AnimatePresence>
          {activePanel === 'categories' && (
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.5, ease: 'easeInOut' }}
              className="fixed inset-0 bg-[#141517] z-[999] flex flex-col overflow-y-auto"
            >
              {/* Top Panel Bar with Go Back to Home Page & Close Buttons */}
              <div className="sticky top-0 z-[1000] w-full bg-[#141517]/95 backdrop-blur-md px-6 md:px-12 py-4 border-b border-white/10 flex items-center justify-between shadow-2xl">
                <button 
                  onClick={() => setActivePanel('none')}
                  className="flex items-center space-x-2 bg-secondary text-brand-bg px-5 py-2.5 rounded-full font-bold text-xs md:text-sm tracking-widest uppercase shadow-2xl hover:bg-white transition-all active:scale-95 cursor-pointer"
                >
                  <ArrowLeft size={18} />
                  <span>GO BACK TO HOME PAGE</span>
                </button>
                <button 
                  onClick={() => setActivePanel('none')}
                  className="flex items-center space-x-2 bg-white/10 text-white hover:bg-white/20 px-4 py-2.5 rounded-full font-bold text-xs tracking-widest uppercase shadow-2xl transition-all active:scale-95 cursor-pointer"
                  aria-label="Close Categories Panel"
                >
                  <CloseIcon size={16} />
                  <span>CLOSE</span>
                </button>
              </div>

              <div className="flex-1 flex flex-col md:flex-row h-[calc(100vh-64px)] overflow-hidden pb-16 md:pb-0">
                {CATEGORIES.map((cat, i) => (
                  <Link 
                    to="/experience" 
                    key={i} 
                    onClick={() => setActivePanel('none')}
                    className="flex-1 relative group cursor-pointer overflow-hidden border-b md:border-b-0 md:border-r border-[#ffffff20] last:border-b-0 md:last:border-r-0 min-h-0 h-full block"
                  >
                    <img 
                      src={cat.landscape} 
                      alt={cat.title}
                      className={`absolute inset-0 w-full h-full object-cover opacity-100 group-hover:scale-105 transition-transform duration-700 hidden md:block ${cat.position}`} 
                      referrerPolicy="no-referrer" 
                    />
                    <img 
                      src={cat.mobile} 
                      alt={cat.title}
                      className={`absolute inset-0 w-full h-full object-cover opacity-100 group-hover:scale-105 transition-transform duration-700 block md:hidden ${cat.mobilePosition || 'object-[center_top]'}`} 
                      referrerPolicy="no-referrer" 
                    />
                    
                    <div className="absolute inset-0 flex flex-col justify-center md:justify-end p-3 sm:p-4 md:p-8 md:bottom-12 z-10">
                      <span className="text-lg sm:text-xl md:text-5xl font-extrabold text-white/90 mb-0.5 md:mb-4 group-hover:text-secondary transition-colors duration-300 [text-shadow:_0_2px_8px_rgba(0,0,0,0.95),_0_4px_16px_rgba(0,0,0,0.9)]">{(i + 1).toString().padStart(2, '0')}</span>
                      <span className="text-xs sm:text-sm md:text-2xl font-sans font-bold leading-tight text-white group-hover:text-secondary transition-colors duration-300 [text-shadow:_0_2px_8px_rgba(0,0,0,0.95),_0_4px_16px_rgba(0,0,0,0.9)]">{cat.title}</span>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Floating Bottom Go Back Bar for Both Desktop & Mobile */}
              <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[1000]">
                <button 
                  onClick={() => setActivePanel('none')}
                  className="flex items-center space-x-2 bg-secondary text-brand-bg px-6 py-3 rounded-full font-bold text-xs md:text-sm tracking-widest uppercase shadow-2xl active:scale-95 border-2 border-secondary hover:bg-white transition-all cursor-pointer"
                >
                  <ArrowLeft size={18} />
                  <span>GO BACK TO HOME PAGE</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* About Overlay Panel */}
        <AnimatePresence>
          {activePanel === 'about' && (
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.5, ease: 'easeInOut' }}
              className="fixed inset-0 bg-[#0d0e12] z-[999] flex flex-col overflow-y-auto"
            >
              {/* Top Panel Bar with Go Back to Home Page & Close Buttons */}
              <div className="sticky top-0 z-[1000] w-full bg-[#0d0e12]/95 backdrop-blur-md px-6 md:px-12 py-4 border-b border-white/10 flex items-center justify-between shadow-2xl">
                <button 
                  onClick={() => setActivePanel('none')}
                  className="flex items-center space-x-2 bg-secondary text-brand-bg px-5 py-2.5 rounded-full font-bold text-xs md:text-sm tracking-widest uppercase shadow-2xl hover:bg-white transition-all active:scale-95 cursor-pointer"
                >
                  <ArrowLeft size={18} />
                  <span>GO BACK TO HOME PAGE</span>
                </button>
                <button 
                  onClick={() => setActivePanel('none')}
                  className="flex items-center space-x-2 bg-white/10 text-white hover:bg-white/20 px-4 py-2.5 rounded-full font-bold text-xs tracking-widest uppercase shadow-2xl transition-all active:scale-95 cursor-pointer"
                  aria-label="Close About Panel"
                >
                  <CloseIcon size={16} />
                  <span>CLOSE</span>
                </button>
              </div>

              <div className="flex-1 flex flex-col md:flex-row h-[calc(100vh-64px)] overflow-hidden pb-16 md:pb-0 bg-[#0d0e12]">
                {/* Left Column: Image Container (Full-Width 16:9 Banner on Mobile, 3:4 Card on Desktop) */}
                <div className="w-full md:w-1/2 p-4 md:p-10 flex items-center justify-center shrink-0">
                  {/* Desktop Image (3:4 Portrait) */}
                  <div className="hidden md:block relative w-full max-w-md aspect-[3/4] max-h-[calc(100vh-140px)] rounded-lg overflow-hidden shadow-2xl border border-white/10">
                    <img 
                      src={IMAGES.about} 
                      alt="Niki - Makeup Artist"
                      className="w-full h-full object-cover object-[center_top] opacity-90 hover:scale-105 transition-transform duration-700" 
                      referrerPolicy="no-referrer" 
                    />
                  </div>
                  {/* Mobile Image (Full-Width 16:9 Landscape Banner) */}
                  <div className="block md:hidden relative w-full aspect-[16/9] max-h-[170px] rounded-lg overflow-hidden shadow-2xl border border-white/10">
                    <img 
                      src="https://drive.google.com/thumbnail?id=1zhmnxlQS1iuk77C_2n6GOgGmUKyJMLUq&sz=w1080" 
                      alt="Niki - Makeup Artist Mobile"
                      className="w-full h-full object-cover object-[center_top] opacity-95 hover:scale-105 transition-transform duration-700" 
                      referrerPolicy="no-referrer" 
                    />
                  </div>
                </div>

                {/* Right Column: Text Card (Seamlessly Connected for Mobile 0-Scroll) */}
                <div className="w-full md:w-1/2 flex flex-col justify-start md:justify-center px-6 md:px-16 pt-1 md:pt-12 pb-6 md:pb-12 relative flex-1 overflow-hidden">
                  <p className="text-secondary tracking-widest text-xs uppercase mb-1 md:mb-4 font-medium">About Me</p>
                  <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-sans font-bold leading-tight mb-2 md:mb-5 text-white drop-shadow-sm">
                    My name is Niki,<br/>I'm a Makeup Artist.
                  </h2>
                  <div className="w-8 h-[1px] bg-white/20 mb-3 md:mb-6" />
                  <p className="text-white/70 leading-relaxed font-light mb-4 md:mb-8 max-w-lg text-xs sm:text-sm md:text-base">
                    The world without beauty will be meaningless to us if there is no light and color, which opens up our minds and expresses passion. My transformations are inspired by light, color, creative perspective, techniques & personalities.
                  </p>
                  <Link 
                    to="/about" 
                    onClick={() => setActivePanel('none')}
                    className="inline-flex items-center space-x-2 text-secondary text-xs sm:text-sm font-semibold tracking-widest uppercase hover:text-white transition-colors select-none"
                  >
                    <span>READ MORE</span>
                    <span>&gt;</span>
                  </Link>

                  <div className="absolute -bottom-6 md:-bottom-10 md:left-10 text-[4rem] sm:text-[6rem] md:text-[12rem] font-sans font-black text-white/[0.03] select-none pointer-events-none tracking-tighter overflow-hidden">
                    About
                  </div>
                </div>
              </div>

              {/* Floating Bottom Go Back Bar for Both Desktop & Mobile */}
              <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[1000]">
                <button 
                  onClick={() => setActivePanel('none')}
                  className="flex items-center space-x-2 bg-secondary text-brand-bg px-6 py-3 rounded-full font-bold text-xs md:text-sm tracking-widest uppercase shadow-2xl active:scale-95 border-2 border-secondary hover:bg-white transition-all cursor-pointer"
                >
                  <ArrowLeft size={18} />
                  <span>GO BACK TO HOME PAGE</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* Right Strip (Desktop Only) */}
      <div className="hidden md:flex md:w-20 border-l border-white/10 flex-col items-center justify-center h-full z-50 bg-black/50 backdrop-blur-md shrink-0">
        <div className="flex flex-col items-center space-y-12">
          {activePanel === 'categories' ? (
            <button onClick={() => setActivePanel('none')} className="flex items-center hover:text-white transition-colors group cursor-pointer">
              <span className="[writing-mode:vertical-rl] rotate-180 flex items-center text-xs tracking-widest font-bold uppercase text-secondary group-hover:text-white transition-colors">
                <ArrowLeft size={14} className="mb-2" /> GO BACK
              </span>
            </button>
          ) : (
            <button onClick={() => setActivePanel('categories')} className="group cursor-pointer">
              <span className="[writing-mode:vertical-rl] rotate-180 text-xs tracking-widest font-medium uppercase text-white/50 group-hover:text-white transition-colors">CATEGORIES</span>
            </button>
          )}

          <div className="w-1 h-1 rounded-full bg-secondary"></div>

          {activePanel === 'about' ? (
            <button onClick={() => setActivePanel('none')} className="flex items-center hover:text-white transition-colors group cursor-pointer">
              <span className="[writing-mode:vertical-rl] rotate-180 flex items-center text-xs tracking-widest font-bold uppercase text-secondary group-hover:text-white transition-colors">
                <ArrowLeft size={14} className="mb-2" /> GO BACK
              </span>
            </button>
          ) : (
            <button onClick={() => setActivePanel('about')} className="group cursor-pointer">
              <span className="[writing-mode:vertical-rl] rotate-180 text-xs tracking-widest font-medium uppercase text-white/50 group-hover:text-white transition-colors hover:text-secondary">ABOUT</span>
            </button>
          )}
        </div>
      </div>
      
    </div>
  );
}
