// GET /api/bookings/list  (admin only)
import { get } from '../_redis.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end();

  const adminPw = req.headers['x-admin-password'];
  if (!process.env.ADMIN_PASSWORD || adminPw !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const index = await get('bookings:index') || [];
    // Sorteer op datum (nieuwste eerst)
    index.sort((a, b) => new Date(b.date) - new Date(a.date));
    return res.status(200).json({ bookings: index });
  } catch (err) {
    console.error('list bookings error:', err);
    return res.status(500).json({ error: err.message });
  }
}
