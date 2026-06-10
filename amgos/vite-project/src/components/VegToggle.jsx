import { motion } from 'framer-motion';

const VegToggle = ({ filter, setFilter }) => {
  const options = [
    { value: 'all', label: 'All', color: 'from-brand-red to-fire-orange' },
    { value: 'veg', label: 'Veg', color: 'from-green-500 to-emerald-600' },
    { value: 'nonveg', label: 'Non-Veg', color: 'from-red-500 to-rose-600' },
  ];

  return (
    <div className="flex items-center gap-1 p-1 rounded-full glass">
      {options.map(opt => (
        <button
          key={opt.value}
          onClick={() => setFilter(opt.value)}
          className="relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300"
        >
          {filter === opt.value && (
            <motion.div
              layoutId="veg-toggle-bg"
              className={`absolute inset-0 rounded-full bg-gradient-to-r ${opt.color}`}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            />
          )}
          <span className={`relative z-10 flex items-center gap-1.5 ${
            filter === opt.value ? 'text-white' : 'text-smoke-300'
          }`}>
            {opt.value === 'veg' && (
              <span className="w-3 h-3 border-2 border-green-500 rounded-sm flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
              </span>
            )}
            {opt.value === 'nonveg' && (
              <span className="w-3 h-3 border-2 border-red-500 rounded-sm flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
              </span>
            )}
            {opt.label}
          </span>
        </button>
      ))}
    </div>
  );
};

export default VegToggle;
