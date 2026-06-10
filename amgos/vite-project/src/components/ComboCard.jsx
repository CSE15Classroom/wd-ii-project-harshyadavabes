import { motion } from 'framer-motion';
import { FiPlus, FiStar } from 'react-icons/fi';
import { HiUsers } from 'react-icons/hi2';
import { useCart } from '../context/CartContext';

const ComboCard = ({ combo }) => {
  const { addToCart } = useCart();

  const spiceEmojis = Array.from({ length: combo.spiceLevel }, (_, i) => (
    <span key={i} className="text-sm">🌶️</span>
  ));

  const handleAddCombo = (e) => {
    e.stopPropagation();
    addToCart({
      id: combo.id,
      name: combo.name,
      description: combo.description,
      price: combo.price,
      image: combo.image,
      isVeg: combo.isVeg,
      isCombo: true,
    });
  };

  return (
    <motion.div
      className="group relative rounded-2xl overflow-hidden fire-glow cursor-pointer"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6 }}
      whileHover={{ scale: 1.02 }}
    >
      {/* Inner card with glass background */}
      <div className="relative glass rounded-2xl overflow-hidden">
        {/* Tag Badge */}
        {combo.tag && (
          <div className="absolute top-0 left-0 right-0 z-10">
            <div className="bg-gradient-fire text-white text-center py-1.5 text-xs font-bold tracking-widest">
              🔥 {combo.tag} 🔥
            </div>
          </div>
        )}

        {/* Image Section */}
        <div className="relative h-52 overflow-hidden bg-dark-800 flex items-center justify-center pt-8">
          <motion.img
            src={combo.image}
            alt={combo.name}
            className="w-40 h-40 object-contain drop-shadow-2xl"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-dark-900/90 via-dark-900/30 to-transparent" />

          {/* Veg / Non-veg badge */}
          <div className="absolute bottom-3 left-3">
            <div className={combo.isVeg ? 'veg-badge' : 'nonveg-badge'} />
          </div>

          {/* Bestseller tag */}
          {combo.bestseller && (
            <div className="absolute top-10 right-3 px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider bg-gold text-dark-900">
              BESTSELLER
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="p-5 space-y-3">
          {/* Name */}
          <h3 className="font-brand text-white font-bold text-xl leading-tight">
            {combo.name}
          </h3>

          {/* Description */}
          <p className="text-white/50 text-sm leading-relaxed">
            {combo.description}
          </p>

          {/* Serves & Spice & Rating row */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/5 text-white/70 text-xs">
              <HiUsers className="w-3.5 h-3.5" />
              Serves {combo.servesCount}
            </div>

            {spiceEmojis.length > 0 && (
              <div className="flex items-center gap-0.5">{spiceEmojis}</div>
            )}

            <div className="flex items-center gap-1 text-gold text-sm ml-auto">
              <FiStar className="fill-gold" />
              <span className="font-medium">{combo.rating}</span>
            </div>
          </div>

          {/* Price Comparison */}
          <div className="flex items-end justify-between pt-1">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-white/30 text-sm line-through">₹{combo.originalPrice}</span>
                <span className="text-veg text-xs font-bold px-2 py-0.5 rounded-full bg-veg/10">
                  SAVE ₹{combo.savings}
                </span>
              </div>
              <span className="text-white font-bold text-2xl">₹{combo.price}</span>
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddCombo}
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-gradient-fire text-white text-sm font-semibold
                         shadow-lg hover:shadow-brand-red/40 transition-shadow duration-300 cursor-pointer"
            >
              <FiPlus className="w-4 h-4" />
              Add Combo
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ComboCard;
