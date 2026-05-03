import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { Link, useNavigate } from 'react-router-dom';
import { CreditCard, CheckCircle, ChevronLeft } from 'lucide-react';
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate Payconiq Payment Delay
    setTimeout(() => {
      processPurchase(formData);
      setIsProcessing(false);
      setIsSuccess(true);
      window.scrollTo(0, 0);
    }, 2500);
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
                  <span className="payment-name">Payconiq</span>
                  <p>Je wordt doorverwezen naar de Payconiq-app om je betaling te voltooien.</p>
                </div>
                <div className="payment-logo">
                  <img src="https://www.payconiq.be/favicon.ico" alt="Payconiq" />
                </div>
              </div>
            </section>

            <button 
              type="submit" 
              className={`btn btn-primary pay-btn ${isProcessing ? 'loading' : ''}`}
              disabled={isProcessing}
            >
              {isProcessing ? 'Betaling verwerken...' : `€${cartTotal.toFixed(2)} betalen via Payconiq`}
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
