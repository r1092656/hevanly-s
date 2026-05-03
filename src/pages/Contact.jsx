import React, { useState } from 'react';
import './Contact.css';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="contact-page animate-fade-in">
      <div className="page-header">
        <div className="container">
          <h1 className="page-title">Contact</h1>
          <p className="page-subtitle">We horen graag van u.</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="contact-layout">

            <div className="contact-form-container">
              <h2>Stuur ons een bericht</h2>
              <p>Voor vragen kunt u onderstaand formulier invullen. We nemen zo snel mogelijk contact met u op.</p>

              {submitted ? (
                <div className="success-message">
                  <h3>Bedankt!</h3>
                  <p>Uw bericht is succesvol verzonden.</p>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="input-group">
                    <label className="input-label" htmlFor="name">Volledige naam</label>
                    <input type="text" id="name" className="input-field" required placeholder="Voorbeeld: Jane Doe" />
                  </div>
                  <div className="input-group">
                    <label className="input-label" htmlFor="email">E-mailadres</label>
                    <input type="email" id="email" className="input-field" required placeholder="jane@voorbeeld.be" />
                  </div>
                  <div className="input-group">
                    <label className="input-label" htmlFor="message">Bericht</label>
                    <textarea id="message" className="input-field" rows="5" required placeholder="Hoe kunnen we u helpen?"></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary w-100" style={{ width: '100%' }}>Bericht versturen</button>
                </form>
              )}
            </div>

            <div className="contact-info-container">
              <div className="info-block">
                <h3>Contactgegevens</h3>
                <ul className="info-list">
                  <li>
                    <MapPin className="info-icon" />
                    <div>
                      <strong>Adres</strong>
                      <p>Graatakker 118, Bus B, 2300 Turnhout, België</p>
                    </div>
                  </li>
                  <li>
                    <Phone className="info-icon" />
                    <div>
                      <strong>Telefoon</strong>
                      <p>+32 465 17 27 90 </p>
                    </div>
                  </li>
                  <li>
                    <Mail className="info-icon" />
                    <div>
                      <strong>E-mail</strong>
                      <p>hello@hevanlysbeautybar.be</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="info-block">
                <h3>Openingstijden</h3>
                <ul className="info-list timeseries">
                  <li><span>Maandag:</span> <span>Gesloten</span></li>
                  <li><span>Dinsdag:</span> <span>10:00 - 18:00</span></li>
                  <li><span>Woensdag:</span> <span>10:00 - 18:00</span></li>
                  <li><span>Donderdag:</span> <span>10:00 - 20:00</span></li>
                  <li><span>Vrijdag:</span> <span>10:00 - 18:00</span></li>
                  <li><span>Zaterdag:</span> <span>09:00 - 16:00</span></li>
                  <li><span>Zondag:</span> <span>Gesloten</span></li>
                </ul>
              </div>
            </div>

          </div>

          {/* Map */}
          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2499.7820125807185!2d4.953531076625895!3d51.3146401255562!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c14e1a0b5b1585%3A0xc3f58a3eeaa6de27!2sGraatakker%20118%2C%202300%20Turnhout%2C%20Belgium!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
              width="100%"
              height="400"
              style={{ border: 0, borderRadius: 'var(--radius-lg)' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade">
            </iframe>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Contact;
