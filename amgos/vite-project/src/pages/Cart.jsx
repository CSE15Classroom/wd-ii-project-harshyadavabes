import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMinus, FiPlus, FiTrash2, FiShoppingBag } from 'react-icons/fi';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const navigate = useNavigate();
  const {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    cartCount,
    subtotal,
    tax,
    deliveryFee,
    total,
    orderType,
  } = useCart();

  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);

  const handleApplyCoupon = () => {
    if (couponCode.trim().toUpperCase() === 'FIRE20') {
      setCouponApplied(true);
    }
  };

  const couponDiscount = couponApplied ? Math.round(subtotal * 0.2) : 0;
  const finalTotal = total - couponDiscount;

  return (
    <div className="min-h-screen bg-gradient-dark pt-24 pb-24 md:pb-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-brand text-3xl sm:text-4xl font-bold text-gradient-fire">
            🔥 Your Cart
          </h1>
          <p className="text-white/40 mt-1">
            {cartCount > 0
              ? `${cartCount} item${cartCount > 1 ? 's' : ''} in your cart`
              : 'Your cart is waiting to be filled'}
          </p>
        </motion.div>

        {cartItems.length === 0 ? (
          /* Empty State */
          <motion.div
            className="flex flex-col items-center justify-center py-20 text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-24 h-24 rounded-full glass flex items-center justify-center mb-6">
              <FiShoppingBag className="w-10 h-10 text-white/30" />
            </div>
            <h3 className="text-white text-xl font-semibold mb-2">Your cart is empty</h3>
            <p className="text-white/40 text-sm max-w-sm mb-6">
              Looks like you haven't added anything yet. Explore our fiery menu and find something you love!
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/menu')}
              className="btn-fire px-8 py-3"
            >
              Browse Menu
            </motion.button>
          </motion.div>
        ) : (
          /* Cart Content */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items — takes 2 cols on desktop */}
            <div className="lg:col-span-2 space-y-4">
              <AnimatePresence>
                {cartItems.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 30, height: 0, marginBottom: 0 }}
                    transition={{ duration: 0.3 }}
                    className="glass rounded-xl p-4 flex items-center gap-4"
                  >
                    {/* Thumbnail */}
                    <div className="w-[60px] h-[60px] rounded-lg overflow-hidden bg-dark-800 flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Item Info */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-white font-semibold text-sm sm:text-base truncate">
                        {item.name}
                      </h4>
                      <p className="text-white/40 text-xs sm:text-sm">₹{item.price} each</p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2">
                      <motion.button
                        whileTap={{ scale: 0.85 }}
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 rounded-full bg-dark-700 flex items-center justify-center
                                   text-white/60 hover:text-white hover:bg-dark-600 transition-colors cursor-pointer"
                      >
                        <FiMinus className="w-3.5 h-3.5" />
                      </motion.button>

                      <span className="text-white font-semibold text-sm w-6 text-center">
                        {item.quantity}
                      </span>

                      <motion.button
                        whileTap={{ scale: 0.85 }}
                        onClick={() => addToCart(item)}
                        className="w-8 h-8 rounded-full bg-dark-700 flex items-center justify-center
                                   text-white/60 hover:text-white hover:bg-dark-600 transition-colors cursor-pointer"
                      >
                        <FiPlus className="w-3.5 h-3.5" />
                      </motion.button>
                    </div>

                    {/* Line Total */}
                    <span className="text-white font-bold text-sm sm:text-base w-16 text-right hidden sm:block">
                      ₹{item.price * item.quantity}
                    </span>

                    {/* Delete */}
                    <motion.button
                      whileTap={{ scale: 0.85 }}
                      onClick={() => removeFromCart(item.id)}
                      className="w-8 h-8 rounded-full flex items-center justify-center
                                 text-white/30 hover:text-nonveg hover:bg-nonveg/10 transition-colors cursor-pointer"
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </motion.button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Order Summary — 1 col, sticky on desktop */}
            <div className="lg:col-span-1">
              <motion.div
                className="glass rounded-2xl p-6 space-y-4 lg:sticky lg:top-28"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h3 className="text-white font-bold text-lg">Order Summary</h3>

                {/* Line items */}
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between text-white/60">
                    <span>Subtotal</span>
                    <span>₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-white/60">
                    <span>Tax (5% GST)</span>
                    <span>₹{tax}</span>
                  </div>
                  <div className="flex justify-between text-white/60">
                    <span>Delivery Fee</span>
                    <span className={deliveryFee === 0 ? 'text-veg font-medium' : ''}>
                      {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                    </span>
                  </div>
                  {deliveryFee === 0 && subtotal > 0 && (
                    <p className="text-veg/60 text-xs">
                      {orderType === 'dineIn'
                        ? 'Free for dine-in orders'
                        : subtotal > 500
                        ? 'Free delivery on orders over ₹500'
                        : ''}
                    </p>
                  )}

                  {couponApplied && (
                    <div className="flex justify-between text-veg font-medium">
                      <span>Coupon (FIRE20)</span>
                      <span>-₹{couponDiscount}</span>
                    </div>
                  )}
                </div>

                {/* Divider */}
                <div className="border-t border-white/10" />

                {/* Total */}
                <div className="flex justify-between items-center">
                  <span className="text-white font-bold text-lg">Total</span>
                  <span className="text-gradient-fire font-bold text-2xl">₹{finalTotal}</span>
                </div>

                {/* Coupon Input */}
                {!couponApplied && (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Coupon code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="flex-1 px-3 py-2 rounded-lg bg-dark-800 text-white text-sm
                                placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-brand-red/50"
                    />
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={handleApplyCoupon}
                      className="px-4 py-2 rounded-lg bg-dark-700 text-white/70 text-sm font-medium
                                hover:text-white hover:bg-dark-600 transition-colors cursor-pointer"
                    >
                      Apply
                    </motion.button>
                  </div>
                )}

                {couponApplied && (
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-veg/10 text-veg text-xs font-medium">
                    ✅ Coupon FIRE20 applied — 20% off!
                  </div>
                )}

                {/* CTA */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full btn-fire py-3.5 text-base fire-glow"
                  onClick={() => navigate('/checkout')}
                >
                  Proceed to Payment
                </motion.button>

                {/* Continue Shopping */}
                <button
                  onClick={() => navigate('/menu')}
                  className="w-full text-center text-white/40 text-sm hover:text-white/60 transition-colors cursor-pointer"
                >
                  ← Continue Shopping
                </button>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
