import { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within UserProvider');
  return context;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('amgos-user');
      return saved ? JSON.parse(saved) : {
        name: 'Food Lover',
        email: '',
        phone: '',
        avatar: '🔥',
        address: '',
        preference: 'all', // 'all', 'veg', 'nonveg'
      };
    } catch {
      return {
        name: 'Food Lover',
        email: '',
        phone: '',
        avatar: '🔥',
        address: '',
        preference: 'all',
      };
    }
  });

  useEffect(() => {
    localStorage.setItem('amgos-user', JSON.stringify(user));
  }, [user]);

  const updateUser = (updates) => {
    setUser(prev => ({ ...prev, ...updates }));
  };

  const resetUser = () => {
    const defaultUser = {
      name: 'Food Lover',
      email: '',
      phone: '',
      avatar: '🔥',
      address: '',
      preference: 'all',
    };
    setUser(defaultUser);
  };

  return (
    <UserContext.Provider value={{ user, updateUser, resetUser }}>
      {children}
    </UserContext.Provider>
  );
};
