// GET /api/bookings/slots?date=YYYY-MM-DD
// Returns array of booked time strings for that date
import { get } from '../_redis.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end();
  const { date } = req.query;
  if (!date) return res.status(400).json({ error: 'date required' });

  try {
    const bookings = await get(`bookings:${date}`) || [];
    const times = bookings.map(b => b.time);
    return res.status(200).json({ times });
  } catch (err) {
    console.error('slots error:', err);
    return res.status(500).json({ error: err.message });
  }
}
