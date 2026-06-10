import { useState } from 'react';
import { useUser } from '../context/UserContext';
import { useOrders } from '../context/OrderContext';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiPhone, FiMapPin, FiEdit2, FiLogOut, FiHeart, FiAward } from 'react-icons/fi';
import { FiPackage } from 'react-icons/fi';

const avatarOptions = ['🔥', '😎', '🍔', '🍕', '🌶️', '🍗', '👨‍🍳', '👩‍🍳'];

const Profile = () => {
  const { user, updateUser, resetUser } = useUser();
  const { orderCount, totalSpent } = useOrders();
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    address: user.address,
  });

  const handleSave = () => {
    updateUser(form);
    setIsEditing(false);
  };

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const profileFields = [
    { key: 'name', label: 'Name', icon: FiUser, type: 'text', placeholder: 'Your name' },
    { key: 'email', label: 'Email', icon: FiMail, type: 'email', placeholder: 'you@email.com' },
    { key: 'phone', label: 'Phone', icon: FiPhone, type: 'tel', placeholder: '+91 98765 43210' },
    { key: 'address', label: 'Address', icon: FiMapPin, type: 'text', placeholder: 'Delivery address' },
  ];

  const preferences = [
    { value: 'all', label: 'All', activeClass: 'bg-gradient-fire text-white' },
    { value: 'veg', label: 'Veg Only', activeClass: 'bg-green-500/20 text-green-400 border-green-500/40' },
    { value: 'nonveg', label: 'Non-Veg Only', activeClass: 'bg-red-500/20 text-red-400 border-red-500/40' },
  ];

  const stats = [
    { label: 'Total Orders', value: orderCount, icon: FiPackage },
    { label: 'Total Spent', value: `₹${totalSpent}`, icon: FiAward },
    { label: 'Favourite', value: '🌶️ Spicy', icon: FiHeart },
  ];

  return (
    <div className="min-h-screen bg-gradient-dark pt-24 pb-24 md:pb-8 px-4">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* ── Profile Header ── */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center text-center"
        >
          {/* Avatar */}
          <div className="relative mb-4">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center text-4xl"
              style={{
                background: 'linear-gradient(135deg, #C8102E, #FF6B35)',
                padding: '3px',
              }}
            >
              <div className="w-full h-full rounded-full bg-dark-900 flex items-center justify-center">
                {user.avatar}
              </div>
            </div>
          </div>

          <h1 className="text-2xl md:text-3xl font-brand text-gradient-fire">{user.name}</h1>
          <p className="text-sm text-smoke-400 mt-1">Member since Jun 2026</p>

          {/* Edit Toggle */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              if (isEditing) {
                handleSave();
              } else {
                setForm({ name: user.name, email: user.email, phone: user.phone, address: user.address });
                setIsEditing(true);
              }
            }}
            className={`mt-4 flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition-all ${
              isEditing
                ? 'bg-gradient-fire text-white'
                : 'bg-white/5 border border-white/10 text-smoke-200 hover:bg-white/10'
            }`}
          >
            <FiEdit2 className="text-sm" />
            {isEditing ? 'Save Profile' : 'Edit Profile'}
          </motion.button>
        </motion.div>

        {/* ── Stats Cards ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-3 gap-3"
        >
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.08 }}
                className="glass rounded-2xl p-4 text-center"
              >
                <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-gradient-fire flex items-center justify-center">
                  <Icon className="text-white text-lg" />
                </div>
                <p className="text-lg font-bold text-white">{stat.value}</p>
                <p className="text-xs text-smoke-400">{stat.label}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ── Emoji Avatar Picker (when editing) ── */}
        <AnimatePresenceWrapper show={isEditing}>
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="glass rounded-2xl p-5 overflow-hidden"
          >
            <h3 className="text-sm font-semibold text-smoke-300 mb-3">Choose Avatar</h3>
            <div className="flex gap-3 flex-wrap justify-center">
              {avatarOptions.map((emoji) => (
                <motion.button
                  key={emoji}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => updateUser({ avatar: emoji })}
                  className={`w-12 h-12 rounded-full text-2xl flex items-center justify-center transition-all ${
                    user.avatar === emoji
                      ? 'bg-brand-red/20 border-2 border-brand-red ring-2 ring-brand-red/30'
                      : 'bg-white/5 border border-white/10 hover:bg-white/10'
                  }`}
                >
                  {emoji}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </AnimatePresenceWrapper>

        {/* ── Profile Form ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-2xl p-6"
        >
          <h2 className="text-lg font-semibold text-smoke-200 mb-5">Personal Details</h2>
          <div className="space-y-4">
            {profileFields.map((field) => {
              const Icon = field.icon;
              return (
                <div key={field.key}>
                  <label className="text-xs text-smoke-400 mb-1.5 flex items-center gap-2">
                    <Icon className="text-fire-orange" />
                    {field.label}
                  </label>
                  {isEditing ? (
                    <input
                      type={field.type}
                      value={form[field.key]}
                      onChange={(e) => handleChange(field.key, e.target.value)}
                      placeholder={field.placeholder}
                      className="w-full bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl px-4 py-3 text-white placeholder-smoke-400 focus:outline-none focus:border-brand-red transition-colors"
                    />
                  ) : (
                    <p className="px-4 py-3 text-smoke-200 bg-white/[0.02] rounded-xl border border-white/5">
                      {user[field.key] || <span className="text-smoke-400 italic">Not set</span>}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* ── Food Preference ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass rounded-2xl p-6"
        >
          <h2 className="text-lg font-semibold text-smoke-200 mb-4">Food Preference</h2>
          <div className="flex gap-3">
            {preferences.map((pref) => (
              <motion.button
                key={pref.value}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => updateUser({ preference: pref.value })}
                className={`flex-1 py-3 rounded-xl text-sm font-semibold border transition-all ${
                  user.preference === pref.value
                    ? pref.activeClass
                    : 'bg-white/5 border-white/10 text-smoke-300 hover:bg-white/10'
                }`}
              >
                {pref.label}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* ── Sign Out ── */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={resetUser}
          className="w-full py-4 rounded-2xl border border-brand-red/40 text-brand-red font-semibold flex items-center justify-center gap-2 hover:bg-brand-red/10 transition-colors"
        >
          <FiLogOut />
          Sign Out
        </motion.button>
      </div>
    </div>
  );
};

/* Tiny wrapper – avoids importing AnimatePresence directly in the component tree */
function AnimatePresenceWrapper({ show, children }) {
  const { AnimatePresence } = require('framer-motion');
  return <AnimatePresence>{show && children}</AnimatePresence>;
}

export default Profile;
