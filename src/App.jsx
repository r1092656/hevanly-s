import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { BookingProvider } from './context/BookingContext';
import { ShopProvider } from './context/ShopContext';
import { AuthProvider } from './context/AuthContext';
import { NewsProvider } from './context/NewsContext';
import AdminRoute from './components/AdminRoute';
import BookingModal from './components/BookingModal';
import CartDrawer from './components/CartDrawer';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Products from './pages/Products';
import Contact from './pages/Contact';
import Reviews from './pages/Reviews';
import Checkout from './pages/Checkout';
import PaymentSuccess from './pages/PaymentSuccess';
import BookingSuccess from './pages/BookingSuccess';

// Admin Pages
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminProducts from './pages/AdminProducts';
import AdminAddProduct from './pages/AdminAddProduct';
import AdminNews from './pages/AdminNews';
import AdminBookings from './pages/AdminBookings';
import Privacy from './pages/Privacy';
import AlgemeneVoorwaarden from './pages/AlgemeneVoorwaarden';
import NotFound from './pages/NotFound';
import CookieBanner from './components/CookieBanner';
import ScrollToTop from './components/ScrollToTop';

function AppInner() {
  const { pathname } = useLocation();
  const isAdmin = pathname.startsWith('/admin');

  return (
    <AuthProvider>
      <NewsProvider>
        <ShopProvider>
          <BookingProvider>
            <ScrollToTop />
            <div className="app-layout">
              {!isAdmin && <Navbar />}
              <main>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/payment-success" element={<PaymentSuccess />} />
                    <Route path="/booking-success" element={<BookingSuccess />} />
                    <Route path="/reviews" element={<Reviews />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/privacy" element={<Privacy />} />
                    <Route path="/algemene-voorwaarden" element={<AlgemeneVoorwaarden />} />

                    {/* Admin Routes */}
                    <Route path="/admin/login" element={<AdminLogin />} />
                    <Route path="/admin" element={
                      <AdminRoute><AdminDashboard /></AdminRoute>
                    } />
                    <Route path="/admin/products" element={
                      <AdminRoute><AdminProducts /></AdminRoute>
                    } />
                    <Route path="/admin/products/add" element={
                      <AdminRoute><AdminAddProduct /></AdminRoute>
                    } />
                    <Route path="/admin/products/edit/:id" element={
                      <AdminRoute><AdminAddProduct /></AdminRoute>
                    } />
                    <Route path="/admin/news" element={
                      <AdminRoute><AdminNews /></AdminRoute>
                    } />
                    <Route path="/admin/bookings" element={
                      <AdminRoute><AdminBookings /></AdminRoute>
                    } />

                    {/* 404 */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
              </main>
              {!isAdmin && <Footer />}
            </div>
            {!isAdmin && <BookingModal />}
            {!isAdmin && <CartDrawer />}
            {!isAdmin && <CookieBanner />}
          </BookingProvider>
        </ShopProvider>
      </NewsProvider>
    </AuthProvider>
  );
}

function App() {
  return (
    <Router>
      <AppInner />
    </Router>
  );
}

export default App;
