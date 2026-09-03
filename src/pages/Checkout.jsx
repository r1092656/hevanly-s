import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { Link, useNavigate } from 'react-router-dom';
import { CreditCard, CheckCircle, ChevronLeft } from 'lucide-react';
import { sendOrderEmail } from '../services/emailService';
import './Checkout.css';

const Checkout = () => {
  const { cart, cartTotal, processPurchase } = useShop();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    phone: '',
    email: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [gdprChecked, setGdprChecked] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    // If cart is empty and not in success state, redirect to products
    if (cart.length === 0 && !isSuccess) {
      navigate('/products');
    }
  }, [cart, isSuccess, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // Sla bestelgegevens op voor na de redirect
      localStorage.setItem('pending_order', JSON.stringify({
        formData,
        cart,
        cartTotal,
      }));

      const res = await fetch('/api/create-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: cartTotal.toFixed(2),
          description: `Bestelling Hevanly's Beautybar – ${formData.fullName}`,
          redirectUrl: `${window.location.origin}/payment-success`,
        }),
      });

      const data = await res.json();

      if (data.checkoutUrl) {
        // Redirect naar Mollie betaalpagina
        window.location.href = data.checkoutUrl;
      } else {
        console.error('Mollie error:', data.error);
        setIsProcessing(false);
      }
    } catch (err) {
      console.error('Payment error:', err);
      setIsProcessing(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="checkout-page success">
        <div className="container">
          <div className="success-card">
            <div className="success-icon">
              <CheckCircle size={80} />
            </div>
            <h1>Bedankt, {formData.fullName}!</h1>
            <p>Je bestelling is succesvol geplaatst. We sturen je binnenkort een bevestigingsmail.</p>
            <div className="success-actions">
              <Link to="/products" className="btn btn-primary">Verder winkelen</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="container">
        <header className="checkout-header">
          <Link to="/products" className="back-link">
            <ChevronLeft size={20} />
            Terug naar producten
          </Link>
          <h2>Afrekenen</h2>
        </header>

        <div className="checkout-content">
          <form className="checkout-form" onSubmit={handleSubmit}>
            <section className="checkout-section">
              <h3>Verzendinformatie</h3>
              <div className="input-group">
                <label className="input-label" htmlFor="fullName">Volledige naam</label>
                <input 
                  type="text" 
                  id="fullName" 
                  name="fullName"
                  className="input-field" 
                  required 
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="bijv. Jane Doe"
                />
              </div>
              <div className="input-group">
                <label className="input-label" htmlFor="address">Adres</label>
                <input 
                  type="text" 
                  id="address" 
                  name="address"
                  className="input-field" 
                  required 
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Straat, Stad, Postcode"
                />
              </div>
              <div className="grid grid-2">
                <div className="input-group">
                  <label className="input-label" htmlFor="phone">Telefoonnummer</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    name="phone"
                    className="input-field" 
                    required 
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+32 ..."
                  />
                </div>
                <div className="input-group">
                  <label className="input-label" htmlFor="email">E-mailadres</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email"
                    className="input-field" 
                    required 
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="email@voorbeeld.be"
                  />
                </div>
              </div>
            </section>

            <section className="checkout-section">
              <h3>Betaalmethode</h3>
              <div className="payment-option selected">
                <div className="payment-radio"></div>
                <div className="payment-details">
                  <span className="payment-name">Bancontact</span>
                  <p>Je wordt doorverwezen naar de beveiligde Bancontact betaalpagina.</p>
                </div>
                <div className="payment-logo">
                  <img src="/bancontact-pay.png" alt="Bancontact"
                    onError={(e) => { e.target.style.display = 'none'; }}
                    style={{ height: '28px', width: 'auto' }} />
                </div>
              </div>
            </section>

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
                  <Link to="/privacy" className="gdpr-link">privacyverklaring</Link>
                  {' '}en de{' '}
                  <Link to="/algemene-voorwaarden" className="gdpr-link">algemene voorwaarden</Link>
                  {' '}en geef toestemming voor de verwerking van mijn gegevens voor deze bestelling.
                </span>
              </label>
            </div>

            <div className="redirect-warning">
              ⚠️ Na het betalen wordt u automatisch teruggestuurd naar de website. Sluit dit venster <strong>niet</strong> en klik <strong>niet</strong> weg — anders ontvangt u geen bevestigingsmail.
            </div>
            <button
              type="submit"
              className={`btn btn-primary pay-btn ${isProcessing ? 'loading' : ''}`}
              disabled={isProcessing || !gdprChecked}
            >
              {isProcessing ? 'Betaling verwerken...' : `€${cartTotal.toFixed(2)} betalen via Bancontact`}
            </button>
          </form>

          <aside className="order-summary">
            <h3>Besteloverzicht</h3>
            <div className="summary-items">
              {cart.map(item => (
                <div key={item.id} className="summary-item">
                  <div className="summary-item-info">
                    <span className="summary-item-name">{item.name}</span>
                    <span className="summary-item-qty">Aantal: {item.quantity}</span>
                  </div>
                  <span className="summary-item-price">€{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="summary-totals">
              <div className="summary-line">
                <span>Subtotaal</span>
                <span>€{cartTotal.toFixed(2)}</span>
              </div>
              <div className="summary-line">
                <span>Verzending</span>
                <span className="free">GRATIS</span>
              </div>
              <div className="summary-line total">
                <span>Totaal</span>
                <span>€{cartTotal.toFixed(2)}</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
