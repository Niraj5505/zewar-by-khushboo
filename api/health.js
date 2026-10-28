import { getDb } from './db.js';
import { sendJson } from './_utils.js';

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    return sendJson(res, 200, { ok: true });
  }

  try {
    const db = await getDb();
    const collections = await db.listCollections().toArray();
    const usersCount = await db.collection('users').countDocuments().catch(() => 0);

    return sendJson(res, 200, {
      status: 'online',
      database: 'zewarbykhusboo',
      connected: true,
      collections: collections.map((c) => c.name),
      usersCount,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('MongoDB Health check error:', error);
    return sendJson(res, 500, {
      status: 'error',
      connected: false,
      error: error.message || 'Database connection error',
    });
  }
}
