import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { OrderProvider } from './context/OrderContext';
import { UserProvider } from './context/UserContext';

import Navbar from './components/Navbar';
import BottomNav from './components/BottomNav';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Cart from './pages/Cart';
import Payment from './pages/Payment';
import Orders from './pages/Orders';
import Profile from './pages/Profile';

function App() {
  return (
    <UserProvider>
      <OrderProvider>
        <CartProvider>
          <Router>
            <div className="page-wrapper">
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/payment" element={<Payment />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
              <BottomNav />
            </div>
          </Router>
        </CartProvider>
      </OrderProvider>
    </UserProvider>
  );
}

export default App;