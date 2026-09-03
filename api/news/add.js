// POST /api/news/add  (admin only)
// Body: { description, category, image (base64) }
import { get, set } from '../_redis.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const adminPw = req.headers['x-admin-password'];
  if (!process.env.ADMIN_PASSWORD || adminPw !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const { description, category, image } = req.body;
    if (!description) return res.status(400).json({ error: 'description required' });

    const items = await get('news:items') || [];
    const newItem = {
      id: Date.now().toString(),
      description,
      category: category || 'Update',
      image: image || '',
      createdAt: Date.now(),
    };
    items.unshift(newItem);
    await set('news:items', items);

    return res.status(200).json({ ok: true, item: newItem });
  } catch (err) {
    console.error('news add error:', err);
    return res.status(500).json({ error: err.message });
  }
}
