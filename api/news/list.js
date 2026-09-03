// GET /api/news/list  — publiek, geeft items jonger dan 5 dagen
import { get } from '../_redis.js';

const FIVE_DAYS = 5 * 24 * 60 * 60 * 1000;

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end();

  try {
    const items = await get('news:items') || [];
    const now = Date.now();
    const active = items.filter(i => (now - i.createdAt) < FIVE_DAYS);
    return res.status(200).json({ items: active });
  } catch (err) {
    console.error('news list error:', err);
    return res.status(500).json({ error: err.message });
  }
}
