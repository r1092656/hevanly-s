// POST /api/news/delete  (admin only)
// Body: { id }
import { get, set } from '../_redis.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const adminPw = req.headers['x-admin-password'];
  if (!process.env.ADMIN_PASSWORD || adminPw !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const { id } = req.body;
    if (!id) return res.status(400).json({ error: 'id required' });

    const items = await get('news:items') || [];
    await set('news:items', items.filter(i => i.id !== id));

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('news delete error:', err);
    return res.status(500).json({ error: err.message });
  }
}
