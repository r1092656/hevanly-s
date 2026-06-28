import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './CookieBanner.css';

const CookieBanner = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem('cookie_consent', 'accepted');
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem('cookie_consent', 'declined');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="cookie-banner">
      <div className="cookie-content">
        <p>
          Wij gebruiken enkel functionele cookies en laden Google Maps alleen met uw toestemming.
          Lees onze{' '}
          <Link to="/privacy" className="cookie-link">privacyverklaring</Link>
          {' '}voor meer info.
        </p>
        <div className="cookie-actions">
          <button className="btn-cookie-decline" onClick={decline}>Weigeren</button>
          <button className="btn-cookie-accept" onClick={accept}>Akkoord</button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
