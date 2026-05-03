import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-brand">
          <h2>Hevanly's Beautybar</h2>
          <p>Uw premium bestemming voor schoonheid en elegantie. Laat ons u verwennen met uitzonderlijke zorg.</p>
          <div className="social-links">
            <a href="https://www.instagram.com/Hevanlysbeautybar" className="social-icon">IG</a>
            <a href="#" className="social-icon">FB</a>
          </div>
        </div>

        <div className="footer-links">
          <h3>Snelkoppelingen</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">Over ons</Link></li>
            <li><Link to="/services">Behandelingen</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className="footer-contact">
          <h3>Bezoek ons</h3>
          <ul>
            <li>
              <MapPin size={20} className="contact-icon" />
              <span>Graatakker 118, Bus B, 2300 Turnhout, België</span>
            </li>
            <li>
              <Phone size={20} className="contact-icon" />
              <span>+32 465 17 27 90 </span>
            </li>
            <li>
              <Mail size={20} className="contact-icon" />
              <span>hello@hevanlysbeautybar.be</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container footer-bottom-container">
          <p>&copy; {new Date().getFullYear()} Hevanly's Beautybar. Alle rechten voorbehouden.</p>
          <Link to="/admin" className="admin-link-subtle">Admin</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
