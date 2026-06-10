import { motion } from 'framer-motion';
import { FiPlus, FiStar } from 'react-icons/fi';
import { useCart } from '../context/CartContext';

const MenuCard = ({ item }) => {
  const { addToCart } = useCart();

  const spiceEmojis = Array.from({ length: item.spiceLevel }, (_, i) => (
    <span key={i} className="text-sm">🌶️</span>
  ));

  return (
    <motion.div
      className="group relative rounded-2xl overflow-hidden glass cursor-pointer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
    >
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden bg-dark-800">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 to-transparent" />

        {/* Veg / Non-veg badge */}
        <div className="absolute top-3 left-3">
          <div className={item.isVeg ? 'veg-badge' : 'nonveg-badge'} />
        </div>

        {/* Bestseller tag */}
        {item.bestseller && (
          <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider bg-gold text-dark-900">
            BESTSELLER
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4 space-y-2">
        {/* Name */}
        <h3 className="text-white font-bold text-lg leading-tight">{item.name}</h3>

        {/* Description */}
        <p className="text-white/50 text-sm leading-relaxed line-clamp-2">
          {item.description}
        </p>

        {/* Spice Level & Rating */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-0.5">
            {spiceEmojis.length > 0 ? spiceEmojis : <span className="text-white/30 text-xs">Mild</span>}
          </div>
          <div className="flex items-center gap-1 text-gold text-sm">
            <FiStar className="fill-gold" />
            <span className="font-medium">{item.rating}</span>
          </div>
        </div>

        {/* Price & Add to Cart */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            <span className="text-white font-bold text-xl">₹{item.price}</span>
            {item.originalPrice && (
              <span className="text-white/30 text-sm line-through">₹{item.originalPrice}</span>
            )}
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation();
              addToCart(item);
            }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-fire text-white text-sm font-semibold
                       shadow-lg hover:shadow-brand-red/40 transition-shadow duration-300 cursor-pointer"
          >
            <FiPlus className="w-4 h-4" />
            Add
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default MenuCard;
