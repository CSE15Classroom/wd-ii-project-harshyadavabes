import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch } from 'react-icons/fi';
import { menuItems, comboDeals, categories } from '../data/menuData';
import MenuCard from '../components/MenuCard';
import ComboCard from '../components/ComboCard';
import VegToggle from '../components/VegToggle';

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [isVegOnly, setIsVegOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter logic
  const filteredItems = useMemo(() => {
    let items = menuItems;

    // Category filter
    if (activeCategory !== 'all' && activeCategory !== 'combos') {
      items = items.filter((item) => item.category === activeCategory);
    }

    // Veg filter
    if (isVegOnly) {
      items = items.filter((item) => item.isVeg);
    }

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      items = items.filter(
        (item) =>
          item.name.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query)
      );
    }

    return items;
  }, [activeCategory, isVegOnly, searchQuery]);

  const filteredCombos = useMemo(() => {
    let combos = comboDeals;

    if (isVegOnly) {
      combos = combos.filter((c) => c.isVeg);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      combos = combos.filter(
        (c) =>
          c.name.toLowerCase().includes(query) ||
          c.description.toLowerCase().includes(query)
      );
    }

    return combos;
  }, [isVegOnly, searchQuery]);

  const showCombos = activeCategory === 'all' || activeCategory === 'combos';
  const showMenuItems = activeCategory !== 'combos';

  const hasResults =
    (showMenuItems && filteredItems.length > 0) ||
    (showCombos && filteredCombos.length > 0);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-dark pt-24 pb-24 md:pb-8 relative">
      <div 
        className="absolute inset-0 opacity-10 mix-blend-overlay pointer-events-none fixed"
        style={{
          backgroundImage: 'url(/images/spicy_background.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-brand text-4xl sm:text-5xl font-bold text-gradient-fire mb-3">
            Our Menu
          </h1>
          <p className="text-white/50 text-lg">
            Crafted with passion, served with fire 🔥
          </p>
        </motion.div>

        {/* Filters Row */}
        <div className="space-y-4 mb-8">
          {/* Category Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none -mx-4 px-4">
            {categories.map((cat) => (
              <motion.button
                key={cat.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium
                           transition-all duration-300 cursor-pointer whitespace-nowrap
                  ${
                    activeCategory === cat.id
                      ? 'bg-gradient-fire text-white shadow-lg shadow-brand-red/30'
                      : 'glass text-white/60 hover:text-white'
                  }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </motion.button>
            ))}
          </div>

          {/* Search & Veg Toggle Row */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Search Bar */}
            <div className="relative flex-1">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 w-5 h-5" />
              <input
                type="text"
                placeholder="Search menu..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-full glass text-white placeholder-white/30
                          text-sm focus:outline-none focus:ring-2 focus:ring-brand-red/50 transition-all"
              />
            </div>

            {/* Veg Toggle */}
            <VegToggle isVegOnly={isVegOnly} setIsVegOnly={setIsVegOnly} />
          </div>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {!hasResults ? (
            /* Empty State */
            <motion.div
              key="empty"
              className="flex flex-col items-center justify-center py-20 text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <div className="text-6xl mb-4">🔥</div>
              <h3 className="text-white text-xl font-semibold mb-2">No items found</h3>
              <p className="text-white/40 text-sm max-w-sm">
                Try adjusting your filters or search to find what you're craving
              </p>
            </motion.div>
          ) : (
            <motion.div
              key={activeCategory + isVegOnly + searchQuery}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Combo Cards Section */}
              {showCombos && filteredCombos.length > 0 && (
                <div className="mb-10">
                  {activeCategory === 'all' && (
                    <motion.h2
                      className="font-brand text-2xl text-gradient-fire font-bold mb-5"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                    >
                      🔥 Combo Deals
                    </motion.h2>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredCombos.map((combo) => (
                      <ComboCard key={combo.id} combo={combo} />
                    ))}
                  </div>
                </div>
              )}

              {/* Menu Item Cards */}
              {showMenuItems && filteredItems.length > 0 && (
                <div>
                  {activeCategory === 'all' && filteredCombos.length > 0 && (
                    <motion.h2
                      className="font-brand text-2xl text-gradient-fire font-bold mb-5"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                    >
                      🍽️ Full Menu
                    </motion.h2>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {filteredItems.map((item) => (
                      <MenuCard key={item.id} item={item} />
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Menu;
