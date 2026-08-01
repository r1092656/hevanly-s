import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail } from 'lucide-react';
import { SALON_INFO } from '../config/salonConfig';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-brand">
          <h2>Hevanly's Beautybar</h2>
          <p>Uw premium bestemming voor schoonheid en elegantie. Laat ons u verwennen met uitzonderlijke zorg.</p>
          <div className="social-links">
            <a href={SALON_INFO.instagram} className="social-icon">IG</a>
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

        <div className="footer-legal">
          <h3>Juridisch</h3>
          <ul>
            <li><Link to="/privacy">Privacyverklaring</Link></li>
            <li><Link to="/algemene-voorwaarden">Algemene Voorwaarden</Link></li>
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
              <span>{SALON_INFO.phone}</span>
            </li>
            <li>
              <Mail size={20} className="contact-icon" />
              <a href={`mailto:${SALON_INFO.email}`} style={{color:'inherit'}}>{SALON_INFO.email}</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container footer-bottom-container">
          <p>&copy; {new Date().getFullYear()} Hevanly's Beautybar. Alle rechten voorbehouden.</p>
          <div className="footer-bottom-links">
            <Link to="/privacy" className="footer-bottom-link">Privacy</Link>
            <span className="footer-divider">·</span>
            <Link to="/algemene-voorwaarden" className="footer-bottom-link">Voorwaarden</Link>
            <span className="footer-divider">·</span>
            <Link to="/admin" className="admin-link-subtle">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
