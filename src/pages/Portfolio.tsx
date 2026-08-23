import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

const CATEGORIES = ['All', 'Bridal', 'Engagement', 'Reception', 'Destination', 'Artistry'];

const PORTFOLIO_ITEMS = [
  { id: '1', title: 'Tropical Pink Lehenga Bride', category: 'Bridal', src: 'https://drive.google.com/thumbnail?id=174B5EmcC2GqUwDEi2hWkUwh2oIH39UxI&sz=w1080', position: 'object-[85%_25%]' },
  { id: '2', title: 'Royal Staircase Bride', category: 'Bridal', src: 'https://drive.google.com/thumbnail?id=14zzL815Zj1i2YnuV71OaGR43rlfrl8GZ&sz=w1080', position: 'object-[95%_center]' },
  { id: '3', title: 'Royal Kundan Ceremony Bride', category: 'Bridal', src: 'https://drive.google.com/thumbnail?id=1j_MmOD7r0ZlLKUGQU9UloY_ywuugVoHD&sz=w1080', position: 'object-[65%_top]' },
  { id: '4', title: 'Airbrush Yellow Lehenga Glam', category: 'Reception', src: 'https://drive.google.com/thumbnail?id=1Da7FomBdM8M7OqzVU3d2yV9IUwfi48us&sz=w1080', position: 'object-[center_top]' },
  { id: '5', title: 'Chic Evening Ceremony', category: 'Engagement', src: 'https://drive.google.com/thumbnail?id=1j1jVNPVbMysukBukRXcxOTYKs2NwDgNg&sz=w1080', position: 'object-[center_top]' },
  { id: '6', title: 'Sun-Kissed Golden Glow', category: 'Engagement', src: 'https://drive.google.com/thumbnail?id=1TkYZRkx6Bft1SKiE1LvKH4c3CwZdTNVo&sz=w1080', position: 'object-[center_top]' },
  { id: '7', title: 'Glistening Reception Artistry', category: 'Reception', src: 'https://drive.google.com/thumbnail?id=11RAjl2b5DWq8b65MgHw45DVsNBGkcAaw&sz=w1080', position: 'object-[center_top]' },
  { id: '8', title: 'Delicate Floral Sangeet', category: 'Engagement', src: 'https://drive.google.com/thumbnail?id=1kUqsH-Fh-XD9HAXhv0A6Dabt5tIP377d&sz=w1080', position: 'object-[center_top]' },
  { id: '9', title: 'Destination Luxury Grace', category: 'Destination', src: 'https://drive.google.com/thumbnail?id=1b2f2Z4ZR-ZWJWIlXayaOgzWAAjzZPzXi&sz=w1080', position: 'object-[center_top]' },
  { id: '10', title: 'Regal Gold Kundan Portrait', category: 'Artistry', src: 'https://drive.google.com/thumbnail?id=19FYB0a5sSEVcn8Vfq933oABEXC-PnnOF&sz=w1080', position: 'object-[center_top]' }
];

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const filteredItems = useMemo(() => {
    if (activeFilter === 'All') return PORTFOLIO_ITEMS;
    return PORTFOLIO_ITEMS.filter(item => item.category === activeFilter);
  }, [activeFilter]);

  const handleNext = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % filteredItems.length);
    }
  };

  const handlePrev = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === 'Escape') setSelectedIndex(null);
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, filteredItems.length]);

  return (
    <div className="bg-brand-bg w-full pt-20 md:pt-24 pb-24 min-h-screen">
      <Helmet>
        <title>Bridal Makeup Portfolio Gallery | Makeovers by Niki</title>
        <meta name="description" content="Explore our curated gallery of luxury bridal makeup transformations across India and global wedding destinations." />
        <link rel="canonical" href="https://makeoversbyniki.com/portfolio" />
      </Helmet>

      {/* Header */}
      <header className="max-w-4xl mx-auto text-center px-6 mb-12 md:mb-16">
        <span className="uppercase tracking-[0.3em] text-secondary text-xs sm:text-sm font-medium mb-3 block">
          Curated Archives
        </span>
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif text-primary leading-tight mb-6">
          The <span className="italic">Portfolio</span>
        </h1>
        <p className="text-primary/70 font-light text-base sm:text-lg max-w-2xl mx-auto">
          A curated selection of luxury bridal looks, editorial moments, and destination weddings styled by Niki across India and internationally.
        </p>
      </header>

      {/* Category Filter Tabs */}
      <div className="max-w-7xl mx-auto px-6 mb-12 flex flex-wrap justify-center gap-3 sm:gap-6">
        {CATEGORIES.map(cat => {
          const count = cat === 'All' ? PORTFOLIO_ITEMS.length : PORTFOLIO_ITEMS.filter(i => i.category === cat).length;
          return (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`uppercase tracking-widest text-xs font-medium transition-all duration-300 px-3.5 py-2 rounded-full border ${
                activeFilter === cat 
                  ? 'bg-secondary text-brand-bg border-secondary shadow-md' 
                  : 'bg-white/5 text-primary/70 border-white/10 hover:border-secondary/50 hover:text-white'
              }`}
            >
              {cat} <span className="text-[10px] opacity-75">({count})</span>
            </button>
          );
        })}
      </div>

      {/* Refined Responsive Grid */}
      <div className="max-w-[1600px] mx-auto px-6">
        <motion.div layout className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          <AnimatePresence>
            {filteredItems.map((item, idx) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="relative overflow-hidden group cursor-zoom-in rounded-sm border border-white/10 shadow-lg aspect-[3/4] bg-[#111216]"
                onClick={() => setSelectedIndex(idx)}
              >
                {/* Background Image */}
                <img 
                  src={item.src} 
                  alt={`${item.title} - Luxury Bridal Makeup by Niki`} 
                  className={`w-full h-full object-cover ${item.position} transform group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100`}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  decoding="async"
                />

                {/* Subtle Hover Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex flex-col justify-end p-4 md:p-6">
                  <span className="text-secondary text-[10px] md:text-xs tracking-[0.2em] uppercase font-semibold mb-1">
                    {item.category}
                  </span>
                  <h3 className="text-white font-serif text-sm md:text-lg leading-snug">
                    {item.title}
                  </h3>
                </div>

                {/* Always-visible category pill on mobile */}
                <div className="absolute top-3 left-3 md:hidden z-10 bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-full text-[9px] uppercase tracking-wider text-secondary border border-secondary/20">
                  {item.category}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredItems.length === 0 && (
          <div className="text-center py-32 text-primary/50 font-serif text-2xl italic">
            No looks found in this category.
          </div>
        )}
      </div>

      {/* Lightbox Modal with Next / Prev Navigation */}
      <AnimatePresence>
        {selectedIndex !== null && filteredItems[selectedIndex] && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/95 px-4 md:px-12 backdrop-blur-md"
            onClick={() => setSelectedIndex(null)}
          >
            {/* Close Button */}
            <button 
              className="absolute top-6 right-6 z-30 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors flex items-center justify-center"
              onClick={() => setSelectedIndex(null)}
              aria-label="Close Preview"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Left Prev Arrow */}
            <button
              className="absolute left-4 md:left-8 z-30 p-3 bg-white/10 hover:bg-secondary hover:text-brand-bg text-white rounded-full transition-all duration-300"
              onClick={handlePrev}
              aria-label="Previous Image"
            >
              <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
            </button>

            {/* Right Next Arrow */}
            <button
              className="absolute right-4 md:right-8 z-30 p-3 bg-white/10 hover:bg-secondary hover:text-brand-bg text-white rounded-full transition-all duration-300"
              onClick={handleNext}
              aria-label="Next Image"
            >
              <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
            </button>

            {/* Main Lightbox Content */}
            <div 
              className="relative max-w-4xl max-h-[85vh] flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.img 
                key={filteredItems[selectedIndex].id}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.3 }}
                src={filteredItems[selectedIndex].src}
                alt={filteredItems[selectedIndex].title}
                className="max-w-full max-h-[75vh] object-contain rounded-sm shadow-2xl border border-white/10"
                referrerPolicy="no-referrer"
              />

              <div className="mt-4 text-center">
                <span className="text-secondary text-xs uppercase tracking-[0.2em] font-medium block mb-1">
                  {filteredItems[selectedIndex].category} • {selectedIndex + 1} of {filteredItems.length}
                </span>
                <h3 className="text-white font-serif text-xl md:text-2xl">
                  {filteredItems[selectedIndex].title}
                </h3>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
