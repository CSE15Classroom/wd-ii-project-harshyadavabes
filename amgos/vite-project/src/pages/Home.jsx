import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiStar, FiClock, FiTruck, FiShield } from 'react-icons/fi';
import Hero from '../components/Hero';
import FireParticles from '../components/FireParticles';
import { menuItems, comboDeals } from '../data/menuData';
import { useCart } from '../context/CartContext';

const featuredItems = menuItems.filter(i => i.bestseller).slice(0, 6);
const topCombos = comboDeals.filter(c => c.bestseller).slice(0, 3);

const Home = () => {
  const { addToCart } = useCart();

  return (
    <div className="bg-dark-900 min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* Featured Combos Section */}
      <section className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <FireParticles count={10} />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-[11px] uppercase tracking-[5px] text-fire-orange font-semibold">
            Value Deals
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-brand font-bold mt-3 text-gradient-fire">
            Blazing Combos
          </h2>
          <p className="text-smoke-300 mt-3 max-w-lg mx-auto text-sm sm:text-base">
            Unbeatable deals, maximum flavor. Grab a combo and save big.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {topCombos.map((combo, i) => (
            <motion.div
              key={combo.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative group rounded-2xl overflow-hidden fire-glow"
              style={{
                background: 'linear-gradient(145deg, rgba(200,16,46,0.15) 0%, rgba(10,10,10,0.9) 50%)',
              }}
            >
              <div className="p-1">
                <div className="glass rounded-2xl p-5 h-full">
                  {/* Tag */}
                  <span className="inline-block px-3 py-1 text-[10px] uppercase tracking-wider font-bold bg-gradient-to-r from-brand-red to-fire-orange text-white rounded-full mb-4">
                    {combo.tag}
                  </span>

                  {/* Image */}
                  <div className="relative h-40 flex items-center justify-center mb-4">
                    <img
                      src={combo.image}
                      alt={combo.name}
                      className="h-full w-auto object-contain drop-shadow-[0_20px_40px_rgba(200,16,46,0.3)] group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  {/* Info */}
                  <h3 className="text-lg font-brand font-bold text-white mb-1">
                    {combo.name}
                  </h3>
                  <p className="text-smoke-300 text-xs leading-relaxed mb-3 line-clamp-2">
                    {combo.description}
                  </p>

                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xs text-smoke-400 bg-white/5 px-2 py-1 rounded-full">
                      Serves {combo.servesCount}
                    </span>
                    {combo.isVeg ? (
                      <span className="veg-badge" />
                    ) : (
                      <span className="nonveg-badge" />
                    )}
                  </div>

                  {/* Price */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-bold text-white">₹{combo.price}</span>
                      <span className="text-sm text-smoke-400 line-through">₹{combo.originalPrice}</span>
                      <span className="text-xs font-bold text-green-400 bg-green-400/10 px-2 py-0.5 rounded-full">
                        SAVE ₹{combo.savings}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => addToCart(combo)}
                    className="btn-fire w-full mt-4 text-sm py-2.5"
                  >
                    Add Combo
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 text-fire-orange hover:text-white transition-colors text-sm font-semibold group"
          >
            View All Combos
            <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Popular Items Section */}
      <section className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-[11px] uppercase tracking-[5px] text-fire-orange font-semibold">
            Fan Favorites
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-brand font-bold mt-3 text-gradient-fire">
            Bestsellers
          </h2>
          <p className="text-smoke-300 mt-3 max-w-lg mx-auto text-sm sm:text-base">
            The items our customers can't stop ordering. Try them and you'll know why.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {featuredItems.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              className="group cursor-pointer"
              onClick={() => addToCart(item)}
            >
              <div className="glass rounded-2xl p-4 text-center hover:bg-white/10 transition-all duration-300">
                <div className="relative h-28 flex items-center justify-center mb-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-auto object-contain group-hover:scale-110 transition-transform duration-500 drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]"
                  />
                  <div className="absolute -top-1 -right-1">
                    {item.isVeg ? <span className="veg-badge" /> : <span className="nonveg-badge" />}
                  </div>
                </div>
                <h4 className="text-xs sm:text-sm font-semibold text-white mb-1 line-clamp-1">
                  {item.name}
                </h4>
                <div className="flex items-center justify-center gap-1 mb-2">
                  <FiStar className="w-3 h-3 text-fire-amber fill-fire-amber" />
                  <span className="text-[11px] text-smoke-300">{item.rating}</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-sm font-bold text-white">₹{item.price}</span>
                  {item.originalPrice && (
                    <span className="text-[10px] text-smoke-400 line-through">₹{item.originalPrice}</span>
                  )}
                </div>
                <div className="mt-2 text-[10px] text-fire-orange font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                  + Add to Cart
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            to="/menu"
            className="btn-fire inline-flex items-center gap-2 text-sm"
          >
            Explore Full Menu
            <FiArrowRight />
          </Link>
        </div>
      </section>

      {/* Why amgOs Section */}
      <section className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="text-[11px] uppercase tracking-[5px] text-fire-orange font-semibold">
              The amgOs Difference
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-brand font-bold mt-3 text-gradient-fire">
              Why Choose Us
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              {
                icon: <FiStar className="w-6 h-6" />,
                title: 'Premium Quality',
                desc: 'Only the freshest ingredients, crafted by expert chefs',
              },
              {
                icon: <FiClock className="w-6 h-6" />,
                title: 'Lightning Fast',
                desc: 'From kitchen to your table in under 15 minutes',
              },
              {
                icon: <FiTruck className="w-6 h-6" />,
                title: 'Free Delivery',
                desc: 'Complimentary delivery on all orders above ₹500',
              },
              {
                icon: <FiShield className="w-6 h-6" />,
                title: '100% Hygienic',
                desc: 'Prepared with highest safety and hygiene standards',
              },
            ].map((usp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className="glass rounded-2xl p-5 sm:p-6 text-center group"
              >
                <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-brand-red to-fire-orange flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300">
                  {usp.icon}
                </div>
                <h4 className="text-sm sm:text-base font-bold text-white mb-2">{usp.title}</h4>
                <p className="text-smoke-300 text-xs sm:text-sm leading-relaxed">{usp.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto relative rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(200,16,46,0.3)]"
        >
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60" 
            style={{ backgroundImage: 'url(/images/passionate_eater.png)' }} 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-dark-900 via-dark-800/80 to-transparent" />
          <FireParticles count={12} />

          <div className="relative z-10 py-16 sm:py-24 px-6 sm:px-16 flex flex-col items-center sm:items-start text-center sm:text-left max-w-2xl mx-auto sm:mx-0">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-brand font-bold text-white mb-4 drop-shadow-lg">
              Satisfy Your <span className="text-fire-orange">Cravings</span>
            </h2>
            <p className="text-white/90 text-sm sm:text-base mb-8 drop-shadow-md text-lg">
              Don't wait. The fire is ready, the flavors are calling. Experience the ultimate hot and spicy satisfaction today.
            </p>
            <Link
              to="/menu"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-brand-red to-fire-orange text-white font-bold rounded-full text-base sm:text-lg hover:shadow-[0_0_30px_rgba(255,107,53,0.5)] transition-all duration-300 hover:scale-105 w-full sm:w-auto"
            >
              🔥 Start Your Order
              <FiArrowRight />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-10 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="col-span-2 md:col-span-1">
              <h3 className="text-2xl font-brand font-bold text-gradient-fire mb-3">amgOs</h3>
              <p className="text-smoke-400 text-xs leading-relaxed">
                Premium hot & spicy food ordering. Crafted with passion, served with fire.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white mb-3">Quick Links</h4>
              <div className="flex flex-col gap-2">
                <Link to="/menu" className="text-xs text-smoke-400 hover:text-fire-orange transition-colors">Menu</Link>
                <Link to="/orders" className="text-xs text-smoke-400 hover:text-fire-orange transition-colors">Orders</Link>
                <Link to="/profile" className="text-xs text-smoke-400 hover:text-fire-orange transition-colors">Profile</Link>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white mb-3">Support</h4>
              <div className="flex flex-col gap-2">
                <span className="text-xs text-smoke-400">help@amgos.fire</span>
                <span className="text-xs text-smoke-400">+91 98765 43210</span>
                <span className="text-xs text-smoke-400">Mon-Sun 10AM-11PM</span>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white mb-3">Follow Us</h4>
              <div className="flex flex-col gap-2">
                <span className="text-xs text-smoke-400 hover:text-fire-orange transition-colors cursor-pointer">Instagram</span>
                <span className="text-xs text-smoke-400 hover:text-fire-orange transition-colors cursor-pointer">Twitter</span>
                <span className="text-xs text-smoke-400 hover:text-fire-orange transition-colors cursor-pointer">YouTube</span>
              </div>
            </div>
          </div>
          <div className="border-t border-white/5 mt-8 pt-6 text-center">
            <p className="text-smoke-400 text-[11px]">
              © 2026 amgOs. All rights reserved. Made with 🔥 and lots of spice.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
