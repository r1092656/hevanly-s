import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import { X, CheckCircle, ChevronRight, ChevronLeft } from 'lucide-react';
import './BookingModal.css';

const ALL_SERVICES = [
  { id: 1,  name: 'Detox Treatment',                        category: 'Natuurlijk Haar',        price: '€90',       time: '120 min' },
  { id: 2,  name: 'Vitamin Treatment',                      category: 'Natuurlijk Haar',        price: '€80',       time: '90 min – Incl. stoom' },
  { id: 3,  name: 'Protein Treatment',                      category: 'Natuurlijk Haar',        price: '€80',       time: '90 min – Incl. stoom' },
  { id: 4,  name: 'Oil Treatment',                          category: 'Natuurlijk Haar',        price: '€75',       time: '90 min – Incl. stoom' },
  { id: 5,  name: 'Keratin Treatment',                      category: 'Natuurlijk Haar',        price: '€150',      time: '180 min – Incl. styling' },
  { id: 6,  name: 'Trim Ends',                              category: 'Hairstyling',            price: '€25',       time: '30 min – Excl. wassen' },
  { id: 7,  name: 'Model Haircut',                          category: 'Hairstyling',            price: '€35',       time: '45 min – Excl. wassen' },
  { id: 8,  name: 'Wash, Cut & Blow Dry',                   category: 'Hairstyling',            price: '€55',       time: '90 min' },
  { id: 9,  name: 'Wash, Blow Dry & Curling',               category: 'Hairstyling',            price: '€65',       time: '90 min' },
  { id: 10, name: 'Relax, Cut & Styling (kort haar)',        category: 'Hairstyling',            price: '€90',       time: '120 min' },
  { id: 11, name: 'Relax, Cut & Styling (lang haar)',        category: 'Hairstyling',            price: '€110',      time: '180 min' },
  { id: 12, name: 'Wash & Blow Dry',                        category: 'Hairstyling',            price: '€25',       time: '60 min' },
  { id: 13, name: 'Root Touch-Up (< 10 weken)',              category: 'Haarkleuring',           price: '€55',       time: '180 min' },
  { id: 14, name: 'Root Touch-Up',                          category: 'Haarkleuring',           price: '€70',       time: '180 min' },
  { id: 15, name: 'Highlights',                             category: 'Haarkleuring',           price: '€150',      time: '180 min – Incl. toner, knippen & föhnen' },
  { id: 16, name: 'Balayage',                               category: 'Haarkleuring',           price: '€130',      time: '180 min – Incl. toner, knippen & föhnen' },
  { id: 17, name: 'Flip Over Weave',                        category: 'Weave & Pruik',          price: '€95',       time: '180 min' },
  { id: 18, name: 'Weave with Closure',                     category: 'Weave & Pruik',          price: '€110',      time: '180 min' },
  { id: 19, name: 'Leave-Out Weave',                        category: 'Weave & Pruik',          price: '€110',      time: '180 min' },
  { id: 20, name: 'Track Refill per Row',                   category: 'Weave & Pruik',          price: '€25',       time: '180 min – Excl. styling' },
  { id: 21, name: 'Weave Removal & Wash',                   category: 'Weave & Pruik',          price: '€30',       time: '60 min' },
  { id: 22, name: 'Wig Installation',                       category: 'Weave & Pruik',          price: '€75',       time: '60 min – Excl. styling' },
  { id: 23, name: 'Half-Up Half-Down Ponytail',             category: 'Weave & Pruik',          price: '€95',       time: '120 min' },
  { id: 24, name: 'Ponytail Hairstyles',                    category: 'Weave & Pruik',          price: '€60',       time: '90 min' },
  { id: 25, name: 'Braids with Extensions (medium)',        category: 'Vlechten',               price: '€110',      time: '210 min' },
  { id: 26, name: 'Braids with Extensions (lang)',          category: 'Vlechten',               price: '€130',      time: '240 min' },
  { id: 27, name: 'Natural Hair Braiding',                  category: 'Vlechten',               price: '€65',       time: '90 min' },
  { id: 28, name: 'Cornrows with Extensions',               category: 'Vlechten',               price: 'vanaf €75', time: '120 min' },
  { id: 29, name: 'Cornrows on Natural Hair',               category: 'Vlechten',               price: '€45',       time: '60 min' },
  { id: 30, name: 'Crochet Braids',                         category: 'Vlechten',               price: '€75',       time: '150 min' },
  { id: 31, name: 'Dreadlock Maintenance (< 3 mnd)',        category: 'Dreadlocks',             price: '€85',       time: '90 min' },
  { id: 32, name: 'Dreadlock Maintenance (> 3 mnd)',        category: 'Dreadlocks',             price: '€110',      time: '120 min' },
  { id: 33, name: 'Dreadlock Deep Cleansing',               category: 'Dreadlocks',             price: '€75',       time: '120 min' },
  { id: 34, name: 'Full Head Dreadlocks from Scratch',      category: 'Dreadlocks',             price: 'vanaf €200',time: '240 min' },
  { id: 35, name: 'Dreadlocks with Extensions',             category: 'Dreadlocks',             price: 'vanaf €280',time: '240 min – Excl. extensions' },
  { id: 36, name: 'Eyebrow Shaping',                        category: 'Wenkbrauwen & Wimpers',  price: '€15',       time: '30 min' },
  { id: 37, name: 'Eyebrow Shaping with Tint',              category: 'Wenkbrauwen & Wimpers',  price: '€40',       time: '60 min' },
  { id: 38, name: 'Cluster Lashes',                         category: 'Wenkbrauwen & Wimpers',  price: '€35',       time: '30 min' },
  { id: 39, name: 'Manicure without Polish',                category: 'Manicure',               price: '€25',       time: '60 min' },
  { id: 40, name: 'Manicure with Gel Polish',               category: 'Manicure',               price: '€45',       time: '75 min' },
];

const CATEGORIES = ['Alle', 'Natuurlijk Haar', 'Hairstyling', 'Haarkleuring', 'Weave & Pruik', 'Vlechten', 'Dreadlocks', 'Wenkbrauwen & Wimpers', 'Manicure'];

const availableTimes = ['10:00', '11:30', '13:00', '14:30', '16:00'];

const BookingModal = () => {
  const { isBookingOpen, closeBooking, initialService, addBooking } = useBooking();
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [personalDetails, setPersonalDetails] = useState({ name: '', email: '', phone: '' });
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [depositInfo, setDepositInfo] = useState({ total: 0, deposit: 0, balance: 0 });
  const [gdprChecked, setGdprChecked] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Alle');

  useEffect(() => {
    if (isBookingOpen) {
      if (initialService) {
        setSelectedService({
          id: initialService.id,
          name: initialService.name,
          price: initialService.price,
          time: initialService.desc || 'TBD'
        });
        setStep(2);
      } else {
        setSelectedService(null);
        setStep(1);
      }
    }
  }, [isBookingOpen, initialService]);

  // Calculate deposit info when selectedService is set or changed
  useEffect(() => {
    if (selectedService) {
      // Parse price (e.g., "€65" or "from €75" -> 65 or 75)
      const priceStr = selectedService.price.replace(/[^\d]/g, '');
      const price = parseFloat(priceStr) || 0;
      
      const deposit = price > 80 ? 35 : 25;
      const balance = price - deposit;
      
      setDepositInfo({ total: price, deposit, balance });
    }
  }, [selectedService]);

  if (!isBookingOpen) return null;

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => {
    if (step === 2 && initialService) {
      resetAndClose();
    } else {
      setStep(prev => prev - 1);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    nextStep(); // Move to Review & Deposit
  };

  const handlePayment = () => {
    setPaymentLoading(true);
    // Simulate Payconiq redirection/processing delay
    setTimeout(() => {
      setPaymentLoading(false);
      // Save booking to context
      addBooking({
        service: selectedService,
        date: selectedDate,
        time: selectedTime,
        customer: personalDetails,
        depositAmount: depositInfo.deposit,
        totalAmount: depositInfo.total,
        status: 'PAID'
      });
      nextStep(); // Move to final success
    }, 2500);
  };

  const resetAndClose = () => {
    setStep(1);
    setSelectedService(null);
    setSelectedDate('');
    setSelectedTime('');
    setPersonalDetails({ name: '', email: '', phone: '' });
    setPaymentLoading(false);
    setGdprChecked(false);
    setSelectedCategory('Alle');
    closeBooking();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content animate-slide-up">
        <button className="modal-close" onClick={resetAndClose}>
          <X size={24} />
        </button>

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
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    className={`booking-cat-btn ${selectedCategory === cat ? 'active' : ''}`}
                    onClick={() => { setSelectedCategory(cat); setSelectedService(null); }}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="service-selection">
                {ALL_SERVICES
                  .filter(s => selectedCategory === 'Alle' || s.category === selectedCategory)
                  .map(s => (
                    <div
                      key={s.id}
                      className={`service-option ${selectedService?.id === s.id ? 'selected' : ''}`}
                      onClick={() => setSelectedService(s)}
                    >
                      <div>
                        <h4>{s.name}</h4>
                        <p>{s.time}</p>
                      </div>
                      <span>{s.price}</span>
                    </div>
                  ))}
              </div>

              <div className="step-actions right">
                <button
                  className="btn btn-primary"
                  disabled={!selectedService}
                  onClick={nextStep}
                >
                  Doorgaan <ChevronRight size={18} />
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="step-content">
              <h3>Kies Datum & Tijd</h3>
              
              <div className="input-group">
                <label className="input-label">Datum</label>
                <input 
                  type="date" 
                  className="input-field" 
                  value={selectedDate} 
                  onChange={(e) => setSelectedDate(e.target.value)} 
                  min={new Date().toISOString().split('T')[0]}
                  required 
                />
              </div>
              
              {selectedDate && (
                <div className="time-selection">
                  <label className="input-label">Beschikbare tijden</label>
                  <div className="time-grid">
                    {availableTimes.map(t => (
                      <button 
                        key={t}
                        className={`time-slot ${selectedTime === t ? 'selected' : ''}`}
                        onClick={() => setSelectedTime(t)}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="step-actions split">
                <button className="btn btn-outline" onClick={prevStep}>
                  {initialService ? <><X size={18} /> Annuleren</> : <><ChevronLeft size={18} /> Terug</>}
                </button>
                <button 
                  className="btn btn-primary" 
                  disabled={!selectedDate || !selectedTime}
                  onClick={nextStep}
                >
                  Doorgaan <ChevronRight size={18} />
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="step-content">
              <h3>Uw gegevens</h3>
              <form id="bookingForm" onSubmit={handleFormSubmit}>
                <div className="input-group">
                  <label className="input-label">Volledige naam</label>
                  <input type="text" className="input-field" required 
                    value={personalDetails.name} onChange={e => setPersonalDetails({...personalDetails, name: e.target.value})} />
                </div>
                <div className="input-group">
                  <label className="input-label">E-mailadres</label>
                  <input type="email" className="input-field" required 
                    value={personalDetails.email} onChange={e => setPersonalDetails({...personalDetails, email: e.target.value})} />
                </div>
                <div className="input-group">
                  <label className="input-label">Telefoonnummer</label>
                  <input type="tel" className="input-field" required
                    value={personalDetails.phone} onChange={e => setPersonalDetails({...personalDetails, phone: e.target.value})} />
                </div>

                <div className="gdpr-consent">
                  <label className="gdpr-label">
                    <input
                      type="checkbox"
                      checked={gdprChecked}
                      onChange={(e) => setGdprChecked(e.target.checked)}
                      required
                    />
                    <span>
                      Ik ga akkoord met de{' '}
                      <Link to="/privacy" className="gdpr-link" onClick={() => {}}>privacyverklaring</Link>
                      {' '}en{' '}
                      <Link to="/algemene-voorwaarden" className="gdpr-link">algemene voorwaarden</Link>
                      {' '}en geef toestemming voor de verwerking van mijn gegevens voor deze boeking.
                    </span>
                  </label>
                </div>
              </form>

              <div className="step-actions split">
                <button className="btn btn-outline" onClick={prevStep}>
                  <ChevronLeft size={18} /> Terug
                </button>
                <button type="submit" form="bookingForm" className="btn btn-primary" disabled={!gdprChecked}>
                  Overzicht & Aanbetaling
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="step-content">
              <h3>Overzicht & Aanbetaling</h3>
              <div className="deposit-card">
                <div className="price-breakdown">
                  <div className="breakdown-row">
                    <span>Behandeling: {selectedService?.name}</span>
                    <span>€{depositInfo.total.toFixed(2)}</span>
                  </div>
                  <div className="breakdown-row highlight">
                    <span>Aanbetaling (Nu betalen)</span>
                    <span>€{depositInfo.deposit.toFixed(2)}</span>
                  </div>
                  <div className="breakdown-row pending">
                    <span>Restant (Betalen bij afspraak)</span>
                    <span>€{depositInfo.balance.toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="deposit-info-message">
                  <p>Om je afspraak te bevestigen is een aanbetaling van <strong>€{depositInfo.deposit.toFixed(2)}</strong> vereist. Het restant van <strong>€{depositInfo.balance.toFixed(2)}</strong> wordt in de salon betaald.</p>
                </div>
              </div>

              <div className="step-actions split">
                <button className="btn btn-outline" onClick={prevStep}>
                  <ChevronLeft size={18} /> Terug
                </button>
                <button className="btn btn-primary" onClick={nextStep}>
                  Ga naar betaling
                </button>
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="step-content payment-step">
              <div className="payment-brand">
                <img src="/payconiq.png" alt="Payconiq" className="payconiq-logo" onError={(e) => e.target.style.display='none'} />
                <h3>Betalen met Payconiq</h3>
              </div>
              
              <div className="payment-status">
                {paymentLoading ? (
                  <div className="payment-loading">
                    <div className="spinner"></div>
                    <p>Bezig met verbinden met Payconiq...</p>
                  </div>
                ) : (
                  <div className="payment-prompt text-center">
                    <p>Totaal nu te betalen:</p>
                    <div className="payment-amount">€{depositInfo.deposit.toFixed(2)}</div>
                    <p className="payment-hint">Klik op de onderstaande knop om een beveiligde betaling te simuleren.</p>
                    
                    <button className="btn btn-primary pay-btn" onClick={handlePayment}>
                      Nu €{depositInfo.deposit.toFixed(2)} betalen
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {step === 6 && (
            <div className="step-content confirmation-view text-center">
              <CheckCircle size={64} className="success-icon" />
              <h3>Afspraak & Aanbetaling bevestigd!</h3>
              <p>Bedankt, {personalDetails.name}. Je afspraak voor <strong>{selectedService?.name}</strong> op <strong>{selectedDate}</strong> om <strong>{selectedTime}</strong> is nu gereserveerd.</p>
              <p>We hebben je aanbetaling van <strong>€{depositInfo.deposit.toFixed(2)}</strong> via Payconiq ontvangen.</p>
              <p className="mt-4">Bevestigingsmail verzonden naar {personalDetails.email}.</p>
              
              <button className="btn btn-primary mt-4" onClick={resetAndClose} style={{marginTop: '2rem'}}>
                Sluiten
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default BookingModal;
