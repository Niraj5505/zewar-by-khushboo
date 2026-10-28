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
    const identifier = (body.identifier || body.emailOrPhone || '').trim().toLowerCase();
    const password = body.password || '';

    if (!identifier) {
      return sendJson(res, 400, { success: false, message: 'Email or mobile number is required.' });
    }

    const db = await getDb();
    const usersCollection = db.collection('users');

    // Find by email or normalized phone
    const cleanDigits = identifier.replace(/\D/g, '');
    let user = await usersCollection.findOne({
      $or: [
        { email: identifier },
        ...(cleanDigits ? [{ phone: { $regex: cleanDigits } }] : []),
      ],
    });

    // If user not found, check if it's the official demo patron or social login
    if (!user) {
      const isDemo = identifier === 'khushboo@zewar.com' || identifier === 'khushboo.patron@gmail.com';
      if (isDemo || identifier.includes('@')) {
        // Auto-seed demo/first-time patron into MongoDB
        const defaultName = isDemo ? 'Khushboo Shah' : identifier.split('@')[0];
        const newDoc = {
          id: `usr-${Date.now()}`,
          name: defaultName,
          email: identifier,
          phone: '+91 9876543210',
          password: password || 'Password123',
          role: isDemo ? 'patron-vip' : 'patron',
          tier: 'Royal Patron',
          addresses: [
            {
              id: `addr-demo-1`,
              isDefault: true,
              name: defaultName,
              street: 'Flat 402, Royal Palms Heights, Linking Road',
              city: 'Mumbai',
              state: 'Maharashtra',
              pincode: '400050',
              phone: '9876543210',
            },
          ],
          orders: [
            {
              id: 'ZWR-2026-8941',
              date: '2026-03-24',
              status: 'In Transit',
              statusStep: 3,
              estimatedDelivery: 'Tomorrow, by 2:00 PM',
              courier: 'BlueDart Luxury Express (Air)',
              trackingNumber: 'BD-LUX-9988210',
              total: 184500,
              items: [
                {
                  id: 'it-1',
                  name: 'Royal Mughal Polki Diamond Choker',
                  category: 'Necklaces',
                  price: 184500,
                  quantity: 1,
                  image: '/images/hero-1.jpg',
                },
              ],
            },
          ],
          wishlist: [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        await usersCollection.insertOne(newDoc);
        user = newDoc;
      } else {
        return sendJson(res, 404, {
          success: false,
          message: 'No patron account found with this credential. Please register.',
        });
      }
    }

    // If password provided and user has password, verify it (demo allows bypass)
    if (user.password && password && user.password !== password) {
      return sendJson(res, 401, {
        success: false,
        message: 'Invalid password. Please verify your credentials.',
      });
    }

    const sessionUser = {
      id: user.id || user._id.toString(),
      name: user.name,
      email: user.email,
      phone: user.phone,
      tier: user.tier || 'Royal Patron',
      isLoggedIn: true,
    };

    return sendJson(res, 200, {
      success: true,
      user: sessionUser,
      addresses: user.addresses || [],
      orders: user.orders || [],
      message: 'Signed in successfully via MongoDB.',
    });
  } catch (error) {
    console.error('Login API Error:', error);
    return sendJson(res, 500, {
      success: false,
      message: error.message || 'Internal server error during authentication.',
    });
  }
}
