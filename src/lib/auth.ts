import { cookies } from 'next/headers';
import crypto from 'crypto';
import { User } from './db';

const SESSION_SECRET = process.env.SESSION_SECRET || 'vr-gold-master-security-key-kadapa-2026';
const COOKIE_NAME = 'vr_gold_session';

export interface SessionPayload {
  userId: string;
  email: string;
  name: string;
  role: 'ADMIN' | 'STAFF';
  exp: number;
}

export function signToken(payload: SessionPayload): string {
  const jsonStr = JSON.stringify(payload);
  const base64Payload = Buffer.from(jsonStr).toString('base64url');
  const signature = crypto.createHmac('sha256', SESSION_SECRET).update(base64Payload).digest('base64url');
  return `${base64Payload}.${signature}`;
}

export function verifyToken(token: string): SessionPayload | null {
  try {
    const [base64Payload, signature] = token.split('.');
    if (!base64Payload || !signature) return null;

    const expectedSignature = crypto.createHmac('sha256', SESSION_SECRET).update(base64Payload).digest('base64url');

    if (signature !== expectedSignature) {
      return null;
    }

    const jsonStr = Buffer.from(base64Payload, 'base64url').toString('utf-8');
    const payload = JSON.parse(jsonStr) as SessionPayload;

    if (Date.now() > payload.exp) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

export async function createSession(user: User): Promise<string> {
  const exp = Date.now() + 7 * 24 * 60 * 60 * 1000; // 7 days
  const token = signToken({
    userId: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    exp,
  });

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 7 * 24 * 60 * 60,
  });

  return token;
}

export async function clearSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(COOKIE_NAME);
  if (!sessionCookie?.value) {
    return null;
  }
  return verifyToken(sessionCookie.value);
}
