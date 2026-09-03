// POST /api/bookings/cancel  (admin only)
// Body: { id, date }
import { get, set } from '../_redis.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const adminPw = req.headers['x-admin-password'];
  if (!process.env.ADMIN_PASSWORD || adminPw !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const { id, date } = req.body;
    if (!id || !date) return res.status(400).json({ error: 'id and date required' });

    // Verwijder uit dag-lijst
    const dayKey = `bookings:${date}`;
    const dayBookings = await get(dayKey) || [];
    await set(dayKey, dayBookings.filter(b => b.id !== id));

    // Verwijder uit globale index
    const index = await get('bookings:index') || [];
    await set('bookings:index', index.filter(b => b.id !== id));

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('cancel booking error:', err);
    return res.status(500).json({ error: err.message });
  }
}
