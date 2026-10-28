import { getDb } from '../db.js';
import { parseBody, sendJson } from '../_utils.js';

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    return sendJson(res, 200, { ok: true });
  }

  if (req.method !== 'POST' && req.method !== 'PUT') {
    return sendJson(res, 405, { success: false, message: 'Method Not Allowed' });
  }

  try {
    const body = await parseBody(req);
    const { userId, email, updatedData } = body;

    if (!userId && !email) {
      return sendJson(res, 400, { success: false, message: 'User identifier required.' });
    }

    const db = await getDb();
    const usersCollection = db.collection('users');

    const filter = userId ? { id: userId } : { email: email.toLowerCase() };
    const updateFields = {
      ...updatedData,
      updatedAt: new Date().toISOString(),
    };

    // Remove any accidental _id overwrite
    delete updateFields._id;

    const result = await usersCollection.updateOne(filter, { $set: updateFields });

    return sendJson(res, 200, {
      success: true,
      modifiedCount: result.modifiedCount,
      message: 'Patron profile updated in MongoDB.',
    });
  } catch (error) {
    console.error('Update API Error:', error);
    return sendJson(res, 500, {
      success: false,
      message: error.message || 'Internal server error while updating profile.',
    });
  }
}
