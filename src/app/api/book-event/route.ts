import { NextRequest, NextResponse } from 'next/server';

const WEBHOOK_URL = process.env.WEBHOOK_URL;

const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour
const RATE_LIMIT_MAX = 5;
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return false;
  }

  entry.count++;
  return entry.count > RATE_LIMIT_MAX;
}

const MAX_FIELD_LENGTH = 500;
const MAX_COMMENTS_LENGTH = 2000;

function sanitize(value: unknown, maxLength = MAX_FIELD_LENGTH): string {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, maxLength);
}

export async function POST(request: NextRequest) {
  if (!WEBHOOK_URL) {
    return NextResponse.json({ error: 'Server misconfigured' }, { status: 500 });
  }

  // Rate limiting
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  // Parse and validate body
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const fullName = sanitize(body.fullName);
  const companyName = sanitize(body.companyName);
  const companyActivity = sanitize(body.companyActivity);
  const companySize = sanitize(body.companySize);
  const jobTitle = sanitize(body.jobTitle);
  const companyEmail = sanitize(body.companyEmail);
  const mobilePhone = sanitize(body.mobilePhone);
  const website = sanitize(body.website);
  const comments = sanitize(body.comments, MAX_COMMENTS_LENGTH);

  // Validate required fields
  if (!fullName || !companyName || !companyActivity || !companySize || !jobTitle || !companyEmail || !mobilePhone) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  // Honeypot check — if a hidden field is filled, it's a bot
  if (body._hp) {
    // Silently accept to not reveal the honeypot
    return NextResponse.json({ ok: true });
  }

  try {
    const res = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullName,
        companyName,
        companyActivity,
        companySize,
        jobTitle,
        companyEmail,
        mobilePhone,
        website,
        comments,
        submittedAt: new Date().toISOString(),
      }),
    });

    if (res.ok) {
      return NextResponse.json({ ok: true });
    }

    return NextResponse.json({ error: 'Submission failed' }, { status: 502 });
  } catch {
    return NextResponse.json({ error: 'Submission failed' }, { status: 502 });
  }
}
