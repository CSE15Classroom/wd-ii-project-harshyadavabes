import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useOrders } from '../context/OrderContext';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCreditCard, FiSmartphone, FiDollarSign, FiMapPin, FiCheck } from 'react-icons/fi';

const Payment = () => {
  const { cartItems, subtotal, tax, deliveryFee, total, clearCart, orderType, setOrderType } = useCart();
  const { placeOrder } = useOrders();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [tableNumber, setTableNumber] = useState('');
  const [address, setAddress] = useState('');
  const [upiId, setUpiId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [placedOrder, setPlacedOrder] = useState(null);

  const paymentMethods = [
    { id: 'upi', label: 'UPI', icon: FiSmartphone },
    { id: 'card', label: 'Card', icon: FiCreditCard },
    { id: 'cod', label: 'Cash on Delivery', icon: FiDollarSign },
  ];

  const inputClass =
    'w-full bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl px-4 py-3 text-white placeholder-smoke-400 focus:outline-none focus:border-brand-red transition-colors';

  const handlePlaceOrder = () => {
    const deliveryAddress = orderType === 'dineIn' ? `Table ${tableNumber}` : address;
    const order = placeOrder(cartItems, total, orderType, paymentMethod, deliveryAddress);
    setPlacedOrder(order);
    clearCart();
    setShowSuccess(true);
  };

  return (
    <div className="min-h-screen bg-dark-900 pt-24 pb-24 md:pb-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Page Title */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-brand text-gradient-fire mb-8"
        >
          Payment
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* ── Left Column: Payment Form ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-3 space-y-6"
          >
            {/* Order Type Toggle */}
            <div className="glass rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-smoke-200 mb-4">Order Type</h2>
              <div className="flex gap-3">
                {['dineIn', 'takeaway'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setOrderType(type)}
                    className={`flex-1 py-3 rounded-xl font-semibold text-sm transition-all ${
                      orderType === type
                        ? 'bg-gradient-fire text-white shadow-lg shadow-brand-red/30'
                        : 'bg-white/5 text-smoke-300 hover:bg-white/10'
                    }`}
                  >
                    {type === 'dineIn' ? '🍽️ Dine-In' : '🛵 Takeaway'}
                  </button>
                ))}
              </div>

              {/* Dine-In: Table Number */}
              {orderType === 'dineIn' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4"
                >
                  <label className="text-sm text-smoke-300 mb-2 block">Table Number</label>
                  <input
                    type="text"
                    value={tableNumber}
                    onChange={(e) => setTableNumber(e.target.value)}
                    placeholder="e.g. 12"
                    className={inputClass}
                  />
                </motion.div>
              )}

              {/* Takeaway: Delivery Address */}
              {orderType === 'takeaway' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4"
                >
                  <label className="text-sm text-smoke-300 mb-2 flex items-center gap-2">
                    <FiMapPin className="text-fire-orange" /> Delivery Address
                  </label>
                  <textarea
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter your full delivery address..."
                    rows={3}
                    className={`${inputClass} resize-none`}
                  />
                </motion.div>
              )}
            </div>

            {/* Payment Method Selection */}
            <div className="glass rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-smoke-200 mb-4">Payment Method</h2>
              <div className="grid grid-cols-3 gap-3">
                {paymentMethods.map((method) => {
                  const Icon = method.icon;
                  const isSelected = paymentMethod === method.id;
                  return (
                    <motion.button
                      key={method.id}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setPaymentMethod(method.id)}
                      className={`relative flex flex-col items-center gap-2 py-5 rounded-xl border transition-all ${
                        isSelected
                          ? 'border-brand-red bg-brand-red/10 shadow-lg shadow-brand-red/20'
                          : 'border-white/10 bg-white/5 hover:border-white/20'
                      }`}
                    >
                      {isSelected && (
                        <motion.div
                          layoutId="payment-glow"
                          className="absolute inset-0 rounded-xl border-2 border-brand-red"
                          style={{
                            boxShadow: '0 0 20px rgba(200,16,46,0.3), inset 0 0 20px rgba(200,16,46,0.1)',
                          }}
                        />
                      )}
                      <Icon className={`text-2xl ${isSelected ? 'text-fire-orange' : 'text-smoke-300'}`} />
                      <span className={`text-xs font-medium ${isSelected ? 'text-white' : 'text-smoke-300'}`}>
                        {method.label}
                      </span>
                    </motion.button>
                  );
                })}
              </div>

              {/* Card Inputs */}
              <AnimatePresence>
                {paymentMethod === 'card' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-5 space-y-3 overflow-hidden"
                  >
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="Card Number"
                      className={inputClass}
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        placeholder="MM/YY"
                        className={inputClass}
                      />
                      <input
                        type="text"
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        placeholder="CVV"
                        className={inputClass}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* UPI Input */}
              <AnimatePresence>
                {paymentMethod === 'upi' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-5 overflow-hidden"
                  >
                    <input
                      type="text"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="yourname@upi"
                      className={inputClass}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* ── Right Column: Order Summary ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="glass rounded-2xl p-6 lg:sticky lg:top-28">
              <h2 className="text-lg font-semibold text-smoke-200 mb-4">Order Summary</h2>

              {/* Cart Items */}
              <div className="space-y-3 max-h-60 overflow-y-auto pr-1 mb-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between text-sm">
                    <span className="text-smoke-200 truncate mr-2">{item.name}</span>
                    <span className="text-smoke-300 whitespace-nowrap">
                      {item.quantity} × ₹{item.price}
                    </span>
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div className="border-t border-white/10 my-4" />

              {/* Pricing Breakdown */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-smoke-300">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-smoke-300">
                  <span>Tax (5%)</span>
                  <span>₹{tax}</span>
                </div>
                <div className="flex justify-between text-smoke-300">
                  <span>Delivery Fee</span>
                  <span>{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}</span>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-white/10 my-4" />

              {/* Total */}
              <div className="flex justify-between items-center mb-6">
                <span className="text-lg font-bold text-white">Total</span>
                <span className="text-2xl font-bold text-gradient-fire">₹{total}</span>
              </div>

              {/* Place Order Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handlePlaceOrder}
                disabled={cartItems.length === 0}
                className="w-full py-4 rounded-2xl bg-gradient-fire text-white font-bold text-lg fire-glow disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                Place Order — ₹{total}
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Success Modal ── */}
      <AnimatePresence>
        {showSuccess && placedOrder && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
          >
            {/* Backdrop */}
            <div className="absolute inset-0 glass-dark" onClick={() => {}} />

            {/* Modal */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              className="relative glass rounded-3xl p-8 max-w-sm w-full text-center z-10"
            >
              {/* Animated Checkmark */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/20 border-2 border-green-500 flex items-center justify-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.4, type: 'spring' }}
                >
                  <FiCheck className="text-green-400 text-4xl" />
                </motion.div>
              </motion.div>

              <h2 className="text-2xl font-brand text-gradient-fire mb-2">Order Placed!</h2>
              <p className="text-gold font-mono text-sm mb-1">{placedOrder.id}</p>
              <p className="text-smoke-300 text-sm mb-6">Estimated time: 15–20 mins</p>

              <div className="space-y-3">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => navigate('/orders')}
                  className="w-full py-3 rounded-xl bg-gradient-fire text-white font-semibold"
                >
                  View Orders
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => navigate('/menu')}
                  className="w-full py-3 rounded-xl bg-white/5 border border-white/10 text-smoke-200 font-semibold hover:bg-white/10 transition-colors"
                >
                  Back to Menu
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Payment;
