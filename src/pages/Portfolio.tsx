import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

const CATEGORIES = ['All', 'Bridal', 'Engagement', 'Reception', 'Destination', 'Artistry'];

const PORTFOLIO_ITEMS = [
  // BRIDAL CATEGORY
  { id: '1', title: 'Royal Kundan Red Bride', category: 'Bridal', src: 'https://drive.google.com/thumbnail?id=11bTisad9hk9muFThyIgJ9YY_75byZLLO&sz=w1080', position: 'object-[center_top]' },
  { id: '2', title: 'Editorial South Asian Bride', category: 'Bridal', src: 'https://drive.google.com/thumbnail?id=1uZQha2bv6_pDXpZZNxMKWZp-AlA_OwqT&sz=w1080', position: 'object-[center_top]' },
  { id: '4', title: 'Regal Gold Kundan Portrait', category: 'Bridal', src: 'https://drive.google.com/thumbnail?id=19FYB0a5sSEVcn8Vfq933oABEXC-PnnOF&sz=w1080', position: 'object-[center_top]' },
  { id: '5', title: 'Contemporary Crimson Bride', category: 'Bridal', src: 'https://drive.google.com/thumbnail?id=1QE0eedAxgy2hFSkqdGukXo6kh9vuJADM&sz=w1080', position: 'object-[center_top]' },
  { id: '6', title: 'Opulent Palace Bridal Look', category: 'Bridal', src: 'https://drive.google.com/thumbnail?id=1hU2ePiAdhESb9YqX2ZPB0QAjOhGGieWy&sz=w1080', position: 'object-[center_top]' },
  { id: '7', title: 'Timeless Traditional Elegance', category: 'Bridal', src: 'https://drive.google.com/thumbnail?id=1hzPHtKvgOlLlK2VyDhNTt9fXYopmtGkB&sz=w1080', position: 'object-[center_top]' },
  { id: '8', title: 'Sleek Modern Bridal Glow', category: 'Bridal', src: 'https://drive.google.com/thumbnail?id=1kc5bWqA_qoaEIqB6mvMbMXdjXP5RwovB&sz=w1080', position: 'object-[center_top]' },

  // ENGAGEMENT CATEGORY
  { id: '11', title: 'Pastel Garden Ceremony', category: 'Engagement', src: 'https://drive.google.com/thumbnail?id=1MN7DdCWXD-xdkkJm6yonq0Sba2ZHt9BJ&sz=w1080', position: 'object-[center_top]' },
  { id: '13', title: 'Sun-Kissed Engagement Look', category: 'Engagement', src: 'https://drive.google.com/thumbnail?id=1TkYZRkx6Bft1SKiE1LvKH4c3CwZdTNVo&sz=w1080', position: 'object-[center_top]' },
  { id: '14', title: 'Chic Evening Engagement', category: 'Engagement', src: 'https://drive.google.com/thumbnail?id=1j1jVNPVbMysukBukRXcxOTYKs2NwDgNg&sz=w1080', position: 'object-[center_top]' },
  { id: '15', title: 'Delicate Floral Sangeet Look', category: 'Engagement', src: 'https://drive.google.com/thumbnail?id=1kUqsH-Fh-XD9HAXhv0A6Dabt5tIP377d&sz=w1080', position: 'object-[center_top]' },

  // RECEPTION CATEGORY
  { id: '16', title: 'Airbrush Yellow Lehenga Glam', category: 'Reception', src: 'https://drive.google.com/thumbnail?id=1Da7FomBdM8M7OqzVU3d2yV9IUwfi48us&sz=w1080', position: 'object-[center_top]' },
  { id: '17', title: 'Glistening Reception Glam', category: 'Reception', src: 'https://drive.google.com/thumbnail?id=11RAjl2b5DWq8b65MgHw45DVsNBGkcAaw&sz=w1080', position: 'object-[center_top]' },
  { id: '18', title: 'High-HD Reception Finish', category: 'Reception', src: 'https://drive.google.com/thumbnail?id=173Zi3jXZkDhDghrvzhCsYUD-8mirpmAA&sz=w1080', position: 'object-[center_top]' },
  { id: '19', title: 'Midnight Starlight Couture', category: 'Reception', src: 'https://drive.google.com/thumbnail?id=1ebPsYAv2XV_BheDtxNUSIni6eCfJxncy&sz=w1080', position: 'object-[center_top]' },
  { id: '20', title: 'Natural Glow Transformation', category: 'Reception', src: 'https://drive.google.com/thumbnail?id=1SomkXXqIMtfDOQ0GS5XAlrEEsuBkFzDu&sz=w1080', position: 'object-[center_top]' },
  { id: '21', title: 'Sculpted HD Beauty', category: 'Reception', src: 'https://drive.google.com/thumbnail?id=1u9jr6vQuVkU0BvSng5616hkemuB20O95&sz=w1080', position: 'object-[center_top]' },

  // DESTINATION CATEGORY
  { id: '22', title: 'Udaipur Palace Destination', category: 'Destination', src: 'https://drive.google.com/thumbnail?id=1FbLQN5cZv8JnQMoBgeR9kFlPtj7UV4Bf&sz=w1080', position: 'object-[center_top]' },
  { id: '24', title: 'Beachside Royal Sunset', category: 'Destination', src: 'https://drive.google.com/thumbnail?id=14kKbtmD8rU-oJzjnQm_o44E0Z8RL5zBg&sz=w1080', position: 'object-[center_top]' },
  { id: '25', title: 'Tropical Pink Lehenga Bride', category: 'Destination', src: 'https://drive.google.com/thumbnail?id=1vT8i8tGBSv1jeEfg1wYeTY4ID_zxAau7&sz=w1080', position: 'object-[center_top]' },
  { id: '26', title: 'Destination Sunset Radiance', category: 'Destination', src: 'https://drive.google.com/thumbnail?id=1ZpyRzgZBj8_vzgFua-Q9gBLAZisO60SW&sz=w1080', position: 'object-[center_top]' },

  // ARTISTRY CATEGORY
  { id: '28', title: 'Jewelry Styling Precision', category: 'Artistry', src: 'https://drive.google.com/thumbnail?id=1PSFKJbo2m3f_mrHuifIU3iKa5WF-sNLW&sz=w1080', position: 'object-[center_top]' },
  { id: '29', title: 'Eye Makeup Masterclass', category: 'Artistry', src: 'https://drive.google.com/thumbnail?id=1n1Sefn5Ahl0tmbw2j956nayR3W_uEPwW&sz=w1080', position: 'object-[center_top]' },
  { id: '30', title: 'Bridal Preparation Studio', category: 'Artistry', src: 'https://drive.google.com/thumbnail?id=1zhmnxlQS1iuk77C_2n6GOgGmUKyJMLUq&sz=w1080', position: 'object-[center_top]' },
  { id: '31', title: 'Signature Touch Styling', category: 'Artistry', src: 'https://drive.google.com/thumbnail?id=1r_juGdUhZHbj6senueHky8PKM5EhqCpR&sz=w1080', position: 'object-[center_top]' }
];

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const filteredItems = useMemo(() => {
    if (activeFilter === 'All') return PORTFOLIO_ITEMS;
    return PORTFOLIO_ITEMS.filter(item => item.category === activeFilter);
  }, [activeFilter]);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % filteredItems.length);
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  };

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
