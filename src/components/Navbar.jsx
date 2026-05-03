import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { useShop } from '../context/ShopContext';
import logo from '../assets/logo_transparent.png';
import './Navbar.css';

const Navbar = () => {
  const { openBooking } = useBooking();
  const { openCart, cartCount } = useShop();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-container">
        <Link to="/" className="nav-logo">
          <img src={logo} alt="Hevanly's Beautybar" className="logo-img" />
        </Link>
        
        <div className="nav-actions-mobile">
          <button className="nav-cart-btn" onClick={openCart}>
            <ShoppingBag size={24} />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>
          <div className="nav-toggle" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </div>
        </div>

        <nav className={`nav-menu ${isOpen ? 'active' : ''}`}>
          <NavLink to="/" className="nav-link" onClick={() => setIsOpen(false)}>Home</NavLink>
          <NavLink to="/about" className="nav-link" onClick={() => setIsOpen(false)}>Over ons</NavLink>
          <NavLink to="/services" className="nav-link" onClick={() => setIsOpen(false)}>Behandelingen</NavLink>
          <NavLink to="/products" className="nav-link" onClick={() => setIsOpen(false)}>Producten</NavLink>
          <NavLink to="/reviews" className="nav-link" onClick={() => setIsOpen(false)}>Recensies</NavLink>
          <NavLink to="/contact" className="nav-link" onClick={() => setIsOpen(false)}>Contact</NavLink>
          
          <div className="nav-desktop-actions">
            <button className="nav-cart-btn desktop-only" onClick={openCart}>
              <ShoppingBag size={24} />
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </button>
            <button className="nav-cta btn btn-primary" onClick={() => { setIsOpen(false); openBooking(); }}>Boek nu</button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
