import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import { X, CheckCircle, ChevronRight, ChevronLeft } from 'lucide-react';
import './BookingModal.css';

const ALL_SERVICES = [
  { id: 1,  name: 'Detox Treatment',                     category: 'Natuurlijk Haar', price: 'v.a. 90',   time: '120 min' },
  { id: 2,  name: 'Vitamin Treatment',                   category: 'Natuurlijk Haar', price: '80',        time: '90 min - Incl. stoom' },
  { id: 3,  name: 'Protein Treatment',                   category: 'Natuurlijk Haar', price: '80',        time: '90 min - Incl. stoom' },
  { id: 4,  name: 'Oil Treatment',                       category: 'Natuurlijk Haar', price: '75',        time: '90 min - Incl. stoom' },
  { id: 5,  name: 'Keratin Treatment',                   category: 'Natuurlijk Haar', price: '150',       time: '180 min - Incl. styling' },
  { id: 6,  name: 'Trim Ends',                           category: 'Hairstyling',     price: '25',        time: '30 min - Excl. wassen' },
  { id: 7,  name: 'Model Haircut',                       category: 'Hairstyling',     price: '35',        time: '45 min - Excl. wassen' },
  { id: 8,  name: 'Wash, Cut and Blow Dry',              category: 'Hairstyling',     price: '55',        time: '90 min' },
  { id: 9,  name: 'Wash, Blow Dry and Curling',          category: 'Hairstyling',     price: '65',        time: '90 min' },
  { id: 10, name: 'Relax, Cut and Styling (kort haar)',  category: 'Hairstyling',     price: '90',        time: '120 min' },
  { id: 11, name: 'Relax, Cut and Styling (lang haar)',  category: 'Hairstyling',     price: '110',       time: '180 min' },
  { id: 12, name: 'Wash and Blow Dry',                   category: 'Hairstyling',     price: '25',        time: '60 min' },
  { id: 13, name: 'Root Touch-Up (minder 10 weken)',     category: 'Haarkleuring',    price: '55',        time: '180 min' },
  { id: 14, name: 'Root Touch-Up',                       category: 'Haarkleuring',    price: '70',        time: '180 min' },
  { id: 15, name: 'Highlights',                          category: 'Haarkleuring',    price: '150',       time: '180 min - Incl. toner en knippen' },
  { id: 16, name: 'Balayage',                            category: 'Haarkleuring',    price: '130',       time: '180 min - Incl. toner en knippen' },
  { id: 17, name: 'Flip Over Weave',                     category: 'Weave en Pruik',  price: '95',        time: '180 min' },
  { id: 18, name: 'Weave with Closure',                  category: 'Weave en Pruik',  price: '110',       time: '180 min' },
  { id: 19, name: 'Leave-Out Weave',                     category: 'Weave en Pruik',  price: '110',       time: '180 min' },
  { id: 20, name: 'Track Refill per Row',                category: 'Weave en Pruik',  price: '25',        time: '180 min - Excl. styling' },
  { id: 21, name: 'Weave Removal and Wash',              category: 'Weave en Pruik',  price: '30',        time: '60 min' },
  { id: 22, name: 'Wig Installation',                    category: 'Weave en Pruik',  price: '75',        time: '60 min - Excl. styling' },
  { id: 23, name: 'Half-Up Half-Down Ponytail',          category: 'Weave en Pruik',  price: '95',        time: '120 min' },
  { id: 24, name: 'Ponytail Hairstyles',                 category: 'Weave en Pruik',  price: '60',        time: '90 min' },
  { id: 25, name: 'Braids with Extensions (medium)',     category: 'Vlechten',        price: '110',       time: '210 min' },
  { id: 26, name: 'Braids with Extensions (lang)',       category: 'Vlechten',        price: '130',       time: '240 min' },
  { id: 27, name: 'Natural Hair Braiding',               category: 'Vlechten',        price: '65',        time: '90 min' },
  { id: 28, name: 'Cornrows with Extensions',            category: 'Vlechten',        price: 'v.a. 75',   time: '120 min' },
  { id: 29, name: 'Cornrows on Natural Hair',            category: 'Vlechten',        price: '45',        time: '60 min' },
  { id: 30, name: 'Crochet Braids',                      category: 'Vlechten',        price: '75',        time: '150 min' },
  { id: 31, name: 'Dreadlock Maintenance (minder 3mnd)', category: 'Dreadlocks',      price: '85',        time: '90 min' },
  { id: 32, name: 'Dreadlock Maintenance (meer 3mnd)',   category: 'Dreadlocks',      price: '110',       time: '120 min' },
  { id: 33, name: 'Dreadlock Deep Cleansing',            category: 'Dreadlocks',      price: '75',        time: '120 min' },
  { id: 34, name: 'Full Head Dreadlocks from Scratch',   category: 'Dreadlocks',      price: 'v.a. 200',  time: '240 min' },
  { id: 35, name: 'Dreadlocks with Extensions',          category: 'Dreadlocks',      price: 'v.a. 280',  time: '240 min - Excl. extensions' },
  { id: 36, name: 'Eyebrow Shaping',                     category: 'Wenkbrauwen',     price: '15',        time: '30 min' },
  { id: 37, name: 'Eyebrow Shaping with Tint',           category: 'Wenkbrauwen',     price: '40',        time: '60 min' },
  { id: 38, name: 'Cluster Lashes',                      category: 'Wenkbrauwen',     price: '35',        time: '30 min' },
];

const CATS = ['Alle','Natuurlijk Haar','Hairstyling','Haarkleuring','Weave en Pruik','Vlechten','Dreadlocks','Wenkbrauwen','Nails'];
const TIMES = ['10:00', '11:30', '13:00', '14:30', '16:00'];

const BookingModal = () => {
  const { isBookingOpen, closeBooking, initialService, addBooking } = useBooking();
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('Alle');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [personalDetails, setPersonalDetails] = useState({ name: '', email: '', phone: '' });
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [depositInfo, setDepositInfo] = useState({ total: 0, deposit: 0, balance: 0 });
  const [gdprChecked, setGdprChecked] = useState(false);

  useEffect(() => {
    if (isBookingOpen) {
      if (initialService) {
        setSelectedService({ id: initialService.id, name: initialService.name, price: initialService.price, time: initialService.desc || 'TBD' });
        setStep(2);
      } else {
        setSelectedService(null);
        setSelectedCategory('Alle');
        setStep(1);
      }
    }
  }, [isBookingOpen, initialService]);

  useEffect(() => {
    if (selectedService) {
      const price = parseFloat(selectedService.price.replace(/[^\d]/g, '')) || 0;
      const deposit = price > 80 ? 35 : 25;
      setDepositInfo({ total: price, deposit, balance: price - deposit });
    }
  }, [selectedService]);

  if (!isBookingOpen) return null;

  const nextStep = () => setStep(p => p + 1);
  const prevStep = () => { if (step === 2 && initialService) resetAndClose(); else setStep(p => p - 1); };
  const handleFormSubmit = (e) => { e.preventDefault(); nextStep(); };
  const handlePayment = () => {
    setPaymentLoading(true);
    setTimeout(() => {
      setPaymentLoading(false);
      addBooking({ service: selectedService, date: selectedDate, time: selectedTime, customer: personalDetails, depositAmount: depositInfo.deposit, totalAmount: depositInfo.total, status: 'PAID' });
      nextStep();
    }, 2500);
  };
  const resetAndClose = () => {
    setStep(1); setSelectedService(null); setSelectedCategory('Alle');
    setSelectedDate(''); setSelectedTime('');
    setPersonalDetails({ name: '', email: '', phone: '' });
    setPaymentLoading(false); setGdprChecked(false);
    closeBooking();
  };

  const filtered = selectedCategory === 'Alle'
    ? ALL_SERVICES
    : selectedCategory === 'Nails'
      ? []
      : ALL_SERVICES.filter(s => s.category === selectedCategory);
  const fmtPrice = (n) => 'EUR ' + n.toFixed(2);

  return (
    <div className="modal-overlay">
      <div className="modal-content animate-slide-up">
        <button className="modal-close" onClick={resetAndClose}><X size={24} /></button>
        <div className="modal-header">
          <h2>Afspraak maken</h2>
          <div className="booking-progress">
            <div className={`progress-step ${step >= 1 ? 'active' : ''}`}><span>1</span><label>Service</label></div>
            <div className={`progress-line ${step > 1 ? 'filled' : ''}`}></div>
            <div className={`progress-step ${step >= 2 ? 'active' : ''}`}><span>2</span><label>Tijd</label></div>
            <div className={`progress-line ${step > 2 ? 'filled' : ''}`}></div>
            <div className={`progress-step ${step >= 3 ? 'active' : ''}`}><span>3</span><label>Gegevens</label></div>
            <div className={`progress-line ${step > 3 ? 'filled' : ''}`}></div>
            <div className={`progress-step ${step >= 4 ? 'active' : ''}`}><span>4</span><label>Aanbetaling</label></div>
          </div>
        </div>
        <div className="modal-body">

          {step === 1 && (
            <div className="step-content">
              <h3>Kies een behandeling</h3>
              <div className="booking-category-tabs">
                {CATS.map(cat => (
                  <button key={cat} className={`booking-cat-btn ${selectedCategory === cat ? 'active' : ''}`}
                    onClick={() => { setSelectedCategory(cat); setSelectedService(null); }}>{cat}</button>
                ))}
              </div>

              {/* Nails tab: Diana-card */}
              {selectedCategory === 'Nails' ? (
                <a href="https://beautynailsbydiana.be" target="_blank" rel="noopener noreferrer"
                  className="booking-diana-card">
                  <img src="/diana-logo.png" alt="Beauty Nails by Diana" className="booking-diana-logo" />
                  <div className="booking-diana-text">
                    <span className="booking-diana-badge">Samenwerking</span>
                    <h4>Beauty Nails by Diana</h4>
                    <p>Voor nagelbehandelingen werken wij samen met Diana — actief in <strong>Laakdal &amp; Turnhout</strong>. Boek rechtstreeks via haar website.</p>
                    <span className="booking-diana-link">Ga naar beautynailsbydiana.be &rarr;</span>
                  </div>
                </a>
              ) : (
                <>
                  <div className="service-selection">
                    {filtered.map(s => (
                      <div key={s.id}
                        className={`service-option ${selectedService && selectedService.id === s.id ? 'selected' : ''}`}
                        onClick={() => setSelectedService(s)}>
                        <div><h4>{s.name}</h4><p>{s.time}</p></div>
                        <span>EUR {s.price}</span>
                      </div>
                    ))}
                  </div>

                  {/* Alle: Diana-teaser onderaan */}
                  {selectedCategory === 'Alle' && (
                    <a href="https://beautynailsbydiana.be" target="_blank" rel="noopener noreferrer"
                      className="booking-diana-teaser">
                      <img src="/diana-logo.png" alt="Beauty Nails by Diana" className="booking-diana-teaser-logo" />
                      <div>
                        <strong>Nails — Beauty Nails by Diana</strong>
                        <p>Laakdal &amp; Turnhout · Klik om te boeken bij Diana</p>
                      </div>
                      <span className="booking-diana-link">Bezoek &rarr;</span>
                    </a>
                  )}
                </>
              )}

              <div className="step-actions right">
                <button className="btn btn-primary" disabled={!selectedService || selectedCategory === 'Nails'} onClick={nextStep}>
                  Doorgaan <ChevronRight size={18} />
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="step-content">
              <h3>Kies Datum en Tijd</h3>
              <div className="input-group">
                <label className="input-label">Datum</label>
                <input type="date" className="input-field" value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]} required />
              </div>
              {selectedDate && (
                <div className="time-selection">
                  <label className="input-label">Beschikbare tijden</label>
                  <div className="time-grid">
                    {TIMES.map(t => (
                      <button key={t} className={`time-slot ${selectedTime === t ? 'selected' : ''}`}
                        onClick={() => setSelectedTime(t)}>{t}</button>
                    ))}
                  </div>
                </div>
              )}
              <div className="step-actions split">
                <button className="btn btn-outline" onClick={prevStep}><ChevronLeft size={18} /> Terug</button>
                <button className="btn btn-primary" disabled={!selectedDate || !selectedTime} onClick={nextStep}>Doorgaan <ChevronRight size={18} /></button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="step-content">
              <h3>Uw gegevens</h3>
              <form id="bookingForm" onSubmit={handleFormSubmit}>
                <div className="input-group">
                  <label className="input-label">Volledige naam</label>
                  <input type="text" className="input-field" required value={personalDetails.name}
                    onChange={e => setPersonalDetails({ ...personalDetails, name: e.target.value })} />
                </div>
                <div className="input-group">
                  <label className="input-label">E-mailadres</label>
                  <input type="email" className="input-field" required value={personalDetails.email}
                    onChange={e => setPersonalDetails({ ...personalDetails, email: e.target.value })} />
                </div>
                <div className="input-group">
                  <label className="input-label">Telefoonnummer</label>
                  <input type="tel" className="input-field" required value={personalDetails.phone}
                    onChange={e => setPersonalDetails({ ...personalDetails, phone: e.target.value })} />
                </div>
                <div className="gdpr-consent">
                  <label className="gdpr-label">
                    <input type="checkbox" checked={gdprChecked}
                      onChange={e => setGdprChecked(e.target.checked)} required />
                    <span>Ik ga akkoord met de <Link to="/privacy" className="gdpr-link">privacyverklaring</Link> en <Link to="/algemene-voorwaarden" className="gdpr-link">algemene voorwaarden</Link>.</span>
                  </label>
                </div>
              </form>
              <div className="step-actions split">
                <button className="btn btn-outline" onClick={prevStep}><ChevronLeft size={18} /> Terug</button>
                <button type="submit" form="bookingForm" className="btn btn-primary" disabled={!gdprChecked}>Overzicht</button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="step-content">
              <h3>Overzicht en Aanbetaling</h3>
              <div className="deposit-card">
                <div className="price-breakdown">
                  <div className="breakdown-row">
                    <span>Behandeling: {selectedService ? selectedService.name : ''}</span>
                    <span>{fmtPrice(depositInfo.total)}</span>
                  </div>
                  <div className="breakdown-row highlight">
                    <span>Aanbetaling (Nu betalen)</span>
                    <span>{fmtPrice(depositInfo.deposit)}</span>
                  </div>
                  <div className="breakdown-row pending">
                    <span>Restant (Betalen bij afspraak)</span>
                    <span>{fmtPrice(depositInfo.balance)}</span>
                  </div>
                </div>
                <div className="deposit-info-message">
                  <p>Aanbetaling van <strong>{fmtPrice(depositInfo.deposit)}</strong> vereist. Restant wordt in salon betaald.</p>
                </div>
              </div>
              <div className="step-actions split">
                <button className="btn btn-outline" onClick={prevStep}><ChevronLeft size={18} /> Terug</button>
                <button className="btn btn-primary" onClick={nextStep}>Ga naar betaling</button>
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="step-content payment-step">
              <div className="payment-brand">
                <img src="/bancontact-pay.png" alt="Bancontact Pay" className="payconiq-logo"
                  onError={(e) => { e.target.style.display = 'none'; }} />
                <h3>Betalen met Bancontact Pay</h3>
              </div>
              <div className="payment-status">
                {paymentLoading ? (
                  <div className="payment-loading"><div className="spinner"></div><p>Bezig met verbinden...</p></div>
                ) : (
                  <div className="payment-prompt text-center">
                    <p>Totaal nu te betalen:</p>
                    <div className="payment-amount">{fmtPrice(depositInfo.deposit)}</div>
                    <p className="payment-hint">Klik op de knop om de aanbetaling te bevestigen.</p>
                    <button className="btn btn-primary pay-btn" onClick={handlePayment}>
                      Nu {fmtPrice(depositInfo.deposit)} betalen
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {step === 6 && (
            <div className="step-content confirmation-view text-center">
              <CheckCircle size={64} className="success-icon" />
              <h3>Afspraak bevestigd!</h3>
              <p>Bedankt, {personalDetails.name}. Afspraak voor <strong>{selectedService ? selectedService.name : ''}</strong> op <strong>{selectedDate}</strong> om <strong>{selectedTime}</strong>.</p>
              <p>Aanbetaling van <strong>{fmtPrice(depositInfo.deposit)}</strong> ontvangen via Payconiq.</p>
              <p>Bevestigingsmail verzonden naar {personalDetails.email}.</p>
              <button className="btn btn-primary" onClick={resetAndClose} style={{ marginTop: '2rem' }}>Sluiten</button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default BookingModal;
