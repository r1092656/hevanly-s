import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { sendBookingEmail } from '../services/emailService';

const BookingSuccess = () => {
  const { addBooking } = useBooking();
  const [details, setDetails] = useState(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const pending = localStorage.getItem('pending_booking');
    if (pending && !done) {
      try {
        const data = JSON.parse(pending);
        setDetails(data);
        addBooking({
          service:       data.service,
          date:          data.date,
          time:          data.time,
          customer:      data.customer,
          depositAmount: data.depositAmount,
          totalAmount:   data.totalAmount,
          status:        'PAID',
        });
        sendBookingEmail({
          service:       data.service.name,
          date:          data.date,
          time:          data.time,
          name:          data.customer.name,
          email:         data.customer.email,
          phone:         data.customer.phone,
          depositAmount: data.depositAmount,
          balanceAmount: data.balanceAmount,
          depositPaid:   true,
        }).catch(err => console.error('EmailJS booking error:', err));
        localStorage.removeItem('pending_booking');
        setDone(true);
      } catch (err) {
        console.error('BookingSuccess error:', err);
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
          <h1>Afspraak bevestigd{details ? `, ${details.customer.name}` : ''}!</h1>
          {details && (
            <p>
              Uw afspraak voor <strong>{details.service.name}</strong> op{' '}
              <strong>{details.date}</strong> om <strong>{details.time}</strong> is bevestigd.
              <br />
              Aanbetaling van <strong>€{details.depositAmount.toFixed(2)}</strong> ontvangen.
              <br />
              Een bevestigingsmail is verstuurd naar {details.customer.email}.
            </p>
          )}
          <div className="success-actions">
            <Link to="/" className="btn btn-primary">Terug naar home</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSuccess;
