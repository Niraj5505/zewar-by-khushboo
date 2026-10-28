import { getDb } from '../db.js';
import { parseBody, sendJson } from '../_utils.js';

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    return sendJson(res, 200, { ok: true });
  }

  if (req.method !== 'POST') {
    return sendJson(res, 405, { success: false, message: 'Method Not Allowed' });
  }

  try {
    const body = await parseBody(req);
    const { name, email, phone, password } = body;

    if (!name || !name.trim()) {
      return sendJson(res, 400, { success: false, message: 'Full name is required.' });
    }

    if (!email || !email.includes('@')) {
      return sendJson(res, 400, { success: false, message: 'A valid email address is required.' });
    }

    if (!password || password.length < 6) {
      return sendJson(res, 400, { success: false, message: 'Password must be at least 6 characters.' });
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanPhone = phone ? phone.trim() : '+91 9876543210';

    const db = await getDb();
    const usersCollection = db.collection('users');

    // Check if user already exists
    const existingUser = await usersCollection.findOne({ email: cleanEmail });
    if (existingUser) {
      return sendJson(res, 409, {
        success: false,
        message: 'An account with this email address already exists. Please sign in.',
      });
    }

    const userId = `usr-${Date.now()}`;
    const defaultAddress = {
      id: `addr-${Date.now()}`,
      isDefault: true,
      name: name.trim(),
      street: 'Flat 402, Royal Palms Heights, Linking Road',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400050',
      phone: cleanPhone,
    };

    const newUserDoc = {
      id: userId,
      name: name.trim(),
      email: cleanEmail,
      phone: cleanPhone,
      password: password,
      role: 'patron',
      tier: 'Royal Patron',
      addresses: [defaultAddress],
      orders: [],
      wishlist: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await usersCollection.insertOne(newUserDoc);

    const sessionUser = {
      id: userId,
      name: newUserDoc.name,
      email: newUserDoc.email,
      phone: newUserDoc.phone,
      tier: newUserDoc.tier,
      isLoggedIn: true,
    };

    return sendJson(res, 201, {
      success: true,
      user: sessionUser,
      addresses: newUserDoc.addresses,
      message: 'Account successfully registered in Zewar Sanctuary database.',
    });
  } catch (error) {
    console.error('Registration API Error:', error);
    return sendJson(res, 500, {
      success: false,
      message: error.message || 'Internal server error during registration.',
    });
  }
}
