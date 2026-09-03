import emailjs from '@emailjs/browser';
import {
  EMAILJS_SERVICE_ID,
  EMAILJS_PUBLIC_KEY,
  TEMPLATE_BOOKING,
  TEMPLATE_ORDER,
} from '../config/emailConfig';

// ── Boeking: mail naar klant + salon (via Cc) ─────────────
export const sendBookingEmail = ({ service, date, time, name, email, phone, depositAmount, balanceAmount, depositPaid, google_calendar_url }) => {
  return emailjs.send(
    EMAILJS_SERVICE_ID,
    TEMPLATE_BOOKING,
    {
      customer_name:        name,
      customer_email:       email,
      customer_phone:       phone,
      service_name:         service,
      booking_date:         date,
      booking_time:         time,
      deposit_amount:       `€${depositAmount}`,
      balance_amount:       `€${balanceAmount}`,
      deposit_paid:         depositPaid ? 'Ja' : 'Nee',
      google_calendar_url:  google_calendar_url || '',
    },
    EMAILJS_PUBLIC_KEY
  );
};

// ── Bestelling: mail naar klant + salon (via Cc) ──────────
export const sendOrderEmail = ({ customerName, customerEmail, customerAddress, items, total }) => {
  const itemsList = items.map(i => `${i.name} x${i.quantity} — €${(i.price * i.quantity).toFixed(2)}`).join('\n');
  return emailjs.send(
    EMAILJS_SERVICE_ID,
    TEMPLATE_ORDER,
    {
      customer_name:    customerName,
      customer_email:   customerEmail,
      customer_address: customerAddress,
      order_items:      itemsList,
      order_total:      `€${total.toFixed(2)}`,
    },
    EMAILJS_PUBLIC_KEY
  );
};
