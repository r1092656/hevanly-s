// POST /api/bookings/add
// Body: { id, date, time, serviceName, customerName, customerEmail, customerPhone, depositAmount, createdAt }
import { get, set } from '../_redis.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  try {
    const booking = req.body;
    if (!booking.date || !booking.time) return res.status(400).json({ error: 'date and time required' });

    // Sla op per dag
    const dayKey = `bookings:${booking.date}`;
    const dayBookings = await get(dayKey) || [];
    dayBookings.push(booking);
    await set(dayKey, dayBookings);

    // Sla op in globale index voor admin
    const index = await get('bookings:index') || [];
    index.push(booking);
    await set('bookings:index', index);

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('add booking error:', err);
    return res.status(500).json({ error: err.message });
  }
}
