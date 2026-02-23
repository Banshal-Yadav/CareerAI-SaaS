import admin from 'firebase-admin';

export const config = {
  maxDuration: 60,
};

const DEV_ORIGINS = process.env.NODE_ENV === 'development'
  ? ['http://localhost:5173', 'http://localhost:3000']
  : [];

const ALLOWED_ORIGINS = [
  ...(process.env.ALLOWED_ORIGINS || '')
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean),
  ...DEV_ORIGINS,
];

const getSelfOrigin = (req) => {
  const host = req.headers.host;
  const forwardedProto = req.headers['x-forwarded-proto'];
  const proto = (Array.isArray(forwardedProto) ? forwardedProto[0] : forwardedProto) || 'https';
  return host ? `${proto}://${host}` : null;
};

const isAllowedRequestOrigin = (req) => {
  const origin = req.headers.origin;
  const selfOrigin = getSelfOrigin(req);
  return !origin || (selfOrigin != null && origin === selfOrigin) || ALLOWED_ORIGINS.includes(origin);
};

const setCorsHeaders = (req, res) => {
  const origin = req.headers.origin;
  const selfOrigin = getSelfOrigin(req);
  const allowed = isAllowedRequestOrigin(req);

  res.setHeader('Access-Control-Allow-Credentials', true);
  if (origin && allowed) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  } else if (!origin && selfOrigin) {
    res.setHeader('Access-Control-Allow-Origin', selfOrigin);
  }

  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  return allowed;
};

const parseAdminEmails = () => {
  return new Set(
    (process.env.ADMIN_EMAILS || '')
      .split(',')
      .map((e) => e.trim().toLowerCase())
      .filter(Boolean)
  );
};

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      }),
    });
  } catch (error) {
    console.error('Firebase admin initialization error', error.stack);
  }
}

export default async function handler(req, res) {
  const allowedOrigin = setCorsHeaders(req, res);

  if (req.method === 'OPTIONS') {
    res.status(allowedOrigin ? 200 : 403).end();
    return;
  }

  if (!allowedOrigin) {
    return res.status(403).json({ error: 'Origin not allowed' });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const adminEmails = parseAdminEmails();
  if (adminEmails.size === 0) {
    return res.status(403).json({ error: 'Admin endpoint disabled' });
  }

  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized: Missing token' });
    }

    const idToken = authHeader.split('Bearer ')[1];
    let decodedToken;
    try {
      decodedToken = await admin.auth().verifyIdToken(idToken);
    } catch (authError) {
      console.error('Token verification failed:', authError);
      return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }

    const requesterEmail = (decodedToken.email || '').toLowerCase();
    if (!requesterEmail || !adminEmails.has(requesterEmail)) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    const { targetUid, isPro } = req.body || {};
    if (typeof targetUid !== 'string' || targetUid.trim().length === 0) {
      return res.status(400).json({ error: 'Invalid targetUid' });
    }
    if (typeof isPro !== 'boolean') {
      return res.status(400).json({ error: 'Invalid isPro' });
    }

    const db = admin.firestore();
    const profileRef = db.collection('profiles').doc(targetUid.trim());
    await profileRef.set({ isPro }, { merge: true });

    return res.status(200).json({ ok: true, targetUid: targetUid.trim(), isPro });
  } catch (error) {
    console.error('Admin set-pro error:', error);
    return res.status(500).json({ error: 'Failed to update pro status' });
  }
}
