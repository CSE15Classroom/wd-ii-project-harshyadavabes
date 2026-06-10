import { motion } from 'framer-motion';
import { useMemo } from 'react';

const FireParticles = ({ count = 20 }) => {
  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 3 + Math.random() * 4,
      size: 2 + Math.random() * 4,
      opacity: 0.2 + Math.random() * 0.4,
    }));
  }, [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map(p => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.left}%`,
            bottom: '-10px',
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: `radial-gradient(circle, ${
              Math.random() > 0.5 ? '#FF6B35' : '#C8102E'
            }, transparent)`,
            opacity: p.opacity,
            animation: `ember-float ${p.duration}s ${p.delay}s infinite linear`,
          }}
        />
      ))}

      {/* Smoke wisps */}
      {[0, 1, 2].map(i => (
        <div
          key={`smoke-${i}`}
          className="absolute rounded-full"
          style={{
            left: `${20 + i * 30}%`,
            bottom: '0',
            width: '100px',
            height: '100px',
            background: 'radial-gradient(circle, rgba(255,107,53,0.08), transparent)',
            animation: `smoke-drift ${8 + i * 2}s ${i * 2}s infinite ease-out`,
          }}
        />
      ))}
    </div>
  );
};

export default FireParticles;
