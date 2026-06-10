import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { heroItems } from '../data/menuData';
import FireParticles from './FireParticles';

const Hero = () => {
  const [direction, setDirection] = useState(1);
  const [prev, setPrev] = useState(0);
  const [current, setCurrent] = useState(0);
  const item = heroItems[current];

  const handleNext = () => {
    setDirection(1);
    setPrev(current);
    setCurrent((p) => (p + 1) % heroItems.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setPrev(current);
    setCurrent((p) => (p - 1 + heroItems.length) % heroItems.length);
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ background: heroItems[prev].gradient }}
        />
        <motion.div
          key={item.name + '-gradient'}
          className="absolute inset-0"
          style={{ background: item.gradient }}
          initial={{ x: direction === 1 ? '-100%' : '100%' }}
          animate={{ x: 0 }}
          exit={{ x: direction === 1 ? '100%' : '-100%' }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        />
        
        {/* Spicy Background Texture */}
        <div 
          className="absolute inset-0 opacity-40 mix-blend-overlay"
          style={{
            backgroundImage: 'url(/images/spicy_background.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </div>

      {/* Fire Particles */}
      <FireParticles count={15} />

      {/* Background word */}
      <AnimatePresence mode="wait">
        <motion.div
          key={item.shortName}
          className="absolute top-[25%] left-[17%] -translate-x-1/2 -translate-y-1/2 text-[clamp(100px,20vw,300px)] font-black text-white/[0.07] z-[1] tracking-[20px] pointer-events-none select-none uppercase font-brand whitespace-nowrap"
          initial={{ x: direction === 1 ? '-100%' : '100%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: direction === 1 ? '100%' : '-100%', opacity: 0 }}
          transition={{ duration: 0.9, ease: 'easeInOut' }}
        >
          {item.shortName}
        </motion.div>
      </AnimatePresence>

      {/* amgOs Watermark */}
      <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 text-[clamp(80px,15vw,200px)] font-brand font-black text-white/[0.03] z-[1] tracking-[30px] pointer-events-none select-none uppercase whitespace-nowrap">
        amgOs
      </div>

      {/* Content - Left Side */}
      <div className="absolute top-[12%] sm:top-[20%] left-1/2 sm:left-[5%] -translate-x-1/2 sm:translate-x-0 w-[90%] sm:w-auto z-[2] text-white max-w-md flex flex-col items-center sm:items-start text-center sm:text-left gap-3 sm:gap-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={item.name + '-heading'}
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center sm:items-start"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 text-[10px] uppercase tracking-[3px] font-semibold bg-white/10 backdrop-blur-sm rounded-full border border-white/10 text-fire-amber">
                🔥 Hot & Fresh
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-brand tracking-wide leading-tight">
              {item.name}
            </h1>
            <h3 className="text-sm sm:text-base font-normal text-smoke-200 mt-1 sm:mt-2 tracking-wide">
              {item.subtext}
            </h3>
          </motion.div>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.p
            key={item.name + '-desc'}
            className="text-sm sm:text-base text-smoke-200/80 leading-relaxed max-w-sm"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {item.description}
          </motion.p>
        </AnimatePresence>

        <motion.div
          className="flex flex-row items-center justify-center sm:justify-start gap-3 mt-2 w-full sm:w-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Link
            to="/menu"
            className="btn-fire text-xs sm:text-base px-4 sm:px-8 py-2.5 sm:py-3 whitespace-nowrap flex-1 sm:flex-none text-center"
          >
            Order Now 🔥
          </Link>
          <Link
            to="/menu"
            className="px-4 sm:px-8 py-2.5 sm:py-3 rounded-full border border-white/20 text-white text-xs sm:text-base font-medium hover:bg-white/10 transition-all duration-300 whitespace-nowrap flex-1 sm:flex-none text-center"
          >
            View Menu
          </Link>
        </motion.div>
      </div>

      {/* Hero Image */}
      <AnimatePresence mode="wait">
        <motion.img
          key={item.name + '-img'}
          src={item.image}
          alt={item.name}
          className="absolute z-[2] w-[280px] sm:w-[400px] lg:w-[550px] top-[45%] sm:top-[25%] left-1/2 sm:left-auto sm:right-[5%] -translate-x-1/2 sm:translate-x-0 drop-shadow-[0_40px_60px_rgba(0,0,0,0.5)]"
          initial={{ x: direction === 1 ? 300 : -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: direction === 1 ? -300 : 300, opacity: 0 }}
          transition={{ duration: 0.5 }}
        />
      </AnimatePresence>

      {/* Background food images */}
      <AnimatePresence mode="wait">
        {item.backgrounds.map((bg, index) => {
          const isTop = index < 3;
          return (
            <motion.img
              key={item.name + '-bg-' + index}
              src={bg.src}
              alt=""
              className="absolute z-[1] w-[200px] sm:w-[300px] lg:w-[400px] h-auto opacity-30 pointer-events-none hidden sm:block"
              style={{ top: bg.top, left: bg.left }}
              initial={{ y: isTop ? -100 : 100, opacity: 0 }}
              animate={{ y: 0, opacity: 0.15 }}
              exit={{ y: isTop ? -100 : 100, opacity: 0 }}
              transition={{ duration: 0.6 }}
            />
          );
        })}
      </AnimatePresence>

      {/* Navigation Arrows */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex gap-4 z-[3]">
        <button
          onClick={handlePrev}
          className="w-12 h-12 rounded-full glass flex items-center justify-center text-xl font-bold text-white hover:bg-white/20 hover:scale-110 transition-all duration-300 cursor-pointer"
        >
          ←
        </button>

        {/* Dots */}
        <div className="flex items-center gap-2">
          {heroItems.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > current ? 1 : -1);
                setPrev(current);
                setCurrent(i);
              }}
              className={`rounded-full transition-all duration-300 cursor-pointer ${
                i === current
                  ? 'w-8 h-2 bg-gradient-to-r from-brand-red to-fire-orange'
                  : 'w-2 h-2 bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="w-12 h-12 rounded-full glass flex items-center justify-center text-xl font-bold text-white hover:bg-white/20 hover:scale-110 transition-all duration-300 cursor-pointer"
        >
          →
        </button>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-dark-900 to-transparent z-[2] pointer-events-none" />
    </div>
  );
};

export default Hero;