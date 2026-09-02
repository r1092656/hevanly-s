import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { sendOrderEmail } from '../services/emailService';

const PaymentSuccess = () => {
  const { processPurchase } = useShop();
  const [customerName, setCustomerName] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const pending = localStorage.getItem('pending_order');
    if (pending && !done) {
      try {
        const { formData, cart, cartTotal } = JSON.parse(pending);
        setCustomerName(formData.fullName);
        processPurchase(formData);
        sendOrderEmail({
          customerName:    formData.fullName,
          customerEmail:   formData.email,
          customerAddress: formData.address,
          items:           cart,
          total:           cartTotal,
        }).catch(err => console.error('EmailJS order error:', err));
        localStorage.removeItem('pending_order');
        setDone(true);
      } catch (err) {
        console.error('PaymentSuccess error:', err);
      }
    }
  }, []);

  return (
    <div className="checkout-page success" style={{ paddingTop: '80px' }}>
      <div className="container">
        <div className="success-card">
          <div className="success-icon">
            <CheckCircle size={80} />
          </div>
          <h1>Bedankt{customerName ? `, ${customerName}` : ''}!</h1>
          <p>Je bestelling is succesvol geplaatst en betaald. Je ontvangt een bevestigingsmail.</p>
          <div className="success-actions">
            <Link to="/products" className="btn btn-primary">Verder winkelen</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
