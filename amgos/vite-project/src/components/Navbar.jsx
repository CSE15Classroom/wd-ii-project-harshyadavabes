import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiShoppingCart, FiMenu, FiX, FiUser } from 'react-icons/fi';
import { useCart } from '../context/CartContext';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/menu', label: 'Menu' },
  { path: '/orders', label: 'Orders' },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { cartCount } = useCart();

  return (
    <nav className="fixed top-0 left-0 w-full z-[999]">
      {/* Main bar */}
      <div className="glass border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[70px]">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <span className="text-3xl font-brand font-bold tracking-wider text-gradient-fire">
                amgOs
              </span>
              <span className="hidden sm:block text-[10px] uppercase tracking-[4px] text-smoke-300 mt-2">
                Hot & Fresh
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative text-sm font-medium tracking-wide transition-colors duration-300 py-2 ${
                    location.pathname === link.path
                      ? 'text-white'
                      : 'text-smoke-300 hover:text-white'
                  }`}
                >
                  {link.label}
                  {location.pathname === link.path && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute -bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-brand-red to-fire-orange rounded-full"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-3">
              {/* Cart */}
              <Link
                to="/cart"
                className="relative p-2.5 rounded-full glass hover:bg-white/10 transition-all duration-300 group"
              >
                <FiShoppingCart className="w-5 h-5 text-white group-hover:text-fire-orange transition-colors" />
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-brand-red to-fire-orange text-white text-[10px] font-bold rounded-full flex items-center justify-center"
                  >
                    {cartCount > 9 ? '9+' : cartCount}
                  </motion.span>
                )}
              </Link>

              {/* Profile */}
              <Link
                to="/profile"
                className="p-2.5 rounded-full glass hover:bg-white/10 transition-all duration-300 group hidden md:flex"
              >
                <FiUser className="w-5 h-5 text-white group-hover:text-fire-orange transition-colors" />
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="p-2.5 rounded-full glass hover:bg-white/10 transition-all duration-300 md:hidden"
              >
                {mobileOpen ? (
                  <FiX className="w-5 h-5 text-white" />
                ) : (
                  <FiMenu className="w-5 h-5 text-white" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[998] md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 h-full w-72 z-[999] md:hidden"
              style={{ background: 'linear-gradient(180deg, #1A0A0A 0%, #0A0A0A 100%)' }}
            >
              <div className="p-6 pt-20 flex flex-col gap-2">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.path}
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link
                      to={link.path}
                      onClick={() => setMobileOpen(false)}
                      className={`block py-3 px-4 rounded-xl text-lg font-medium transition-all duration-300 ${
                        location.pathname === link.path
                          ? 'bg-gradient-to-r from-brand-red to-fire-orange text-white'
                          : 'text-smoke-300 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <Link
                    to="/profile"
                    onClick={() => setMobileOpen(false)}
                    className={`block py-3 px-4 rounded-xl text-lg font-medium transition-all duration-300 ${
                      location.pathname === '/profile'
                        ? 'bg-gradient-to-r from-brand-red to-fire-orange text-white'
                        : 'text-smoke-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    Profile
                  </Link>
                </motion.div>

                <div className="mt-8 pt-6 border-t border-white/10">
                  <Link
                    to="/cart"
                    onClick={() => setMobileOpen(false)}
                    className="btn-fire w-full flex items-center justify-center gap-2 text-center"
                  >
                    <FiShoppingCart className="w-5 h-5" />
                    Cart {cartCount > 0 && `(${cartCount})`}
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;