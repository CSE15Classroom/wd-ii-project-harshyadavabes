import { useState } from 'react';
import { useOrders } from '../context/OrderContext';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPackage, FiClock, FiCheck, FiChevronDown, FiRefreshCw } from 'react-icons/fi';

const statusConfig = {
  confirmed: { label: 'Confirmed', bg: 'bg-amber-500/20', text: 'text-amber-400', border: 'border-amber-500/30' },
  preparing: { label: 'Preparing', bg: 'bg-orange-500/20', text: 'text-orange-400', border: 'border-orange-500/30' },
  ready: { label: 'Ready', bg: 'bg-green-500/20', text: 'text-green-400', border: 'border-green-500/30' },
  delivered: { label: 'Delivered', bg: 'bg-green-500/20', text: 'text-green-400', border: 'border-green-500/30' },
};

const Orders = () => {
  const { orders, totalSpent, orderCount } = useOrders();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const handleReorder = (order) => {
    order.items.forEach((item) => {
      for (let i = 0; i < item.quantity; i++) {
        addToCart(item);
      }
    });
    navigate('/cart');
  };

  const formatDate = (iso) => {
    const d = new Date(iso);
    return d.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="min-h-screen bg-dark-900 pt-24 pb-24 md:pb-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Page Title */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-brand text-gradient-fire mb-6 text-center"
        >
          Order History
        </motion.h1>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex justify-center gap-3 mb-8"
        >
          <div className="glass rounded-full px-5 py-2 flex items-center gap-2">
            <FiPackage className="text-fire-orange" />
            <span className="text-sm font-semibold text-smoke-200">{orderCount} Orders</span>
          </div>
          <div className="glass rounded-full px-5 py-2 flex items-center gap-2">
            <span className="text-gold text-sm">₹</span>
            <span className="text-sm font-semibold text-smoke-200">₹{totalSpent} Total Spent</span>
          </div>
        </motion.div>

        {/* Empty State */}
        {orders.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass rounded-2xl p-12 text-center flex flex-col items-center justify-center max-w-md mx-auto"
          >
            <FiPackage className="text-5xl text-smoke-400 mb-4" />
            <h2 className="text-xl font-semibold text-smoke-200 mb-2">No orders yet</h2>
            <p className="text-smoke-300 mb-6">Your order history will appear here</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/menu')}
              className="btn-fire px-8 py-3"
            >
              Start Ordering
            </motion.button>
          </motion.div>
        )}

        {/* Orders List */}
        <div className="space-y-4">
          {orders.map((order, index) => {
            const isExpanded = expandedId === order.id;
            const status = statusConfig[order.status] || statusConfig.confirmed;

            return (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                className="glass rounded-2xl overflow-hidden"
              >
                {/* Header */}
                <button
                  onClick={() => toggleExpand(order.id)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="font-mono text-sm text-gold">{order.id}</span>
                      <span
                        className={`text-xs px-2.5 py-0.5 rounded-full font-medium border ${status.bg} ${status.text} ${status.border}`}
                      >
                        {status.label}
                      </span>
                    </div>
                    <p className="text-xs text-smoke-400 mt-1">{formatDate(order.createdAt)}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-lg font-bold text-white">₹{order.total}</span>
                    <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
                      <FiChevronDown className="text-smoke-400" />
                    </motion.div>
                  </div>
                </button>

                {/* Expandable Details */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 border-t border-white/5 pt-4">
                        {/* Items */}
                        <div className="space-y-2 mb-4">
                          {order.items.map((item, i) => (
                            <div key={i} className="flex justify-between text-sm">
                              <span className="text-smoke-200">{item.name}</span>
                              <span className="text-smoke-300">
                                {item.quantity} × ₹{item.price}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* Order Info */}
                        <div className="space-y-1.5 text-xs text-smoke-400 mb-4">
                          <div className="flex items-center gap-2">
                            <FiClock className="text-smoke-400" />
                            <span>
                              {order.orderType === 'dineIn' ? '🍽️ Dine-In' : '🛵 Takeaway'}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <FiCheck className="text-smoke-400" />
                            <span className="capitalize">
                              Payment: {order.paymentMethod === 'cod' ? 'Cash on Delivery' : order.paymentMethod?.toUpperCase()}
                            </span>
                          </div>
                          {order.orderType === 'takeaway' && order.address && (
                            <div className="flex items-center gap-2">
                              <span className="text-smoke-400">📍</span>
                              <span>{order.address}</span>
                            </div>
                          )}
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-between pt-3 border-t border-white/5">
                          <span className="font-bold text-white">Total: ₹{order.total}</span>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleReorder(order)}
                            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-fire text-white text-sm font-semibold"
                          >
                            <FiRefreshCw className="text-sm" />
                            Reorder
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Orders;
