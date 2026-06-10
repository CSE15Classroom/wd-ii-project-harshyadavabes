import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHome, FiGrid, FiShoppingCart, FiClock, FiUser } from 'react-icons/fi';
import { useCart } from '../context/CartContext';

const tabs = [
  { path: '/', label: 'Home', icon: FiHome },
  { path: '/menu', label: 'Menu', icon: FiGrid },
  { path: '/cart', label: 'Cart', icon: FiShoppingCart },
  { path: '/orders', label: 'Orders', icon: FiClock },
  { path: '/profile', label: 'Profile', icon: FiUser },
];

const BottomNav = () => {
  const location = useLocation();
  const { cartCount } = useCart();

  return (
    <nav className="fixed bottom-0 left-0 w-full z-[998] md:hidden">
      <div className="glass-dark border-t border-white/5">
        <div className="flex items-center justify-around py-2 px-2">
          {tabs.map(tab => {
            const isActive = location.pathname === tab.path;
            const Icon = tab.icon;
            const isCart = tab.path === '/cart';

            return (
              <Link
                key={tab.path}
                to={tab.path}
                className="relative flex flex-col items-center gap-0.5 py-1 px-3 rounded-xl transition-all duration-300"
              >
                {isActive && (
                  <motion.div
                    layoutId="bottom-nav-glow"
                    className="absolute inset-0 rounded-xl"
                    style={{
                      background: 'radial-gradient(ellipse at center bottom, rgba(200,16,46,0.2) 0%, transparent 70%)',
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}

                <div className="relative">
                  <Icon
                    className={`w-5 h-5 transition-all duration-300 ${
                      isActive ? 'text-brand-red' : 'text-smoke-400'
                    }`}
                  />
                  {isCart && cartCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1.5 -right-2.5 w-4 h-4 bg-gradient-to-r from-brand-red to-fire-orange text-white text-[8px] font-bold rounded-full flex items-center justify-center"
                    >
                      {cartCount > 9 ? '9+' : cartCount}
                    </motion.span>
                  )}
                </div>

                <span
                  className={`text-[10px] font-medium transition-all duration-300 ${
                    isActive ? 'text-brand-red' : 'text-smoke-400'
                  }`}
                >
                  {tab.label}
                </span>

                {isActive && (
                  <motion.div
                    layoutId="bottom-nav-dot"
                    className="absolute -top-1 w-1 h-1 rounded-full bg-brand-red"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default BottomNav;
