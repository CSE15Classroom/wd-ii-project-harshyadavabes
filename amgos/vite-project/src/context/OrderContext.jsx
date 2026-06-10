import { createContext, useContext, useState, useEffect } from 'react';

const OrderContext = createContext();

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) throw new Error('useOrders must be used within OrderProvider');
  return context;
};

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('amgos-orders');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('amgos-orders', JSON.stringify(orders));
  }, [orders]);

  const placeOrder = (cartItems, total, orderType, paymentMethod, address) => {
    const order = {
      id: 'AMG-' + Date.now().toString(36).toUpperCase(),
      items: [...cartItems],
      total,
      orderType,
      paymentMethod,
      address: address || '',
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    };
    setOrders(prev => [order, ...prev]);
    return order;
  };

  const updateOrderStatus = (orderId, status) => {
    setOrders(prev =>
      prev.map(o => (o.id === orderId ? { ...o, status } : o))
    );
  };

  const totalSpent = orders.reduce((sum, o) => sum + o.total, 0);

  return (
    <OrderContext.Provider value={{
      orders,
      placeOrder,
      updateOrderStatus,
      totalSpent,
      orderCount: orders.length,
    }}>
      {children}
    </OrderContext.Provider>
  );
};
