import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Calendar, CalendarDays } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { sendBookingEmail } from '../services/emailService';
import { APPOINTMENT_DURATION } from '../config/salonConfig';

// Bouw Google Calendar URL
const buildGoogleCalendarUrl = (data) => {
  const [year, month, day] = data.date.split('-');
  const [hourStr, minStr] = data.time.split(':');
  const startH = parseInt(hourStr);
  const startM = parseInt(minStr);
  const endTotal = startH * 60 + startM + APPOINTMENT_DURATION;
  const endH = Math.floor(endTotal / 60);
  const endM = endTotal % 60;
  const pad = (n) => String(n).padStart(2, '0');
  const start = `${year}${month}${day}T${pad(startH)}${pad(startM)}00`;
  const end   = `${year}${month}${day}T${pad(endH)}${pad(endM)}00`;
  const params = new URLSearchParams({
    action:   'TEMPLATE',
    text:     `${data.service.name} – Hevanly's Beautybar`,
    dates:    `${start}/${end}`,
    details:  `Aanbetaling: €${data.depositAmount.toFixed(2)} betaald. Restbedrag te betalen in salon. Contact: +32 465 17 27 90`,
    location: "Graatakker 118 Bus B, 2300 Turnhout, België",
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
};

// Download .ics bestand (Apple Calendar, Outlook, ...)
const downloadIcs = (data) => {
  const [year, month, day] = data.date.split('-');
  const [hourStr, minStr] = data.time.split(':');
  const startH = parseInt(hourStr);
  const startM = parseInt(minStr);
  const endTotal = startH * 60 + startM + APPOINTMENT_DURATION;
  const endH = Math.floor(endTotal / 60);
  const endM = endTotal % 60;
  const pad = (n) => String(n).padStart(2, '0');
  const start = `${year}${month}${day}T${pad(startH)}${pad(startM)}00`;
  const end   = `${year}${month}${day}T${pad(endH)}${pad(endM)}00`;

  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    "PRODID:-//Hevanly's Beautybar//Booking//NL",
    'BEGIN:VEVENT',
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `SUMMARY:${data.service.name} – Hevanly's Beautybar`,
    `DESCRIPTION:Aanbetaling: €${data.depositAmount.toFixed(2)} betaald.`,
    'LOCATION:Graatakker 118 Bus B\\, 2300 Turnhout\\, België',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = 'afspraak-hevanlys-beautybar.ics';
  a.click();
  URL.revokeObjectURL(url);
};

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
        const googleUrl = buildGoogleCalendarUrl(data);

        // Sla boeking op in Redis (centrale database)
        fetch('/api/bookings/add', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: `booking_${Date.now()}`,
            date: data.date,
            time: data.time,
            serviceName: data.service.name,
            customerName: data.customer.name,
            customerEmail: data.customer.email,
            customerPhone: data.customer.phone,
            depositAmount: data.depositAmount,
            createdAt: Date.now(),
          }),
        }).catch(err => console.error('Redis booking save error:', err));

        sendBookingEmail({
          service:              data.service.name,
          date:                 data.date,
          time:                 data.time,
          name:                 data.customer.name,
          email:                data.customer.email,
          phone:                data.customer.phone,
          depositAmount:        data.depositAmount,
          balanceAmount:        data.balanceAmount,
          depositPaid:          true,
          google_calendar_url:  googleUrl,
        }).catch(err => console.error('EmailJS booking error:', err));
        localStorage.removeItem('pending_booking');
        setDone(true);
      } catch (err) {
        console.error('BookingSuccess error:', err);
      }
    }
  }, []);

  const googleUrl = details ? buildGoogleCalendarUrl(details) : null;

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

          {details && (
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
              <a
                href={googleUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.9rem' }}
              >
                <Calendar size={16} />
                Google Calendar
              </a>
              <button
                onClick={() => downloadIcs(details)}
                className="btn btn-outline"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.9rem' }}
              >
                <CalendarDays size={16} />
                Apple / Outlook (.ics)
              </button>
            </div>
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
